# 滾動 效果

## 使用方法

1. 在 head 標籤中放入 scrollTo.js，同時檔案也需放到路徑下

```html
<head>
    <script src="https://event.franklin.com.tw/commonResources/js/scrollTo.min.js"></script>
</head>
```

2. 若功能為點擊後滑動，則在點擊的元素加上 @click="$scrollTo({ target: '.XXX' })" (.XXX 為 class 名稱)

```html
<button @click="$scrollTo({target: '.header'})"></button>
```

## 參數介紹

| 參數名稱 | 描述         | Default | 備註                                          |
| -------- | ------------ | ------- | --------------------------------------------- |
| target   | 滾動至目標   | 必填    | 可為 class (.XXX) 或 id (#XXX) 或 元素 (body) |
| behavior | 滾動行為     | smooth  | 可為 smooth, instant, auto                    |
| block    | 垂直對齊     | start   | 可為 start, center, end, nearest              |
| inline   | 水平對齊     | nearest | 可為 start, center, end, nearest              |
| delay    | 是否延遲滾動 | false   | 可為 true, false                              |

## 備註

**@click 需搭配 Vue**

可參考[MDN - Element.scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView#inline)
