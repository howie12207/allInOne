import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const generateReadme = async () => {
    const htmlFile1 = await readFileAsync(`./index1.html`, 'utf8');
    const style1 = copyData(htmlFile1, '/* 新增處style start */', '/* 新增處style end */');
    const body1 = copyData(htmlFile1, '<!-- 新增處body start -->', '<!-- 新增處body end -->');

    const htmlFile2 = await readFileAsync(`./index2.html`, 'utf8');
    const style2 = copyData(htmlFile2, '/* 新增處style start */', '/* 新增處style end */');
    const body2 = copyData(htmlFile2, '<!-- 新增處body start -->', '<!-- 新增處body end -->');
    const data2 = copyData(htmlFile2, '// 新增處data start', '// 新增處data end');
    const methods2 = copyData(htmlFile2, '// 新增處methods start', '// 新增處methods end');

    const content = `# header

## 使用方法

### 一般Header

1. 新增對應 css style
\`\`\`css
${style1}
\`\`\`

2. 新增對應 body
\`\`\`html
${body1}
\`\`\`

### header帶menu

1. 新增對應 css style
\`\`\`css
${style2}
\`\`\`

2. 新增對應 body
\`\`\`html
${body2}
\`\`\`

3. 新增對應 data
\`\`\`js
${data2}
\`\`\`

4. 新增對應 methods
\`\`\`js
${methods2}
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
