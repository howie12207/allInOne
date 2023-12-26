import fs from 'fs';
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const generateReadme = async () => {
    const htmlFile = await readFileAsync(`./index.html`, 'utf8');
    const style = copyData(htmlFile, '/* 新增處style start */', '/* 新增處style end */');
    const body = copyData(htmlFile, '<!-- 新增處body start -->', '<!-- 新增處body end -->');
    const mounted = copyData(htmlFile, '// 新增處mounted start', '// 新增處mounted end');
    const data = copyData(htmlFile, '// 新增處data start', '// 新增處data end');
    const methods = copyData(htmlFile, '// 新增處methods start', '// 新增處methods end');

    const content = `# 影音專區

## 使用方法

1. 此組件會使用到modal，若原專案未使用modal，請一併參考modal文件使用方法先操作，再進行下一步

2. 新增對應 css style
\`\`\`css
${style}
\`\`\`

3. 新增對應 body
\`\`\`html
${body}
\`\`\`

4. 新增對應 mounted
\`\`\`js
${mounted}
\`\`\`

5. 新增對應 data
\`\`\`js
${data}
\`\`\`

6. 新增對應 methods
\`\`\`js
${methods}
\`\`\`

7. 新增 video.json 檔
\`\`\`json
[
    {
        "title": "【經理人一番Talk】平衡策略如何掌握投資機會？",
        "youtube": "https://www.youtube.com/embed/O9slcXa6qE8",
        "date": "2023/10/20",
        "img": "https://fakeimg.pl/240x136/"
    },
    {
        "title": "【市場趨勢專家觀點】平衡策略如何掌握投資機會？",
        "youtube": "https://www.youtube.com/embed/7hXu_dMGeXk",
        "date": "2023/09/21",
        "img": "https://fakeimg.pl/240x136/"
    }
]
\`\`\`

## 備註

需搭配 modal
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
