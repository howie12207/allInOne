# Go top btn

## 使用方法

1. 新增對應 css style

```css
.go-top-icon {
    position: fixed;
    bottom: 64px;
    right: 16px;
    border-radius: 50%;
    z-index: 1;
    width: 48px;
    height: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    cursor: pointer;
    border: 2px solid #fff;
    box-sizing: border-box;
    transition: opacity 0.4s;
}
.go-top-icon:hover {
    opacity: 0.8;
}
@media (max-width: 767px) {
    .go-top-caret-icon {
        font-size: 24px;
    }
    .go-top-text {
        display: none;
    }
}

.go-top-enter-active,
.go-top-leave-active {
    transition: 0.3s;
}
.go-top-enter,
.go-top-leave-to {
    transform: translateY(120px);
}
```

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
