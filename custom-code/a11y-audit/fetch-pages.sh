#!/usr/bin/env bash
# 抓 jubo-health.com sitemap 的每一頁，存成靜態 HTML 快照供後續分析。
# 用法：bash fetch-pages.sh [輸出目錄]  （預設 ./_work）
set -euo pipefail

OUT="${1:-_work}"
BASE="https://www.jubo-health.com"
mkdir -p "$OUT/pages"

echo "→ 抓 sitemap"
curl -sS -m 30 -o "$OUT/sitemap.xml" "$BASE/sitemap.xml"
grep -o '<loc>[^<]*</loc>' "$OUT/sitemap.xml" | sed 's/<[^>]*>//g' > "$OUT/urls.txt"
echo "  $(wc -l < "$OUT/urls.txt") 個 URL"

echo "→ 逐頁抓取"
: > "$OUT/fetch.log"
while read -r u; do
  f=$(echo "$u" | sed "s|$BASE||; s|^\$|/home|; s|/|_|g")
  code=$(curl -sS -m 30 -o "$OUT/pages/${f}.html" -w '%{http_code}' "$u" || echo 000)
  echo "$code ${f}" >> "$OUT/fetch.log"
done < "$OUT/urls.txt"

ok=$(grep -c '^200' "$OUT/fetch.log" || true)
echo "  200: $ok / $(wc -l < "$OUT/urls.txt")"
grep -v '^200' "$OUT/fetch.log" || true

cat <<EOF

完成。接著在 $OUT 下執行：
  npm install cheerio playwright @axe-core/playwright
  node ../audit.mjs        # 結構指標 -> audit-raw.json
  node ../report.mjs       # 彙總報表
  node ../alt-classify.mjs # alt 分類 -> alt-informative.json
  node ../axe-run.mjs      # axe-core 16 個模板頁 -> axe-results.json
  node ../score.mjs        # JA11Y-23 分數
EOF
