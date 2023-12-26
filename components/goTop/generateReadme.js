import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const generateReadme = async () => {
    const htmlFile = await readFileAsync(`./index.html`, 'utf8');
    const style = copyData(htmlFile, '/* 新增處style start */', '/* 新增處style end */');
    const body = copyData(htmlFile, '<!-- 新增處body start -->', '<!-- 新增處body end -->');
    const data = copyData(htmlFile, '// 新增處data start', '// 新增處data end');
    const mounted = copyData(htmlFile, '// 新增處mounted start', '// 新增處mounted end');
    const beforeDestroy = copyData(
        htmlFile,
        '// 新增處beforeDestroy start',
        '// 新增處beforeDestroy end'
    );
    const methods = copyData(htmlFile, '// 新增處methods start', '// 新增處methods end');

    const content = `# Go top btn

## 使用方法

1. 新增對應 css style
\`\`\`css
${style}
\`\`\`

2. 新增對應 body
\`\`\`html
${body}
\`\`\`

3. 新增對應 data
\`\`\`js
${data}
\`\`\`

4. 新增對應 mounted
\`\`\`js
${mounted}
\`\`\`

5. 新增對應 beforeDestroy
\`\`\`js
${beforeDestroy}
\`\`\`

6. 新增對應 methods
\`\`\`js
${methods}
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
