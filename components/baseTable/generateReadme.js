import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const generateReadme = async () => {
    const htmlFile = await readFileAsync(`./index.html`, 'utf8');
    const style = copyData(htmlFile, '/* 新增處style start */', '/* 新增處style end */');
    const body = copyData(htmlFile, '<!-- 新增處body start -->', '<!-- 新增處body end -->');
    const vueComponent = copyData(
        htmlFile,
        '// 新增處vueComponent start',
        '// 新增處vueComponent end'
    );
    const data = copyData(htmlFile, '// 新增處data start', '// 新增處data end');

    const content = `# 一般Table

## 使用方法

1. 新增對應 css style
\`\`\`css
${style}
\`\`\`

2. 新增對應 body
\`\`\`html
${body}
\`\`\`

3. 新增對應 vueComponent
\`\`\`js
${vueComponent}
\`\`\`

4. 新增對應 data
\`\`\`js
${data}
\`\`\`

## 備註
若有多個表格則在data多新增tableData2,tableData3...等，其對應body的值也需對應調整
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
