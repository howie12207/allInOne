# 彈窗

## 使用方法

1. 新增對應 css style

```css
.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0 0 0 / 40%);
    box-sizing: border-box;
}
.modal-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    overscroll-behavior-y: contain;
}
.close-modal-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    color: #005598;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: 0.3s;
}
.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}
```

2. 新增對應 body

```html
<button @click="switchModal('modal-1')">開啟彈窗(此按鈕為測試使用，用不到可刪除)</button>
<modal ref="modal-1">彈窗內容<button @click="switchModal('modal-1')">關閉</button></modal>
```

3. 新增對應 Vue component

```js
Vue.component('modal', {
    props: {
        closeOut: {
            type: Boolean,
            default: false,
        },
        closeBtn: {
            type: Boolean,
            default: true,
        },
    },
    template: `
                    <transition name="modal-fade">
                        <div v-if="showModal" class="modal" @click="closeHandle()">
                            <div class="modal-wrapper" @click.stop>
                                <i
                                    v-if="closeBtn"
                                    class="fa fa-times close-modal-btn"
                                    aria-hidden="true"
                                    @click="closeModal()"
                                ></i>
                                <slot></slot>
                            </div>
                        </div>
                    </transition>
                `,
    data() {
        return {
            showModal: false,
        };
    },
    methods: {
        closeHandle() {
            if (this.closeOut) this.closeModal();
        },
        closeModal() {
            this.showModal = false;
        },
    },
});
```

4. 新增對應 methods

```js
switchModal(target) {
                        this.$refs[target].showModal = !this.$refs[target].showModal;
                    },
```

## 參數、事件介紹

| 參數、事件名稱 | 描述 | Default | 備註 |
| --- | --- | --- | --- |
| ref | 參考值 | 必填 | 唯一值，不可與其他 ref 值重複 |
| switchModal | 彈窗開關 | 此為事件 | 控制彈窗打開、關閉 <br/> switchModal('xxx') xxx 為指定的 ref |
