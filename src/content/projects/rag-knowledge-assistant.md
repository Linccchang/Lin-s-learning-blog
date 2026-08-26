---
name: RAG 自動化知識助理
summary: 讓實驗室內部文件可以用自然語言查詢的檢索增強生成系統。
techStack: [Python, LangChain, FastAPI, Qdrant]
status: 進行中
repoUrl: https://github.com/yourname/rag-knowledge-assistant
demoUrl:
date: 2026-07-20
featured: true
---

## 想解決的問題

實驗室累積了大量的會議紀錄、論文筆記、程式碼註解，但找資料常常要翻好幾個資料夾。這個專案想讓大家可以直接用自然語言問問題，系統從內部文件找出相關段落並生成回答。

## 開發歷程

- **v0.1**：先用最陽春的做法（固定 chunk size + cosine similarity）跑通流程
- **v0.2**：發現檢索品質是瓶頸，加入 reranker，細節寫在[這篇筆記](/blog/2026-08-18-rag-note)
- **v0.3（進行中）**：嘗試把文件更新自動化，新文件上傳後自動重新索引

## 技術重點

- 使用 Qdrant 作為向量資料庫
- FastAPI 提供查詢 API，前端先用簡單的 CLI 測試
- 評估方式：手動標註 30 組問答對，比對回答的相關性
