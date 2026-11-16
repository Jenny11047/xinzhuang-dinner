# 新莊晚餐吃什麼？

作者 胡瑜真

想在新莊站或輔大站附近吃晚餐，可以先選預算、用餐方式、星期和時間，再從符合條件的餐點抽一份。每張餐點卡都附價格類型、時段來源、菜單與導航。

[專案規則 AGENTS.md](./AGENTS.md) · [新增店家示範](./evidence/add-a-restaurant.md)

## 操作

1. 可直接開啟 `docs/index.html`。網站發布後也可以直接用公開網址。
2. 選新莊站或輔大站，調整預算與時間。
3. 按「幫我選一份」或瀏覽下方清單。菜單、外帶與時段以卡片連出的來源為準。

## AI 如何接手

把「依照 AGENTS.md 新增一家新莊站的晚餐店」交給 AI。它會查該分店的地址、菜單、價格和時段，填進 `docs/catalog.js`。首頁用同一個模板讀入資料，新增餐點就會進入搜尋、預算篩選與抽選。測試可用 `node tools/check.cjs`。網站原始碼、初版及新增案例的變更可以透過 Git 歷史檢視。

## GitHub Pages

公開 repository → Settings → Pages → Deploy from a branch → `main` / `docs` → Save。

