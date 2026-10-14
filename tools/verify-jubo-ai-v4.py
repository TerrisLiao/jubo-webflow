#!/usr/bin/env python3
"""Browser acceptance for the v4 care narrative.

Serve the repository on localhost first. Requires Python Playwright and Chromium.
Usage: python tools/verify-jubo-ai-v4.py [base-url] [output-directory]
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

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8768"
OUT = Path(sys.argv[2] if len(sys.argv) > 2 else "/tmp/v4")
URL = BASE.rstrip("/") + "/custom-code/poc/jubo-ai-agentic-v4.html"
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

        for width in [1440, 991, 767, 375]:
            page, errors = await open_page(width)
            assert await page.locator("html").get_attribute("lang") == "en"
            assert await page.locator("html").get_attribute("data-webgl") == "ready"
            assert await page.locator("canvas").count() == 1
            assert await page.evaluate("juboAIVisual.drawCalls") == 1
            assert await page.evaluate("THREE.REVISION") == "155"
            assert not re.search(r"[\u3400-\u9fff]", await page.locator("body").inner_text())
            assert await page.locator("h1").count() == 1
            assert await page.locator("[data-source]").count() == 5
            assert await page.locator(".jubo-ai_source-arrow svg").evaluate_all(
                "(els)=>els.every(el=>getComputedStyle(el).fill==='none'&&el.getBoundingClientRect().width<=20)"
            )
            assert await page.locator("[data-capability]").count() == 5
            assert await page.locator("[data-card-motion='amy'] [data-prompt]").count() == 0
            assert await page.locator("[data-card-motion='ibee'] [data-prompt]").count() == 0
            await page.screenshot(path=str(OUT / f"{width}-hero.png"))

            await page.locator("#foundation").evaluate("(el)=>el.scrollIntoView({behavior:'instant'})")
            for name in ["care", "vitals", "handover", "visits", "family"]:
                button = page.locator(f"[data-source='{name}']")
                await button.click()
                assert await button.get_attribute("aria-pressed") == "true"
                assert await page.locator("[data-source][aria-pressed='true']").count() == 1
            await page.locator("[data-source='vitals']").click()
            assert await page.locator("[data-capability='changes']").get_attribute("data-related") == "true"
            assert await page.locator("[data-capability='draft']").get_attribute("data-related") == "false"
            assert "noticing changes" in await page.locator("#source-result").inner_text()
            await page.locator("[data-source='care']").click()

            for section in ["foundation", "context", "capabilities", "applications", "possibilities", "people"]:
                await page.locator("#" + section).evaluate("(el)=>el.scrollIntoView({behavior:'instant'})")
                await page.wait_for_timeout(900)
                assert await page.evaluate("document.documentElement.scrollWidth") == width
                await page.screenshot(path=str(OUT / f"{width}-{section}.png"))
            await page.locator("[data-replay]").first.focus()
            await page.keyboard.press("Enter")
            assert await page.locator("[data-card-motion='find']").get_attribute("data-play") == "true"

            for prompt in ["summary", "interview", "plan"]:
                await page.locator(f"[data-prompt='{prompt}']").click()
                await page.wait_for_function("document.querySelector('[data-chat]').dataset.status==='ready-for-review'")
                assert await page.locator("[data-chat]").get_attribute("data-prompt") == prompt
                assert await page.locator(".jubo-ai_chat-user").count() == 1
                assert await page.locator(".jubo-ai_chat-output li").count() == 3
                await page.locator(".jubo-ai_chat-sources summary").click()
                assert await page.locator(".jubo-ai_chat-sources").get_attribute("open") is not None
                await page.locator(".jubo-ai_review-button").click()
                assert await page.locator("[data-chat]").get_attribute("data-status") == "reviewed"
                assert await page.locator(".jubo-ai_chat-output").get_attribute("data-reviewed") == "true"
            await page.screenshot(path=str(OUT / f"{width}-copilot-reviewed.png"))

            await page.locator("[data-prompt='summary']").click()
            await page.wait_for_timeout(100)
            await page.locator("[data-prompt='plan']").click()
            await page.wait_for_function("document.querySelector('[data-chat]').dataset.status==='ready-for-review'")
            assert await page.locator(".jubo-ai_chat-output").count() == 1
            assert await page.locator(".jubo-ai_chat-output strong").inner_text() == "Care-plan starting point"
            assert await page.locator(".jubo-ai_chat-user").count() == 1

            for idea in ["signals", "time", "picture"]:
                trigger = page.locator(f"[data-idea='{idea}']")
                await trigger.focus()
                await page.keyboard.press("Enter")
                assert await page.locator("dialog").get_attribute("open") is not None
                assert await page.locator("dialog").evaluate("(el)=>el.contains(document.activeElement)")
                await page.keyboard.press("Shift+Tab")
                assert await page.locator("dialog").evaluate("(el)=>el.contains(document.activeElement)")
                await page.keyboard.press("Escape")
                assert await trigger.evaluate("(el)=>el===document.activeElement")

            await page.locator("[data-motion-toggle]").click()
            await page.wait_for_timeout(250)
            before = await page.evaluate("juboAIVisual.draws")
            frozen_time = await page.evaluate("juboAIVisual.time")
            await page.wait_for_timeout(1200)
            assert await page.evaluate("juboAIVisual.draws") == before
            assert await page.evaluate("juboAIVisual.time") == frozen_time
            await page.locator("[data-motion-toggle]").click()
            await page.wait_for_timeout(250)
            assert await page.evaluate("juboAIVisual.draws") > before
            assert not errors, errors
            report = {"width": width, "scrollWidth": width, "english": True, "chapters": 7,
                      "dataSources": 5, "capabilities": 5, "conversations": 3,
                      "cancellation": True, "keyboardDialogs": 3, "pause": True,
                      "canvas": 1, "drawCalls": 1, "errors": errors}
            reports.append(report)
            print(json.dumps(report), flush=True)
            await page.close()

        for width in [1440, 375]:
            page, errors = await open_page(width, reduced_motion="reduce")
            assert await page.locator("html").get_attribute("data-motion") == "paused"
            before = await page.evaluate("juboAIVisual.draws")
            await page.wait_for_timeout(1200)
            assert await page.evaluate("juboAIVisual.draws") == before
            assert await page.evaluate("document.getAnimations().length") == 0
            assert await page.locator(".jubo-ai_reveal").evaluate_all(
                "(els)=>els.every(el=>getComputedStyle(el).opacity==='1')"
            )
            await page.locator("#context").evaluate("(el)=>el.scrollIntoView({behavior:'instant'})")
            await page.wait_for_timeout(250)
            assert await page.locator(".jubo-ai_context-stage").evaluate("(el)=>getComputedStyle(el).position") != "sticky"
            await page.screenshot(path=str(OUT / f"reduced-{width}-context.png"))
            await page.locator("[data-prompt='plan']").click()
            await page.wait_for_function("document.querySelector('[data-chat]').dataset.status==='ready-for-review'")
            assert await page.locator(".jubo-ai_chat-output li").count() == 3
            assert not errors, errors
            reports.append({"width": width, "reducedMotion": True, "loopStopped": True,
                            "cssAnimations": 0, "allContentVisible": True, "conversation": True, "errors": errors})
            await page.close()

        for width, budget in [(1440, 2), (375, 1.5)]:
            page, errors = await open_page(width, device_scale_factor=3)
            assert await page.evaluate("juboAIVisual.pixelRatio") <= budget
            await page.set_viewport_size({"width": 767, "height": 900})
            await page.wait_for_timeout(300)
            assert await page.evaluate("document.documentElement.scrollWidth") == 767
            assert await page.evaluate("juboAIVisual.pixelRatio") <= 1.5
            assert not errors, errors
            reports.append({"width": width, "deviceScaleFactor": 3, "dprBudget": budget, "resize": True, "errors": errors})
            await page.close()

        page = await browser.new_page(viewport={"width": 375, "height": 812})
        await page.route("https://**/*", verified_https)
        await page.route("**/three.min.js", lambda route: route.fulfill(status=200, body="/* library unavailable */"))
        await page.goto(URL, wait_until="networkidle")
        assert await page.locator("html").get_attribute("data-webgl") == "unavailable"
        await page.locator("[data-source='vitals']").click()
        assert "noticing changes" in await page.locator("#source-result").inner_text()
        await page.locator("[data-prompt='summary']").click()
        await page.wait_for_function("document.querySelector('[data-chat]').dataset.status==='ready-for-review'")
        reports.append({"webglFallback": True, "dataExplorer": True, "conversation": True})
        await page.close()
        await browser.close()
    (OUT / "acceptance.json").write_text(json.dumps(reports, indent=2))
    print("All v4 browser checks passed.", flush=True)


asyncio.run(main())
