#!/usr/bin/env bash
# 產生要貼回 Webflow「頁面自訂程式碼」的四份檔案。
# 用法：bash build.sh
#
# 為什麼圖片比例對照表不放進 embed：
#   加進去之後單一 embed 會到 23KB，超過 MCP 工具單次寫入的上限。
#   Webflow 的頁面自訂程式碼剛好有 head 與 footer 兩個獨立區塊，
#   拆成兩處就都在限制內。embed-*.html 這次完全沒動（維持 v8 / v13）。
set -euo pipefail
cd "$(dirname "$0")"

# head：封面圖比例（news 的 head 另有既有的報名按鈕樣式，要一併保留）
{
  cat _page-head-existing-news.html
  echo '<style>'
  cat _cover-aspect-news.css
  echo '</style>'
} > page-head-news.html

{ echo '<style>'; cat _cover-aspect-story.css; echo '</style>'; } > page-head-story.html

# footer：內文圖片比例
{ echo '<style>'; cat _img-aspect-news.css;  echo '</style>'; } > page-footer-news.html
{ echo '<style>'; cat _img-aspect-story.css; echo '</style>'; } > page-footer-story.html

wc -c page-head-news.html page-head-story.html page-footer-news.html page-footer-story.html
