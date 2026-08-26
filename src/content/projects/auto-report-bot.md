---
name: 自動週報生成機器人
summary: 從 GitHub commit 與 Notion 任務紀錄自動彙整成週報草稿，貼到 Slack。
techStack: [n8n, OpenAI API, GitHub API, Slack]
status: 已完成
repoUrl: https://github.com/yourname/auto-report-bot
demoUrl:
date: 2026-05-02
featured: true
---

## 想解決的問題

每週五要花 30-40 分鐘整理週報，內容其實都散落在 GitHub commit 訊息跟 Notion 任務裡，手動彙整很浪費時間。

## 開發歷程

用 n8n 串接三個服務：抓取本週 GitHub commits、抓取 Notion 完成的任務、丟給 LLM 整理成週報草稿格式，最後貼到指定的 Slack 頻道，人工只需要微調用詞即可發送。

## 成果

週報整理時間從 30-40 分鐘縮短到 5 分鐘以內（多花的時間是人工校對）。這個專案也是我第一次完整走過「串接多個 API + LLM 後製」的自動化流程，很多經驗後來用在 RAG 專案上。
