# learning/log — 個人部落格

用 Markdown 檔案驅動的個人部落格：文章、學習紀錄、專案作品集、個人介紹。
技術：[Astro](https://astro.build)（純靜態網站，不需要資料庫、不需要後台）。

---

## 開發前準備

需要 Node.js 22 以上版本。

```bash
npm install
npm run dev
```

打開 `http://localhost:4321` 就能看到網站。

---

## 怎麼新增一篇文章

1. 複製範本檔：

   ```bash
   cp templates/post-template.md src/content/blog/2026-09-01-my-new-post.md
   ```

   檔名建議用 `年-月-日-標題關鍵字.md`，方便排序與辨識。

2. 打開新檔案，修改最上面的 frontmatter（兩條 `---` 中間的區塊）：

   ```yaml
   ---
   title: 文章標題
   date: 2026-09-01
   category: 學習紀錄   # 只能是：學習紀錄 / 專案開發紀錄 / 技術文章 / 鐵人賽系列
   tags: [Python, 自動化]
   summary: 一到兩句話說明這篇在寫什麼，會顯示在列表頁。
   status: draft        # 寫完後改成 published 才會顯示在網站上
   ---
   ```

3. 在 frontmatter 下面直接用 Markdown 寫內容（標題、清單、程式碼區塊、圖片都支援）。

4. 寫完後把 `status: draft` 改成 `status: published`。

5. 存檔、上傳到 GitHub：

   ```bash
   git add .
   git commit -m "post: 文章標題"
   git push
   ```

   如果照下面「部署」章節設定好 Vercel，push 之後幾十秒內網站就會自動更新，不需要任何其他步驟。

### 同步 IT 鐵人賽文章

如果這篇文章要參加鐵人賽，額外加三個欄位：

```yaml
category: 鐵人賽系列
series: 2026鐵人賽-AI自動化
day: 1
ithomeUrl: https://ithelp.ithome.com.tw/articles/xxxx
```

原則：**先寫在這裡，寫完再複製貼上到 iThome**，這樣你自己的網站會保留完整的原始內容與版本紀錄。

---

## 怎麼新增一個作品

1. 複製範本檔：

   ```bash
   cp templates/project-template.md src/content/projects/my-project.md
   ```

2. 修改 frontmatter：

   ```yaml
   ---
   name: 專案名稱
   summary: 一句話說明解決什麼問題。
   techStack: [Python, FastAPI]
   status: 進行中       # 進行中 / 已完成 / 停止維護
   repoUrl: https://github.com/yourname/my-project
   demoUrl:             # 還沒有 Demo 就留空
   date: 2026-09-01
   featured: true       # true 會出現在首頁「精選作品」
   ---
   ```

3. 下面用 Markdown 寫「想解決的問題」「開發歷程」「技術重點」。

4. 一樣 `git add . && git commit -m "..." && git push`。

---

## 部署（免費，用 Vercel）

1. 把這個專案上傳到你自己的 GitHub repo（如果還沒建立）：

   ```bash
   git init
   git add .
   git commit -m "init: 個人網站"
   git branch -M main
   git remote add origin https://github.com/yourname/your-repo.git
   git push -u origin main
   ```

2. 到 [vercel.com](https://vercel.com) 用 GitHub 帳號登入。
3. 點 **Add New → Project**，選擇你剛剛推上去的 repo。
4. Framework 會自動偵測成 Astro，不用改任何設定，直接點 **Deploy**。
5. 部署完成後會拿到一個 `你的專案.vercel.app` 網址，之後每次 `git push` 都會自動重新部署。

部署完成後，記得回來把 `astro.config.mjs` 裡的 `site` 換成你實際拿到的網址（RSS 需要這個資訊）：

```js
export default defineConfig({
  site: 'https://你的專案.vercel.app',
});
```

改完一樣 commit + push 一次。

---

## 資料夾說明

```
src/
├── content/
│   ├── blog/          每一篇文章一個 .md 檔
│   └── projects/      每一個作品一個 .md 檔
├── content.config.ts  文章與作品的欄位規則（frontmatter schema）
├── layouts/
│   └── BaseLayout.astro   共用的頁首/頁尾
├── lib/
│   └── format.ts      日期格式、分類代碼
├── pages/
│   ├── index.astro    首頁
│   ├── about.astro     關於我
│   ├── blog/           文章列表 + 單篇文章
│   ├── projects/       作品列表 + 單一作品
│   └── rss.xml.js      RSS 訂閱
└── styles/
    └── global.css      所有樣式（顏色、字體、hover 效果都在這）

templates/               新增文章/作品時複製用的範本
```

---

## 之後想做的事（不急，先讓網站跑起來）

- [ ] 把 `about.astro` 裡的 Email / GitHub / LinkedIn 連結換成自己的
- [ ] 換掉 `public/placeholder-portrait.svg` 為真實照片
- [ ] 上傳 `public/resume.pdf`
- [ ] 到 Google Search Console 註冊網站，加快被搜尋到的速度
- [ ] （選用）換一個自訂網域，在 Vercel 專案設定裡的 Domains 加上去即可
