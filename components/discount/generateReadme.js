import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const generateReadme = async () => {
    const htmlFile = await readFileAsync(`./index.html`, 'utf8');
    const style = copyData(htmlFile, '/* 新增處style start */', '/* 新增處style end */');
    const script = copyData(htmlFile, '<!-- 新增處script start -->', '<!-- 新增處script end -->');
    const body = copyData(htmlFile, '<!-- 新增處body start -->', '<!-- 新增處body end -->');
    const components = copyData(htmlFile, '// 新增處components start', '// 新增處components end');

    const content = `# 優惠組件

## 使用方法

1. 新增對應 css style
\`\`\`css
${style}
\`\`\`

2. 新增對應 script
\`\`\`html
${script}
\`\`\`

3. 新增對應 body
\`\`\`html
${body}
\`\`\`

4. 新增對應 components
\`\`\`js
${components}
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
