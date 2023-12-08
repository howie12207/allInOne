# 輪播組件

## 使用方法

1. 在 head 標籤中放入 swiper css 及 js

```html
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
</head>
```

2. 在 body 中新增對應的 html template

3. 三種不同的輪播組件的樣式分別用.swiper-content-1, .swiper-content-2, .swiper-content-3 作為母樣式管理，以免同個頁面調用了複數個輪播組件後樣式相互影響。如果有同個組件需要重複使用，應把相應的 id 跟 class 後方數字疊加，因單一組件是以 id 為基準來生成的。

> 例:

> [HTML]

```html
<div id="swiper-content-4" class="swiper-content-4"></div>
```

> [JS] script 中 new Swiper 第一個參數也應更改如下:

```js

    new Swiper('#swiper-content-4', ...)

```

4. 若要移除頁籤或前後頁控制 icon，也需同步移除在 script 中 new Swiper 內的設置(在註釋" 可選：頁籤 "及" 可選：前後頁控制 "的下一行)

## 備註

可參考[Swiper API](https://swiperjs.com/swiper-api)

```

```
