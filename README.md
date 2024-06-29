# 記帳APP

學習 Vue3 & Quasar2 後的第一個練習專案，主用來熟悉操作Quasar工具及其他相關設定

# Moneyballs (quasar-moneyballs)

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).


## Git commit revise
Module 6 Swipe to delete entry
1. 新增 滑動元件 q-slide-item
2. 移動 v-for="(entry) in entries" :key="entry.id"，從事件項 q-item 到 滑動元件 q-slide-item
3. 滑動元件 q-slide-item 中的 left-color right-color => 修改顏色
4. 滑動元件 q-slide-item 中的 @right => 修改事件名稱
5. 新增 當對事件項左滑刪除時的邏輯 oneEntrySlideRight
   @ 1. 使用 quasar plugins 提供的彈出對話窗
   @ 2. quasar.config.js 配合設定 plugins: ['Dialog']
   @ 3. 匯入useQuasar並實例化，$q.dialog 使用與設定相關功能
6. 新增 刪除事件邏輯 deleteEntry
7. 在刪除事件當中呈現刪除項的資料細節, 配合oneEntrySlideRight中，找到$q.dialog物件，新增設定html:true
8. 新增 刪除事件後，快顯通知使用者
   @ 1. 使用 quasar plugins 提供的快顯通知
   @ 2. quasar.config.js 配合設定 plugins: ['Notify']
   @ 3. 匯入useQuasar並實例化, $q.notify 使用與設定相關功能
