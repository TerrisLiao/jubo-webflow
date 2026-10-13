#!/usr/bin/env python3
"""Check maintained Markdown links, project handoff shape and import provenance."""
import json
from pathlib import Path
import re
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
errors = []
for path in ROOT.rglob('*.md'):
    if '.git' in path.parts or 'branch-variants' in path.parts:
        continue  # Original byte-preserved evidence, never maintained policy.
    text = path.read_text()
    if re.search(r'^(<<<<<<<|>>>>>>>)(?: |$)', text, re.M):
        errors.append(f'{path.relative_to(ROOT)}: unresolved merge marker')
    for match in re.finditer(r'\]\(([^)]+)\)', text):
        target = match.group(1).strip('<>').split('#', 1)[0]
        if not target or '://' in target or target.startswith('mailto:'):
            continue
        destination = path.parent / unquote(target)
        if not destination.exists():
            errors.append(f'{path.relative_to(ROOT)}: missing link {target}')

required = {'README.md', 'current-state.md', 'tasks.md', 'decisions.md', 'changelog.md', 'deployment.md'}
for project in (ROOT / 'docs/projects').iterdir():
    if not project.is_dir():
        continue
    missing = required - {p.name for p in project.iterdir()}
    if missing:
        errors.append(f'{project.relative_to(ROOT)}: missing {sorted(missing)}')

manifest = json.loads((ROOT / 'docs/workflows/import-manifest.json').read_text())
for row in manifest['files']:
    if not re.fullmatch('[0-9a-f]{40}', row['ref']) or not re.fullmatch('[0-9a-f]{40}', row['blob']):
        errors.append(f"invalid provenance SHA: {row['file']}")
    if not (ROOT / row['destination']).exists():
        errors.append(f"missing integrated destination: {row['destination']}")
    if row.get('variant') and not (ROOT / row['variant']).exists():
        errors.append(f"missing original variant: {row['variant']}")

if errors:
    print('\n'.join(errors))
    raise SystemExit(1)
print('Markdown paths, project handoffs and import provenance: OK')
