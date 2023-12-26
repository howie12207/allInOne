# 一般 Table

## 使用方法

1. 新增對應 css style

```css
.base-table-wrapper {
    overflow-x: auto;
}
.base-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
}
.base-table thead tr {
    background-color: #005598;
}
.base-table tbody tr:nth-child(odd) {
    background-color: #fff;
}
.base-table tbody tr:nth-child(even) {
    background-color: #f2f2f2;
}
.base-table th,
.base-table td {
    font-size: 18px;
    padding: 16px 8px;
    text-align: center;
    border: 1px solid gray;
    color: #353535;
}
.base-table th {
    color: #fff;
    font-weight: 700;
}
```

2. 新增對應 body

```html
<base-table :table-data="tableData"></base-table>
```

3. 新增對應 vueComponent

```js
Vue.component('baseTable', {
    props: {
        tableData: {
            type: Object,
            default: () => ({}),
        },
    },
    template: `
                    <div class="base-table-wrapper">
                        <table class="base-table">
                            <thead>
                                <tr>
                                    <th v-for="(tTitle, index) of tableData.thead" :key="index">
                                        {{ tTitle }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(list, listIndex) of tableData.data" :key="listIndex">
                                    <td v-for="(content, contentIndex) of list" :key="contentIndex">
                                        {{ content }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `,
});
```

4. 新增對應 data

```js
tableData: {
                            thead: ['期間/成果', '一年', '二年', '三年', '五年', '十年'],
                            data: [
                                [
                                    '投資價值',
                                    '73,427',
                                    '137,651',
                                    '199,339',
                                    '389,783',
                                    '1,240,100',
                                ],
                                ['投資成本', '60,000', '120,000', '180,000', '300,000', '600,000'],
                                ['報酬率', '22.38%', '14.71%', '10.74%', '29.93%', '106.68%'],
                            ],
                        },
```

## 備註

若有多個表格則在 data 多新增 tableData2,tableData3...等，其對應 body 的值也需對應調整
