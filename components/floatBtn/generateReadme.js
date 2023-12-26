import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const generateReadme = async () => {
    const htmlFile = await readFileAsync(`./index.html`, 'utf8');
    const style = copyData(htmlFile, '/* 新增處style start */', '/* 新增處style end */');
    const body = copyData(htmlFile, '<!-- 新增處body start -->', '<!-- 新增處body end -->');

    const content = `# 懸浮按鈕組件

## 使用方法

1. 新增對應 css style
\`\`\`css
${style}
\`\`\`

2. 新增對應 body
\`\`\`html
<!-- 根據需求自行刪減第二顆與第三顆按鈕 -->
<!-- 若只需要一顆按鈕，則移除class "three-btns" -->
<!-- 若需要二顆按鈕，則移除class "three-btns"，並新增class "two-btns" -->
<!-- 若需要三顆按鈕，並維持class "three-btns" -->

${body}
\`\`\`
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
