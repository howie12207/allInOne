# 數字跳動效果

## 使用方法

1. 在 head 標籤中放入 vue-countTo js

```html
<head>
    <script src="https://event.franklin.com.tw/commonResources/js/vueCountTo.min.js"></script>
</head>
```

2. 建立需求效果元素 <count-to></count-to>

```html
<count-to :start-val="0" :end-val="10000" :duration="3000"></count-to>
```

**若需出現後才開始效果則需添加 "only-show-start" 參數，請給一個唯一的 class 值**

```html
<count-to only-show-start="count_to" :start-val="0" :end-val="10000" :duration="3000"></count-to>
```

## 參數介紹

| 參數名稱        | 描述           | Default | 備註 |
| --------------- | -------------- | ------- | ---- |
| start-val       | 起始數值       | 0       |      |
| end-val         | 最後數值       | 2017    |      |
| duration        | 跳動過渡時間   | 3000    |      |
| autoplay        | 是否自動執行   | true    |      |
| decimals        | 小數點位數     | 0       |      |
| separator       | 千分位切割符號 | ,       |      |
| only-show-start | 是否顯示才執行 | false   |      |

其餘請參考網站

## 備註

可參考[Vue-countTo](https://github.com/PanJiaChen/vue-countTo)，另外改寫添加了 only-show-start，搭配此參數可以出現後才出現效果。
