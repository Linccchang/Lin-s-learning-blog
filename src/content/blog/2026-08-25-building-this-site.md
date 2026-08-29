---
title: 打造個人部落格的過程與決策
date: 2026-08-25
category: 學習紀錄
tags: [Astro, Markdown, 網站架構]
summary: 為什麼選擇 Markdown + Astro，而不是 CMS 或資料庫，以及這個決定背後的取捨。
status: published
---

這是這個網站的第一篇文章，記錄一下為什麼會長成現在這個樣子。

## 目標很單純

我想要一個地方，可以放：

- 技術文章
- 學習紀錄
- 專案開發過程
- 個人介紹

但**不想要**維護後台、不想要碰資料庫，也不想要花太多時間在「網站本身」而不是「內容」上。

## 為什麼是 Markdown + Astro

最後選擇的組合是純 Markdown 檔案 + Astro 的內容集合（content collections），原因很直接：

1. 每一篇文章就是一個 `.md` 檔案，寫完 `git push` 就上線
2. 版本歷史交給 Git，不用自己做「文章修改紀錄」的功能
3. Astro 預設輸出靜態網站，不需要伺服器維運

之後新增文章的流程大概會是：

```bash
cp templates/post.md src/content/blog/2026-09-01-new-post.md
# 編輯內容
git add . && git commit -m "post: 新文章標題"
git push
```

## 接下來

之後會陸續補上專案頁面的內容、串接 RSS，以及把碩士研究過程中的筆記慢慢搬過來。
