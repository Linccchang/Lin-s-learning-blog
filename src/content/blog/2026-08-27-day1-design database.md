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

## 今日目標

1. 設計實驗室採購管理系統的資料庫結構
2. 在 Supabase 建立資料表
3. 用 Next.js 開發第一個功能頁面：`/products`（商品管理）

## 資料庫設計重點

在建表之前，先釐清了幾個容易忽略的設計決策：

- **貨號該存在哪裡？** 同一款商品在不同廠商底下可能有不同的貨號，因此貨號不放在商品主檔，而是放在「商品與廠商的關聯表」裡。
- **採購單的總金額怎麼算？** 不是系統自動加總估價，而是依報價單或發票金額，由使用者手動填入——因為下單當下往往還不知道實際成交價。
- **狀態欄位設計成固定選項**，避免自由輸入造成資料格式不一致：

```
收到採購訊息 → 詢問廠商 → 已收到報價 → 待簽核 → 已下單 → 出貨 → 完成
```

最終確定了 7 張資料表：`products`、`suppliers`、`product_suppliers`、`purchase_orders`、`purchase_order_items`、`quotations`、`deliveries`，並用 SQL 一次建立：

```sql
create table products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  brand       text,
  spec        text,
  category    text,
  note        text,
  created_at  timestamptz not null default now()
);
```

## 商品管理頁面開發

用 Next.js（App Router）+ Supabase JS SDK，實作 `/products` 頁面，依序完成五個功能：

### 1. 商品列表（讀取）

透過 Supabase 的 SELECT 查詢，頁面載入時自動抓取所有商品：

```ts
const { data, error } = await supabase
  .from("products")
  .select("*")
  .order("created_at", { ascending: false });
```

### 2. 新增商品

拆出一個共用的 `ProductForm` 元件，供新增與編輯共用邏輯，送出時執行 INSERT：

```ts
const { error } = await supabase.from("products").insert(values);
```

### 3. 編輯商品

點擊「編輯」帶出原本資料，送出時依 `id` 執行 UPDATE：

```ts
const { error } = await supabase
  .from("products")
  .update(values)
  .eq("id", editingProduct.id);
```

### 4. 刪除商品

刪除前跳出瀏覽器確認視窗，避免誤刪：

```ts
const confirmed = window.confirm(`確定要刪除「${product.name}」嗎？`);
if (!confirmed) return;

const { error } = await supabase.from("products").delete().eq("id", product.id);
```

### 5. 搜尋商品

商品數量不多時，直接在前端對已讀取的資料做關鍵字過濾，不用每打一個字就打一次資料庫：

```ts
const filteredProducts = keyword
  ? products.filter((p) =>
      [p.name, p.brand, p.spec, p.category, p.note]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(keyword))
    )
  : products;
```

## 今日進度總結

- ✅ 完成 7 張資料表設計與建立
- ✅ 完成 `/products` 頁面五個核心功能（列表、新增、編輯、刪除、搜尋）
- ✅ 每個功能都搭配對應的手動測試步驟驗證

第一天的開發階段主要是「從零建立」，還沒有連上真實環境做完整測試，因此本階段沒有遇到實際的錯誤與排錯過程——這部分留到第二天實機測試時發生。

---

📌 下一篇：[Day 2：實機連線排錯、身份驗證與部署上線](#)
