#!/usr/bin/env python3
"""Create a six-file project handoff without overwriting an existing project."""
import argparse
from pathlib import Path
import re

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--slug', required=True, help='lowercase topic, e.g. community')
parser.add_argument('--title', required=True, help='human readable project name')
args = parser.parse_args()
if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', args.slug):
    parser.error('slug must contain lowercase letters/numbers with single hyphens')
root = Path(__file__).resolve().parents[1]
destination = root / 'docs/projects' / args.slug
if destination.exists():
    parser.error('project already exists; update its current-state/tasks/deployment instead')
templates = root / 'docs/templates/project'
destination.mkdir(parents=True)
for name in ['current-state.md', 'tasks.md', 'decisions.md', 'changelog.md', 'deployment.md']:
    (destination / name).write_text((templates / name).read_text())
(destination / 'README.md').write_text(
    f'# {args.title}\n\n'
    '狀態：新交接骨架，尚未驗證、尚未部署。\n\n'
    '- [現況](current-state.md)\n- [待辦](tasks.md)\n'
    '- [決策](decisions.md)\n- [歷程](changelog.md)\n- [部署](deployment.md)\n\n'
    '填入來源分支／提交、文件日期及 Webflow 驗證日期；完成後在專案列表登記。\n'
)
print(destination)
