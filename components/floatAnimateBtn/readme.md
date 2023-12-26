# 懸浮動畫按鈕

## 使用方法

1. 新增對應 css style

```css
.float-animate-btn {
    position: fixed;
    bottom: 72px;
    left: 48px;
    z-index: 9;
    animation: float-animate-btn 0.7s infinite alternate-reverse;
}
.float-animate-btn .float-animate-btn-link {
    text-decoration: none;
    display: inline-block;
}
@keyframes float-animate-btn {
    0% {
        transform: translateY(-16px);
    }
    100% {
        transform: translateY(16px);
    }
}
@media (min-width: 768px) {
    .float-animate-btn {
        top: 50%;
        bottom: initial;
        right: 48px;
        left: initial;
        transform: translateY(-50%);
    }
    @keyframes float-animate-btn {
        0% {
            transform: translateY(calc(-50% - 16px));
        }
        100% {
            transform: translateY(calc(-50% + 16px));
        }
    }
}
```

2. 新增對應 body

```html
<div class="float-animate-btn">
    <a class="float-animate-btn-link" href="https://etrade.franklin.com.tw/ec/login">
        <img src="https://fakeimg.pl/88x88/" alt="立即申購" />
    </a>
</div>
```
