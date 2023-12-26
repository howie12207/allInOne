import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const generateReadme = async () => {
    const htmlFile = await readFileAsync(`./index.html`, 'utf8');

    const script = copyData(htmlFile, '<!-- 新增處script start -->', '<!-- 新增處script end -->');
    const body = copyData(htmlFile, '<!-- 新增處body start -->', '<!-- 新增處body end -->');

    const content = `# 滾動效果

## 使用方法

1. 新增對應 script
\`\`\`html
${script}
\`\`\`

2. 針對需要有效果的元件加入@click $scrollTo
\`\`\`html
${body}
\`\`\`

## 參數介紹

| 參數名稱 | 描述         | Default | 備註                                          |
| -------- | ------------ | ------- | --------------------------------------------- |
| target   | 滾動至目標   | 必填    | 可為 class (.XXX) 或 id (#XXX) 或 元素 (body) |
| behavior | 滾動行為     | smooth  | 可為 smooth, instant, auto                    |
| block    | 垂直對齊     | start   | 可為 start, center, end, nearest              |
| inline   | 水平對齊     | nearest | 可為 start, center, end, nearest              |
| delay    | 是否延遲滾動 | false   | 可為 true, false                              |

## 備註

**@click 需搭配 Vue**

可參考[MDN - Element.scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView#inline)
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
