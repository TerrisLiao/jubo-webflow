#!/usr/bin/env python3
"""Export the canonical v3 into an isolated, unpublished Webflow iframe preview.
Usage: python tools/pack-jubo-ai-v3-preview.py [output-directory]
Generated payloads stay outside the repository by default. This tool never publishes.
"""
from pathlib import Path
import base64
import gzip
import hashlib
import html
import json
import re
import sys

root = Path(__file__).resolve().parent.parent
out = Path(sys.argv[1] if len(sys.argv) > 1 else '/tmp/v3-draft-preview')
out.mkdir(parents=True, exist_ok=True)
source = root / 'custom-code/poc/jubo-ai-agentic-v3.html'
content = source.read_text()

def inline_logo(match):
    name = match.group(1)
    svg = (root / 'custom-code/brand/n-copilot' / name).read_text()
    width = '6.5rem' if 'wordmark' in name else '5.5rem'
    return svg.replace('role="img"', 'role="img" aria-label="N.Copilot" '
                       f'style="width:{width};height:auto;display:block"', 1)

content = re.sub(r'<img[^>]*src="\.\./brand/n-copilot/(n-copilot-(?:horizontal|wordmark)\.svg)"[^>]*>',
                 inline_logo, content)
content = re.sub(r'href="(/[^\"]*)"', lambda m: 'href="https://jubo-health.com' + m.group(1) +
                 '" target="_blank" rel="noopener"', content)
content = content.replace("link:['/ai/amy',", "link:['https://jubo-health.com/ai/amy',")
content = content.replace('class="more" href=', 'class="more" target="_blank" rel="noopener" href=')
# Compression is transport only; all state/animation logic remains readable in canonical v3.
payload = base64.b64encode(gzip.compress(content.encode(), mtime=0)).decode()
loader = '''<!doctype html><html lang="zh-Hant-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><p style="font-family:system-ui;padding:2rem">正在載入 N.Copilot 原型…</p><script>
(async()=>{try{const bytes=Uint8Array.from(atob(''' + repr(payload) + '''),c=>c.charCodeAt(0));const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));const source=await new Response(stream).text();document.open();document.write(source);document.close();}catch(e){document.body.textContent='此瀏覽器無法載入原型，請使用最新版 Chrome、Edge 或 Safari。';console.error(e);}})();
</script></body></html>'''
src = 'data:text/html;base64,' + base64.b64encode(loader.encode()).decode()
attrs = [
    {'name': 'title', 'value': 'N.Copilot｜Jubo AI v3 原型預覽'},
    {'name': 'sandbox', 'value': 'allow-scripts allow-popups allow-popups-to-escape-sandbox'},
    {'name': 'class', 'value': 'jubo-ai-preview_frame'},
    {'name': 'style', 'value': 'display:block;width:100%;height:100vh;border:0'},
    {'name': 'src', 'value': src},
]
(out / 'iframe-attributes.json').write_text(json.dumps(attrs, ensure_ascii=False))
(out / 'iframe-src.txt').write_text(src)
# Separate local srcdoc fixture for inspecting the content when managed browsers block data URLs.
# It is not evidence that the actual Webflow iframe URL rendered in Designer.
frame = '<iframe title="N.Copilot v3" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox" style="display:block;width:100%;height:100vh;border:0" srcdoc="' + html.escape(loader, quote=True) + '"></iframe>'
(out / 'preview.html').write_text('<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0">' + frame + '</body></html>')
manifest = {'source': str(source.relative_to(root)), 'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
            'srcCharacters': len(src), 'unpublished': True}
(out / 'manifest.json').write_text(json.dumps(manifest, indent=2))
print(json.dumps(manifest))
