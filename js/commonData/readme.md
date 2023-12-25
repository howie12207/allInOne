# 常用資料

## 使用方法

1. 在index.html內 新增 引用js

```html
<head>
    <script src="https://event.franklin.com.tw/commonResources/js/fetchCommonData.min.js"></script>
</head>
```

2. main.js 新增對應data名稱 seasonDate

```js
seasonDate: "",
```

3. index.html 在呈現的地方加上 seasonDate

```html
<span>{{ seasonDate }}</span>
```

4. 若是要調整測試機資料，則至 commonResources/js/commonData-dev.json

5. 若是要調整正式機資料，則至 commonResources/js/commonData.json


