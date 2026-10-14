#!/usr/bin/env python3
"""Browser acceptance for the v5 care narrative.

Serve the repository on localhost first. Requires Python Playwright and Chromium.
Usage: python tools/verify-jubo-ai-v5.py [base-url] [output-directory]
HTTPS assets use the environment's existing verified CA trust; no browser security
or network-policy settings are modified.
"""
import asyncio
import json
import os
from pathlib import Path
import re
import sys
import urllib.request

from playwright.async_api import async_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8770"
OUT = Path(sys.argv[2] if len(sys.argv) > 2 else "/tmp/v5")
URL = BASE.rstrip("/") + "/custom-code/poc/jubo-ai-agentic-v5.html"
OUT.mkdir(parents=True, exist_ok=True)


async def main():
    reports, cache = [], {}
    async with async_playwright() as p:
        proxy = os.environ.get("HTTPS_PROXY")
        browser = await p.chromium.launch(
            executable_path=os.environ.get("POC_CHROMIUM_PATH", "/usr/bin/chromium"),
            headless=True,
            **({"proxy": {"server": proxy, "bypass": "localhost,127.0.0.1"}} if proxy else {}),
            args=["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
        )

        async def verified_https(route):
            url = route.request.url
            try:
                if url not in cache:
                    def fetch():
                        with urllib.request.urlopen(url, timeout=25) as response:
                            return response.read(), response.headers.get("Content-Type", "application/octet-stream")
                    cache[url] = await asyncio.to_thread(fetch)
                body, content_type = cache[url]
                await route.fulfill(status=200, body=body, content_type=content_type)
            except Exception:
                await route.continue_()

        async def open_page(width, **options):
            page = await browser.new_page(
                viewport={"width": width, "height": 900 if width >= 768 else 812}, **options
            )
            await page.route("https://**/*", verified_https)
            errors = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
            await page.goto(URL, wait_until="networkidle")
            await page.wait_for_timeout(1200)
            return page, errors

        async def go(page, story, index):
            await page.evaluate("([id,i])=>juboAIVisual.goToPanel(id,i)", [story, index])
            await page.wait_for_function(
                "([id,i])=>juboAIVisual.stories.find(s=>s.id===id).active===i",
                arg=[story, index], timeout=10000,
            )
            await page.wait_for_timeout(1000)

        layer_classes = [
            "glass-effect__fill", "glass-effect__fill-burn", "glass-effect__highlight-soft",
            "glass-effect__highlight-strong", "glass-effect__edge-light",
            "glass-effect__edge-dark", "glass-effect__inner-glow",
        ]
        for width in [1440, 991, 767, 375]:
            page, errors = await open_page(width)
            assert await page.locator("html").get_attribute("lang") == "en"
            assert await page.locator("html").get_attribute("data-webgl") == "ready"
            assert await page.locator("html").get_attribute("data-scrub") == str(width >= 768).lower()
            assert await page.locator("canvas").count() == 1
            assert await page.evaluate("juboAIVisual.drawCalls") == 1
            assert await page.locator("[data-orb-anchor] > *").count() == 0
            assert await page.locator(".jubo-ai_context-pane,.jubo-ai_app-grid,.jubo-ai_capability-grid,.jubo-ai_source-list").count() == 0
            assert not re.search(r"[\u3400-\u9fff]", await page.locator("body").inner_text())
            assert await page.locator("h1").count() == 1
            for class_name in layer_classes:
                assert await page.locator(".glass-button").first.locator("." + class_name).count() == 1
            await page.screenshot(path=str(OUT / f"{width}-hero.png"))

            if width >= 768:
                orb = await page.evaluate("juboAIVisual.orb")
                height = 900
                cx, cy, radius = orb["x"] * width, (1 - orb["y"]) * height, orb["r"] * height
                await page.mouse.move(cx - radius * .55, cy)
                await page.wait_for_timeout(900)
                left = await page.evaluate("juboAIVisual.gaze")
                await page.screenshot(path=str(OUT / f"{width}-orb-left.png"))
                await page.mouse.move(cx + radius * .55, cy)
                await page.wait_for_timeout(900)
                right = await page.evaluate("juboAIVisual.gaze")
                await page.screenshot(path=str(OUT / f"{width}-orb-right.png"))
                assert left["x"] < -.25 and right["x"] > .25, (left, right)
                assert left["strength"] > .25 and right["strength"] > .25
                reports.append({"width": width, "pointerResponse": True, "leftGaze": left, "rightGaze": right})

            counts = {"foundation": 5, "capabilities": 5, "applications": 3, "possibilities": 3}
            for story, count in counts.items():
                assert await page.locator(f"#{story} [data-panel]").count() == count
                if width >= 768:
                    assert await page.locator("#" + story).evaluate(
                        "(el)=>el.offsetHeight-innerHeight"
                    ) >= count * 900
                for index in range(count):
                    await go(page, story, index)
                    panel = page.locator(f"#{story} [data-panel='{index}']")
                    assert await panel.get_attribute("data-active") == "true"
                    assert await panel.evaluate("(el)=>Number(getComputedStyle(el).opacity)>.95")
                    assert await page.evaluate("document.documentElement.scrollWidth") == width
                    if width >= 768:
                        assert await panel.get_attribute("aria-hidden") == "false"
                        assert await page.locator("#" + story + " .jubo-ai_story-stage").evaluate(
                            "(el)=>Math.abs(el.getBoundingClientRect().top)<2"
                        )
                        if await panel.locator(".jubo-ai_story-title").count():
                            centered = await panel.locator(".jubo-ai_story-title").evaluate(
                                "(el)=>{const r=el.getBoundingClientRect();return Math.abs(r.left+r.width/2-innerWidth/2)<3}"
                            )
                            assert centered
                    await page.screenshot(path=str(OUT / f"{width}-{story}-{index}.png"))

            if width >= 768:
                await go(page, "foundation", 1)
                await page.mouse.wheel(0, 100)
                await page.wait_for_timeout(1000)
                assert await page.locator("#foundation").get_attribute("data-active-step") == "1"

            await page.locator("#understanding").evaluate("(el)=>el.scrollIntoView({behavior:'instant'})")
            await page.wait_for_timeout(1500)
            await page.screenshot(path=str(OUT / f"{width}-understanding.png"))
            await go(page, "applications", 0)
            for prompt in ["summary", "interview", "plan"]:
                await page.locator(f"[data-prompt='{prompt}']").click()
                await page.wait_for_function("document.querySelector('[data-chat]').dataset.status==='ready-for-review'")
                assert await page.locator(".jubo-ai_chat-output li").count() == 3
                await page.locator(".jubo-ai_chat-sources summary").click()
                assert await page.locator(".jubo-ai_chat-sources").get_attribute("open") is not None
                await page.locator(".jubo-ai_review-button").click()
                assert await page.locator("[data-chat]").get_attribute("data-status") == "reviewed"
            await page.locator("[data-prompt='summary']").click()
            await page.wait_for_timeout(100)
            await page.locator("[data-prompt='plan']").click()
            await page.wait_for_function("document.querySelector('[data-chat]').dataset.status==='ready-for-review'")
            assert await page.locator(".jubo-ai_chat-output").count() == 1
            assert await page.locator(".jubo-ai_chat-output strong").inner_text() == "Care-plan starting point"
            await page.screenshot(path=str(OUT / f"{width}-copilot-reviewed.png"))

            for index, idea in enumerate(["signals", "time", "picture"]):
                await go(page, "possibilities", index)
                trigger = page.locator(f"[data-idea='{idea}']")
                await trigger.focus()
                await page.keyboard.press("Enter")
                assert await page.locator("dialog").get_attribute("open") is not None
                await page.keyboard.press("Shift+Tab")
                assert await page.locator("dialog").evaluate("(el)=>el.contains(document.activeElement)")
                await page.keyboard.press("Escape")
                assert await trigger.evaluate("(el)=>el===document.activeElement")

            await page.locator("[data-motion-toggle]").click()
            await page.wait_for_timeout(300)
            before = await page.evaluate("juboAIVisual.draws")
            clock = await page.evaluate("juboAIVisual.time")
            await page.wait_for_timeout(1200)
            assert await page.evaluate("juboAIVisual.draws") == before
            assert await page.evaluate("juboAIVisual.time") == clock
            await page.locator("[data-motion-toggle]").click()
            await page.wait_for_timeout(350)
            assert await page.evaluate("juboAIVisual.draws") > before
            await page.locator("#people").evaluate("(el)=>el.scrollIntoView({behavior:'instant'})")
            await page.wait_for_timeout(1000)
            await page.screenshot(path=str(OUT / f"{width}-closing.png"))
            assert not errors, errors
            report = {"width": width, "scrollWidth": width, "centered": True,
                      "storyPanels": counts, "slowScrollHold": width >= 768,
                      "noOrbitingCards": True, "layeredCTA": True, "conversations": 3,
                      "keyboardDialogs": 3, "cancellation": True, "pause": True, "errors": errors}
            reports.append(report)
            print(json.dumps(report), flush=True)
            await page.close()

        for width in [1440, 375]:
            page, errors = await open_page(width, reduced_motion="reduce")
            assert await page.locator("html").get_attribute("data-scrub") == "false"
            assert await page.evaluate("document.getAnimations().length") == 0
            assert await page.locator("[data-panel]").evaluate_all(
                "(els)=>els.every(el=>getComputedStyle(el).opacity==='1'&&!el.inert&&el.getAttribute('aria-hidden')!=='true')"
            )
            before = await page.evaluate("juboAIVisual.draws")
            await page.wait_for_timeout(1200)
            assert await page.evaluate("juboAIVisual.draws") == before
            await page.locator("[data-prompt='plan']").click()
            await page.wait_for_function("document.querySelector('[data-chat]').dataset.status==='ready-for-review'")
            assert not errors, errors
            reports.append({"width": width, "reducedMotion": True, "allPanelsReadable": True, "loopStopped": True, "errors": errors})
            await page.close()

        page, errors = await open_page(375, device_scale_factor=3, has_touch=True, is_mobile=True)
        assert await page.evaluate("juboAIVisual.pixelRatio") <= 1.5
        orb = await page.evaluate("juboAIVisual.orb")
        await page.touchscreen.tap(orb["x"] * 375, (1 - orb["y"]) * 812)
        await page.wait_for_timeout(150)
        assert await page.evaluate("juboAIVisual.gaze.pulse") > .1
        assert "Touch" in await page.locator("[data-pointer-hint]").inner_text()
        reports.append({"touchOrb": True, "deviceScaleFactor": 3, "dprBudget": 1.5, "errors": errors})
        assert not errors, errors
        await page.close()

        page, errors = await open_page(1440, device_scale_factor=3)
        assert await page.evaluate("juboAIVisual.pixelRatio") <= 2
        await page.set_viewport_size({"width": 767, "height": 900})
        await page.wait_for_timeout(500)
        assert await page.locator("html").get_attribute("data-scrub") == "false"
        assert await page.evaluate("document.documentElement.scrollWidth") == 767
        await page.set_viewport_size({"width": 1440, "height": 900})
        await go(page, "foundation", 2)
        assert await page.locator("#foundation [data-panel]").evaluate_all("(els)=>els.filter(el=>el.inert).length===4")
        await page.set_viewport_size({"width": 1440, "height": 640})
        await page.wait_for_timeout(400)
        assert await page.locator("html").get_attribute("data-scrub") == "false"
        assert await page.locator("[data-panel]").evaluate_all("(els)=>els.every(el=>!el.inert)")
        assert not errors, errors
        reports.append({"desktopDprBudget": 2, "mobileResize": True, "shortViewportFlow": True})
        await page.close()

        page = await browser.new_page(viewport={"width": 375, "height": 812})
        await page.route("https://**/*", verified_https)
        await page.route("**/three.min.js", lambda route: route.fulfill(status=200, body="/* unavailable */"))
        await page.goto(URL, wait_until="networkidle")
        assert await page.locator("html").get_attribute("data-webgl") == "unavailable"
        await page.locator("[data-prompt='summary']").click()
        await page.wait_for_function("document.querySelector('[data-chat]').dataset.status==='ready-for-review'")
        assert await page.locator(".jubo-ai_fallback-orb").count() == 1
        reports.append({"webglFallback": True, "conversation": True})
        await page.close()
        await browser.close()

    (OUT / "acceptance.json").write_text(json.dumps(reports, indent=2))
    print("All v5 browser checks passed.", flush=True)


asyncio.run(main())
