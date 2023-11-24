# AOS 效果

## 使用方法

1. 在 head 標籤中放入 aos css

```html
<head>
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
</head>
```

2. 在 body 標籤底下放入 aos js

```html
<body>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>
</body>
```

3. 在需求效果元素加入 data-aos

```html
<div data-aos="fade-up">test</div>
```

## 備註

可參考[AOS - Animate On Scroll Library](https://github.com/michalsnik/aos)
