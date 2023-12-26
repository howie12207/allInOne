import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const generateReadme = async () => {
    const htmlFile = await readFileAsync(`./index.html`, 'utf8');
    const script = copyData(htmlFile, '<!-- 新增處script start -->', '<!-- 新增處script end -->');
    const body = copyData(htmlFile, '<!-- 新增處body start -->', '<!-- 新增處body end -->');

    const content = `# 數字跳動效果

## 使用方法

1. 新增對應 script
\`\`\`html
${script}
\`\`\`

2. 新增對應 body
\`\`\`html
${body}
\`\`\`

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
`;

    await writeFileAsync(`./readme.md`, content, 'utf8');
};

generateReadme();

function copyData(data, start, end) {
    try {
        data = data.replace(start, '<copyDataStart>').replace(end, '<copyDataEnd>');

        const pattern = new RegExp(`<copyDataStart>(.*?)<copyDataEnd>`, 's');
        const match = data.match(pattern);

        return match[1].trim();
    } catch (e) {
        console.error(`
        data: ${data}
        start: ${start}
        end: ${end}
        複製資料發生錯誤: ${e}
        `);
    }
}
