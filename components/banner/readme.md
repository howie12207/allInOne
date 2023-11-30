# 看板

## 使用方法

1. 新增對應 css style

2. 新增對應 body

```html
<!-- 會由上而下判斷 -->
<!-- 以下示例會先判斷是否寬度在767px內(含) -->
<!-- 若是767px內則顯示source圖片 -->
<!-- 若非則顯示img圖片 -->
<!-- alt 屬性記得填寫 -->
<picture>
    <source media="(max-width: 767px)" srcset="https://fakeimg.pl/720x1050/" />
    <img class="banner-img" src="https://fakeimg.pl/1920x770/" alt="" />
</picture>
```
