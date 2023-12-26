# 數字跳動效果

## 使用方法

1. 新增對應 script

```html
<script src="https://event.franklin.com.tw/commonResources/js/vueCountTo.min.js"></script>
```

2. 新增對應 body

```html
<count-to only-show-start="count_to" :start-val="1" :end-val="5000" :duration="3000"></count-to>
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

其餘請參考網站[Vue-countTo](https://github.com/PanJiaChen/vue-countTo)

## 備註

可參考[Vue-countTo](https://github.com/PanJiaChen/vue-countTo)，另外改寫添加了 only-show-start，搭配此參數可以出現後才出現效果。
