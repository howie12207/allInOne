# 影音專區

## 使用方法

1. 新增對應 css style，若原專案無使用 modal，則也需新增 modal css

2. 新增對應 body

3. 新增對應 mounted

```js
this.getVideoList();
```

4. 新增對應 data

```js
videoList: [],
tempVideo: '',
```

5. 新增對應 methods

```js
async getVideoList() {
    const req = await fetch('./video.json');
    const res = await req.json();
    this.videoList = res;
},
openVideoModal(target) {
    this.tempVideo = target;
    this.switchModal('videoModal');
},
```

6. 新增 video.json 檔

```json
[
    {
        "title": "【經理人一番Talk】平衡策略如何掌握投資機會？",
        "youtube": "https://www.youtube.com/embed/O9slcXa6qE8",
        "date": "2023/10/20",
        "img": "https://fakeimg.pl/240x136/"
    },
    {
        "title": "【市場趨勢專家觀點】平衡策略如何掌握投資機會？",
        "youtube": "https://www.youtube.com/embed/7hXu_dMGeXk",
        "date": "2023/09/21",
        "img": "https://fakeimg.pl/240x136/"
    },
    ...
]
```

7. 若原無使用 modal 需 新增對應 modal css、vue components、

```css
.modal {
    xxx
}
```

```js
// 新增對應 vue components
Vue.components('modal', ...);
```

```js
// 新增對應 methods
switchModal(target) {
    this.$refs[target].showModal = !this.$refs[target].showModal;
},
```

## 備註

需搭配 modal
