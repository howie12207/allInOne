# 彈窗

## 使用方法

1. 新增對應 css style

2. 新增對應 body

```html
<!-- modal為彈窗組件 -->
<!-- ref屬性為唯一值，若有多個modal需不同名稱 -->

<!-- Ex1 -->
<modal ref="modal-1">彈窗內容</modal>

<!-- Ex2:點擊外面可直接關閉功能 => 添加 close-out 屬性 -->
<modal ref="modal-1" close-out>彈窗內容</modal>

<!-- Ex3: 關閉右上角X 圖示 -->
<modal ref="modal-1" :close-btn="false">彈窗內容</modal>

<!-- Ex4:可透過switchModal('xxx') 切換彈窗開關 xxx為指定的ref -->
<modal ref="modal-1"
    >彈窗內容
    <button @click="switchModal('modal-1')">關閉</button>
</modal>
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
