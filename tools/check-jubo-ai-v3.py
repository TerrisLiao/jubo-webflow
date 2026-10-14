#!/usr/bin/env python3
"""Jubo AI v3 browser acceptance; requires Python Playwright and a local HTTP server.
POC_BASE_URL=http://127.0.0.1:8765/ POC_CHROMIUM_PATH=/usr/bin/chromium python tools/check-jubo-ai-v3.py
Screenshots/reports stay in POC_OUTPUT_DIR (default /tmp/v3), never the repository.
"""
import asyncio,os,json
from pathlib import Path
from playwright.async_api import async_playwright
URL=os.environ.get('POC_BASE_URL','http://127.0.0.1:8765/').rstrip('/')+'/custom-code/poc/jubo-ai-agentic-v3.html'
OUT=Path(os.environ.get('POC_OUTPUT_DIR','/tmp/v3')); OUT.mkdir(exist_ok=True)
async def main():
 results=[]
 async with async_playwright() as p:
  b=await p.chromium.launch(executable_path=os.environ.get('POC_CHROMIUM_PATH','/usr/bin/chromium'),headless=True,proxy=({'server':os.environ['HTTPS_PROXY'],'bypass':'localhost,127.0.0.1'} if os.environ.get('HTTPS_PROXY') else None),args=['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist'])
  for width in [1440,991,375]:
   page=await b.new_page(viewport={'width':width,'height':900 if width>=768 else 812})
   errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
   page.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
   await page.goto(URL,wait_until='networkidle');await page.wait_for_timeout(6000)
   await page.screenshot(path=str(OUT/f'{width}-hero-accepted.png'))
   assert await page.locator('#copilot-birth').get_attribute('data-complete')=='true'
   assert await page.locator('canvas').count()==1
   assert not await page.locator('html').evaluate('(e)=>e.classList.contains("no-webgl")')
   assert await page.evaluate('THREE.REVISION')=='155'
   assert await page.locator('#live-mode').get_attribute('data-state')=='idle'
   await page.locator('#prompt-input').focus()
   assert await page.locator('#live-mode').get_attribute('data-state')=='listening'
   await page.locator('.pchip[data-scenario="amy"]').click()
   await page.wait_for_function('document.querySelector("#live-mode").dataset.state==="thinking"')
   await page.wait_for_function('document.querySelector("#live-mode").dataset.state==="answering"')
   assert await page.locator('#prompt-input').input_value()=='明天家訪前，陳奶奶最近怎麼樣？'
   await page.wait_for_function('document.querySelector("#demo-thread").dataset.status==="awaiting-confirmation"',timeout=18000)
   assert await page.locator('#demo-thread').get_attribute('data-scenario')=='amy'
   await page.locator('#constellation').evaluate('(el)=>el.scrollIntoView({block:"center"})')
   await page.wait_for_function('document.querySelectorAll(".hs.is-show").length===7',timeout=20000)
   assert await page.locator('.hs.is-show').count()==7
   boxes=await page.locator('.hs').evaluate_all('(els)=>els.map(e=>({id:e.dataset.id,x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y,w:e.offsetWidth,h:e.offsetHeight}))')
   assert all(e['x']>=0 and e['x']+e['w']<=width for e in boxes),boxes
   for i in range(7):
    hotspot=page.locator('.hs').nth(i);await hotspot.focus();await page.keyboard.press('Enter')
    await page.wait_for_timeout(100)
    assert await page.locator('#pop').is_visible()
    assert await page.locator('#pop-close').evaluate('(e)=>e===document.activeElement')
    await page.keyboard.press('Shift+Tab')
    assert await page.locator('#pop').evaluate('(e)=>e.contains(document.activeElement)')
    await page.keyboard.press('Escape');await page.wait_for_timeout(420)
    assert await hotspot.evaluate('(e)=>e===document.activeElement')
   await page.locator('#demo').evaluate('(el)=>el.scrollIntoView({block:"center"})');await page.wait_for_timeout(1400)
   for id in ['handover','amy','family','ibee']:
    await page.locator('.tab[data-scenario="'+id+'"]').click()
    await page.wait_for_function('document.querySelector("#demo-thread").dataset.status==="awaiting-confirmation"',timeout=14000)
    assert await page.locator('.copilot_tool').count()==3
    await page.locator('.copilot_tool summary').first.click()
    assert await page.locator('.copilot_tool').first.get_attribute('open') is not None
    assert await page.locator('.copilot_tool').first.locator('p').is_visible()
    await page.locator('.confirm button').click()
    assert await page.locator('#demo-thread').get_attribute('data-status')=='confirmed'
    assert await page.locator('.out').evaluate('(e)=>e.classList.contains("is-confirmed")')
    assert await page.locator('.confirm button').is_disabled()
    await page.screenshot(path=str(OUT/f'{width}-scenario-{id}.png'))
   # Rapid scenario replacement must discard stale async results.
   await page.locator('.tab[data-scenario="handover"]').click();await page.wait_for_timeout(350)
   await page.locator('.tab[data-scenario="family"]').click()
   await page.wait_for_function('document.querySelector("#demo-thread").dataset.status==="awaiting-confirmation"')
   assert await page.locator('#demo-out').count()==1
   assert '林奶奶' in await page.locator('#demo-out').inner_text()
   assert await page.locator('.disclaimer').inner_text()=='示意流程：床號、姓名與數值皆為虛構，非實際產品畫面。'
   pins=await page.locator('.pin-spacer').count()
   assert pins==(3 if width>=768 else 0)
   assert await page.evaluate('document.documentElement.scrollWidth')==width
   assert not errors,errors
   results.append({'width':width,'errors':errors,'scrollWidth':width,'pins':pins,'birth':True,'liveStates':True,'chipTransfer':True,'hotspots':boxes,'keyboardDialogs':7,'scenarios':['handover','amy','family','ibee'],'toolsExpandable':True,'confirmation':True,'cancellation':True})
   print(f'{width}px: birth, live states, 7 keyboard dialogs, 4 scenarios, cancellation: PASS',flush=True)
   await page.close()
  for width in [1440,375]:
   page=await b.new_page(viewport={'width':width,'height':900 if width>=768 else 812},reduced_motion='reduce')
   await page.add_init_script('''window.glDrawCalls=0;
    [WebGLRenderingContext,WebGL2RenderingContext].forEach(T=>{const draw=T.prototype.drawArrays;T.prototype.drawArrays=function(...args){window.glDrawCalls++;return draw.apply(this,args);};});''')
   await page.goto(URL,wait_until='networkidle');await page.wait_for_timeout(1000)
   assert await page.locator('.pin-spacer').count()==0
   for id in ['hero','inflow','layers','constellation','demo','speed','trust','cta']:
    await page.locator('#'+id).evaluate('(e)=>e.scrollIntoView({block:"center"})');await page.wait_for_timeout(250)
    await page.screenshot(path=str(OUT/f'reduced-{width}-{id}.png'))
   assert await page.evaluate('document.documentElement.scrollWidth')==width
   assert await page.evaluate('document.getAnimations().filter(a=>a.effect.getTiming().iterations===Infinity).length')==0
   before=await page.evaluate('window.glDrawCalls');await page.wait_for_timeout(1200);after=await page.evaluate('window.glDrawCalls')
   assert after-before<=1,(before,after)
   await page.locator('#demo').evaluate('(e)=>e.scrollIntoView({block:"center"})')
   for id in ['handover','amy','family','ibee']:
    await page.locator('.tab[data-scenario="'+id+'"]').click();await page.wait_for_function('document.querySelector("#demo-thread").dataset.status==="awaiting-confirmation"')
    await page.locator('.confirm button').click()
   results.append({'reduced':True,'width':width,'pins':0,'infiniteAnimations':0,'webglDrawDelta':after-before,'allChaptersReadable':True,'allScenarios':True})
   print(f'reduced {width}px: readable, no pin, no infinite animation, all scenarios: PASS',flush=True)
   await page.close()
  await b.close()
 (OUT/'interaction-report.json').write_text(json.dumps(results,ensure_ascii=False,indent=2));print(json.dumps(results,ensure_ascii=False,indent=2))
asyncio.run(main())
