#!/bin/sh
# 抓正式站 /contact 的 HTML，從裡面取出當前版本的 Webflow CSS。
# CSS 檔名帶版號，每次 publish 都會變，所以不要寫死。
set -e
curl -sSL -o contact.html https://jubo-health.com/contact
CSS=$(grep -oE 'https://cdn\.prod\.website-files\.com/[^"]*\.css' contact.html | head -1)
echo "site css: $CSS"
curl -sSL -o wf.css "$CSS"
wc -c wf.css
