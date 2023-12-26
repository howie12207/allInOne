# 影音專區

## 使用方法

1. 此組件會使用到 modal，若原專案未使用 modal，請一併參考 modal 文件使用方法先操作，再進行下一步

2. 新增對應 css style

```css
.video-list-section {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(1, minmax(0, 1fr));
}
.video-list-item {
    cursor: pointer;
}
.video-list-item:hover {
    color: #005598;
}
.video-list-img {
    width: 100%;
    object-fit: cover;
}
.video-list-title {
    line-height: 1.5;
    margin-bottom: 8px;
    transition: color 0.4s;
}
.video-list-date {
    font-size: 14px;
    color: #888;
}
.video-iframe {
    width: 240px;
    height: 180px;
}
@media (min-width: 480px) {
    .video-iframe {
        width: 400px;
        height: 300px;
    }
    .video-list-section {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
@media (min-width: 768px) {
    .video-iframe {
        width: 560px;
        height: 420px;
    }
    .video-list-section {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}
@media (min-width: 1024px) {
    .video-list-section {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}
```

3. 新增對應 body

```html
<div class="video-list-section container">
    <div
        class="video-list-item"
        v-for="(item,index) of videoList"
        :key="index"
        @click="openVideoModal(item.youtube)"
    >
        <img class="video-list-img" :src="item.img" :alt="item.title" />
        <div>
            <div class="video-list-title">{{ item.title }}</div>
            <div class="video-list-date">{{ item.date }}</div>
        </div>
    </div>
</div>
<modal ref="videoModal">
    <iframe
        class="video-iframe"
        :src="tempVideo"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        frameborder="0"
    >
    </iframe>
</modal>
```

4. 新增對應 mounted

```js
this.getVideoList();
```

5. 新增對應 data

```js
videoList: [],
                        tempVideo: '',
```

6. 新增對應 methods

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

7. 新增 video.json 檔

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
    }
]
```

## 備註

需搭配 modal
