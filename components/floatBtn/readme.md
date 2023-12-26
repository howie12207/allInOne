# 懸浮按鈕組件

## 使用方法

1. 新增對應 css style

```css
.float-btn {
    position: fixed;
    bottom: 16px;
    left: 0;
    right: 0;
    z-index: 9;
    display: flex;
    width: 90%;
    height: min-content;
    margin: 0 auto;
}
.float-btn-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #fff;
    padding: 8px 4px;
    letter-spacing: 4px;
    transition: opacity 0.3s;
    border: 4px solid #fff;
    text-decoration: none;
    box-sizing: border-box;
}
.float-btn-item:hover {
    opacity: 0.8;
}
.float-btn-item:first-child {
    border-radius: 48px;
    background-color: #004790;
}
.float-btn-item:nth-child(2) {
    border-radius: 0 48px 48px 0;
    background-color: #519e2f;
}
.float-btn-item:nth-child(3) {
    border-radius: 0 48px 48px 0;
    background-color: #e08100;
}
@media (max-width: 767px) {
    .float-btn.two-btns .float-btn-item:first-child,
    .float-btn.three-btns .float-btn-item:first-child {
        border-radius: 48px 0 0 48px;
        border-right: 2px;
    }
    .float-btn.three-btns .float-btn-item:nth-child(2) {
        border-radius: 0;
        border-right: 2px;
    }
}
@media (min-width: 768px) {
    .float-btn {
        flex-direction: column;
        justify-content: center;
        width: initial;
        top: 50%;
        left: initial;
        transform: translateY(-50%);
    }
    .float-btn .float-btn-item {
        border-radius: 8px 0 0 8px;
        writing-mode: vertical-lr;
        border: none;
        letter-spacing: 6px;
        width: 40px;
        margin: 4px 0;
    }
}
```

2. 新增對應 body

```html
<!-- 根據需求自行刪減第二顆與第三顆按鈕 -->
<!-- 若只需要一顆按鈕，則移除class "three-btns" -->
<!-- 若需要二顆按鈕，則移除class "three-btns"，並新增class "two-btns" -->
<!-- 若需要三顆按鈕，並維持class "three-btns" -->

<div class="float-btn three-btns">
    <a
        href="https://etrade.franklin.com.tw/ec/login"
        class="float-btn-item"
        title="立即申購"
        target="_blank"
        >立即申購</a
    >
    <!-- 第二顆按鈕 start -->
    <a
        href="https://etrade.franklin.com.tw/openAccount/"
        class="float-btn-item"
        title="預約開戶"
        target="_blank"
        >預約開戶</a
    >
    <!-- 第二顆按鈕 end -->
    <!-- 第三顆按鈕 start -->
    <a
        href="https://etrade.franklin.com.tw/ec/login"
        class="float-btn-item"
        title="立即下單"
        target="_blank"
        >立即下單</a
    >
    <!-- 第三顆按鈕 end -->
</div>
```
