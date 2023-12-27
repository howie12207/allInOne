import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const generateReadme = async () => {
    const htmlFile1 = await readFileAsync(`./index1.html`, 'utf8');
    const htmlFile2 = await readFileAsync(`./index2.html`, 'utf8');
    const style1 = copyData(htmlFile1, '/* 新增處style start */', '/* 新增處style end */');
    const body1 = copyData(htmlFile1, '<!-- 新增處body start -->', '<!-- 新增處body end -->');
    const style2 = copyData(htmlFile2, '/* 新增處style start */', '/* 新增處style end */');
    const body2 = copyData(htmlFile2, '<!-- 新增處body start -->', '<!-- 新增處body end -->');

    const content1 = `# footer

## 使用方法

1. 新增對應 css style
\`\`\`css
${style1}
\`\`\`

2. 新增對應 body
\`\`\`html
${body1}
\`\`\`
`;

    const content2 = `# footer2

## 使用方法

1. 新增對應 css style
\`\`\`css
${style2}
\`\`\`

2. 新增對應 body
\`\`\`html
${body2}
\`\`\`
`;

    await writeFileAsync(`./readme.md`, content1, 'utf8');
    await writeFileAsync(`./readme2.md`, content2, 'utf8');
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
