# 優惠組件

## 使用方法

1. 新增對應 css style

2. 新增對應 head script

```html
<script src="https://event.franklin.com.tw/commonResources/js/httpVueLoader.js"></script>
```

3. 新增對應 body

```html
<discount></discount>
```

4. 新增對應 components

```js
discount: httpVueLoader(
    window.location.hostname === 'www.franklin.com.tw' ||
        window.location.hostname === 'event.franklin.com.tw' ||
        window.location.hostname === 'etrade.franklin.com.tw'
        ? `https://event.franklin.com.tw/commonResources/component/discount.vue`
        : `https://event.franklin.com.tw/commonResources/component/discount_test.vue`
),
```
