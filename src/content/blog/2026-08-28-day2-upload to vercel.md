---
title: Day 1：資料庫設計與商品管理頁面開發
date: 2026-08-27
category: 專案開發紀錄
tags: [Claude, Next.js,Supabase]
summary: 建立採購流程、設計資料庫
status: published
---
## 前情提要&說明

我是用Claude AI協作，利用AI幫我打造一個系統。

此系列文章的技術層面都是利用AI完成，我只負責執行與提供作品框架，以此希望記錄下自己開發時遇到的困難與成果

# Day 2：實機連線排錯、身份驗證與部署上線

## 今日目標

1. 把 Day 1 完成的頁面實際接上真實 Supabase 專案
2. 排除連線與權限相關問題
3. 加上登入頁保護系統
4. 部署到 Vercel，取得正式可用網址

## 問題一：網頁讀不到 Supabase 資料

**現象**：`.env.local` 已經填了 URL 跟金鑰，但頁面還是讀不到資料。

**原因**：

- Next.js 只會在**啟動伺服器的當下**讀取一次 `.env.local`，改完檔案沒有重新執行 `npm run dev`，網頁讀到的還是舊的（甚至是空的）設定值。
- 另外也發現 `.env.local` 曾經被誤放在子資料夾（如 `app/login/`）裡，Next.js 只認得**專案根目錄**的 `.env.local`。

**解決方式**：

- 確認 `.env.local` 位置與 `package.json` 同一層
- 修改環境變數後，一律 `Ctrl+C` 停掉再重新執行 `npm run dev`

## 問題二：新增商品出現 RLS 錯誤，列表也是空的

**現象**：

```
new row violates row-level security policy for table "products"
```

同時商品列表怎麼樣都是空白。

**原因**：Supabase 新建立的資料表預設會自動開啟 **RLS（Row Level Security）**，但沒有設定任何規則時：

- SELECT 會**安靜地回傳空陣列**（不報錯，但看起來像沒資料）
- INSERT 則會**直接丟出錯誤**

**解決方式**：現階段先暫時關閉 `products` 表的 RLS，待身份驗證機制完成後再重新開啟：

```sql
alter table products disable row level security;
```

## 加上登入頁與權限保護

為了避免部署後任何人拿到網址就能讀寫資料庫，改用 **Supabase Auth** 幫系統加上登入機制：

- 在 Supabase Dashboard 手動建立自己的帳號（不開放公開註冊，新使用者一律由管理者手動新增）
- 新增 `/login` 頁面，透過 `supabase.auth.signInWithPassword` 驗證帳號密碼
- 建立可重複使用的 `RequireAuth` 元件，包住需要登入才能看的頁面：

```tsx
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/login");
      else setSession(data.session);
    });
  }, [router]);

  if (!session) return null;
  return <>{children}</>;
}
```

- 確認登入流程可正常運作後，重新開啟 RLS，並設定「只有已登入使用者能讀寫」的規則：

```sql
alter table products enable row level security;

create policy "Authenticated users can read products"
on products for select
to authenticated
using (true);
```

## 部署到 Vercel（不綁定 GitHub）

因為只需要自己使用，選擇用 **Vercel CLI** 直接從本機部署，不建立 GitHub 連動：

```bash
npm install -g vercel
vercel login
vercel        # 建立預覽版本
vercel --prod # 建立正式版本
```

**排錯筆記**：

- Vercel 帳號用 GitHub 登入，**不代表這次部署會用到 GitHub**——CLI 部署是直接把本機程式碼上傳到 Vercel 伺服器，不會建立任何 GitHub repo。
- 環境變數要另外到 Vercel Dashboard → **Settings → Environment Variables** 設定（Production / Preview / Development 三個環境都要勾），設定完必須**重新執行 `vercel --prod`** 才會生效，因為 Next.js 會在建置（build）當下把環境變數封裝進結果檔案，不是執行時才讀取。

## 今日進度總結

- ✅ 排除環境變數與 RLS 兩個連線問題
- ✅ 完成登入頁與權限保護機制（`RequireAuth` 元件可供未來頁面重複使用）
- ✅ 成功用 Vercel CLI 部署，取得正式網址
- ✅ 設定 Vercel 環境變數，正式環境可正常連線並登入

## 下一階段

系統的骨架、資料庫、身份驗證都已經到位，下一步將以同樣的模式，開發 `/suppliers`（廠商管理）頁面，並逐步串起採購單、報價單、到貨紀錄等模組。
