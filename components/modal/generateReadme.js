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
    const methods = copyData(htmlFile, '// 新增處methods start', '// 新增處methods end');

    const content = `# 彈窗

## 使用方法

1. 新增對應 css style
\`\`\`css
${style}
\`\`\`

2. 新增對應 body
\`\`\`html
${body}
\`\`\`

3. 新增對應 Vue component

\`\`\`js
${vueComponent}
\`\`\`

4. 新增對應 methods

\`\`\`js
${methods}
\`\`\`

## 參數、事件介紹

| 參數、事件名稱 | 描述 | Default | 備註 |
| --- | --- | --- | --- |
| ref | 參考值 | 必填 | 唯一值，不可與其他 ref 值重複 |
| switchModal | 彈窗開關 | 此為事件 | 控制彈窗打開、關閉 <br/> switchModal('xxx') xxx 為指定的 ref |
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
