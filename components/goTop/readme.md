# Go top btn

## 使用方法

1. 新增對應 css style

2. 新增對應 body

```html
<transition name="go-top">
    <div v-if="showGoTop" class="go-top-icon" @click="$scrollTo({ target: 'body' })">
        <i class="fas fa-caret-up go-top-caret-icon"></i>
        <span class="go-top-text">Top</span>
    </div>
</transition>
```

3. 新增對應 data

```js
showGoTop: false,
```

4. 新增對應 mounted

```js
window.addEventListener('scroll', this.throttle(this.handleScroll));
```

5. 新增對應 beforeDestroy

```js
window.removeEventListener('scroll', this.throttle(this.handleScroll));
```

6. 新增對應 methods

```js
throttle(fn, delay = 300) {
    let timeId = null;
    let previousTime = 0;

    return () => {
        const nowTime = Date.now();
        const remain = delay - (nowTime - previousTime);

        if (remain <= 0 || remain > delay) {
            if (timeId) timeId = null;

            previousTime = nowTime;
            fn();
        } else if (!timeId) {
            timeId = setTimeout(() => {
                previousTime = Date.now();
                timeId = null;
                fn();
            }, remain);
        }
    };
},
handleScroll() {
    const showY = 160;
    const nowScrollY = window.scrollY;
    if (nowScrollY > showY && !this.showGoTop) this.showGoTop = true;
    else if (nowScrollY < showY && this.showGoTop) this.showGoTop = false;
},
```
