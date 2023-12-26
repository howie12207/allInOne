# 優惠組件

## 使用方法

1. 新增對應 css style

```css
.text-center {
    text-align: center;
}
.text-blue {
    color: #005598;
}
.tit-type2 {
    margin: 20px 0px;
    text-align: center;
    font-size: 36px;
    line-height: 1.6;
    position: relative;
    font-weight: 900;
    color: #18366c;
}
.row {
    margin: 5px -12px;
    font-size: 0px;
    text-align: center;
}
.col-24 {
    box-sizing: border-box;
    padding: 12px;
    display: inline-block;
    vertical-align: top;
    font-size: 18px;
}
.col-12 {
    width: 50%;
    box-sizing: border-box;
    padding: 12px;
    display: inline-block;
    vertical-align: top;
    font-size: 18px;
}
.discount-item {
    line-height: 1.75;
}
@media (max-width: 767px) {
    .col-sm-24 {
        width: 100%;
    }
}
```

2. 新增對應 script

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
