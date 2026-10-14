#!/usr/bin/env python3
"""Pack an English prototype for the existing isolated Draft iframe.

Usage: python tools/pack-jubo-ai-preview.py [output-directory] [--version 4|5]
Canonical code stays readable in the repository. Gzip is transport only.
This tool does not write to Webflow or publish any site.
"""
import base64
import argparse
import gzip
import hashlib
import html
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("output_directory", nargs="?")
parser.add_argument("--version", choices=[4, 5], type=int, default=4,
                    help="Keep v4 as the compatible default; select v5 explicitly.")
args = parser.parse_args()
SOURCE = ROOT / f"custom-code/poc/jubo-ai-agentic-v{args.version}.html"
OUT = Path(args.output_directory or f"/tmp/v{args.version}-draft-preview")
OUT.mkdir(parents=True, exist_ok=True)
content = SOURCE.read_text()
content = re.sub(
    r'href="(/[^"]*)"',
    lambda match: 'href="https://www.jubo-health.com' + match.group(1)
    + '" target="_blank" rel="noopener"',
    content,
)
payload = base64.b64encode(gzip.compress(content.encode(), mtime=0)).decode()
loader = """<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><p style="font-family:system-ui;padding:2rem">Loading Jubo AI…</p><script>
(async()=>{try{const bytes=Uint8Array.from(atob("""
loader += repr(payload)
loader += """),c=>c.charCodeAt(0));const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));const source=await new Response(stream).text();document.open();document.write(source);document.close();}catch(e){document.body.textContent='Please open this preview in a current version of Chrome, Edge, or Safari.';console.error(e);}})();
</script></body></html>"""
src = "data:text/html;base64," + base64.b64encode(loader.encode()).decode()
attrs = [
    {"name": "title", "value": (
        "Jubo AI — English gradient prototype v4" if args.version == 4
        else "Jubo AI — Centered immersive prototype v5"
    )},
    {"name": "sandbox", "value": "allow-scripts allow-popups allow-popups-to-escape-sandbox"},
    {"name": "class", "value": "jubo-ai-preview_frame"},
    {"name": "style", "value": "display:block;width:100%;height:100vh;border:0"},
    {"name": "src", "value": src},
]
(OUT / "iframe-attributes.json").write_text(json.dumps(attrs))
(OUT / "iframe-src.txt").write_text(src)
# Local srcdoc fixture verifies the exported content and sandbox interactions.
# It does not prove that the data URL rendered in the live Designer.
frame = f'<iframe title="Jubo AI v{args.version}" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox" style="display:block;width:100%;height:100vh;border:0" srcdoc="'
frame += html.escape(loader, quote=True) + '"></iframe>'
(OUT / "preview.html").write_text('<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0">' + frame + "</body></html>")
manifest = {
    "source": str(SOURCE.relative_to(ROOT)),
    "sourceSha256": hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
    "srcCharacters": len(src),
    "unpublished": True,
}
(OUT / "manifest.json").write_text(json.dumps(manifest, indent=2))
print(json.dumps(manifest))
