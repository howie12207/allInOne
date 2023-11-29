import fs from 'fs';
import path from 'path';
import util from 'util';

import {
    fileName,
    title,
    description,
    headerType,
    hasGoTopIcon,
    hasAos,
    hasCountTo,
    useCustomScrollBar,
} from './setting.js';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const copyFileAsync = util.promisify(fs.copyFile);

const run = async () => {
    if (fileName.trim() === '') return console.error('請填專案名稱');
    if (title === '') return console.error('請填標題');
    if (description === '') return console.error('請填描述');
    const nameLimit = ['components', 'css', 'js', 'sample'];
    if (nameLimit.includes(fileName.toLowerCase().trim())) return console.log('請更改專案名稱');

    clean(fileName);

    let indexHtml = await readFileAsync('sample/index.html', 'utf8');
    let styleScss = await readFileAsync('sample/css/style.scss', 'utf8');
    let mainJs = await readFileAsync('sample/js/main.js', 'utf8');

    if (!fs.existsSync(fileName)) fs.mkdirSync(fileName);
    if (!fs.existsSync(`${fileName}/css`)) fs.mkdirSync(`${fileName}/css`);
    if (!fs.existsSync(`${fileName}/js`)) fs.mkdirSync(`${fileName}/js`);

    await copyFileAsync('sample/css/normalize.css', `${fileName}/css/normalize.css`);

    // 替換title,description
    indexHtml = indexHtml.replace(/TODO標題/g, title).replace(/TODO描述/g, description);

    // 替換header
    await headerHandle();
    // 替換goTop
    await goTopHandle();
    // 替換aos
    await aosHandle();
    // 替換countTo
    await countToHandle();
    // 替換scrollBar
    await scrollBarHandle();

    await writeFileAsync(`./${fileName}/index.html`, indexHtml, 'utf8');
    await writeFileAsync(`./${fileName}/css/style.scss`, styleScss, 'utf8');
    await writeFileAsync(`./${fileName}/css/style.css`, styleScss, 'utf8');
    await writeFileAsync(`./${fileName}/js/main.js`, mainJs, 'utf8');

    // header
    async function headerHandle() {
        let htmlFile = await readFileAsync(`components/header/index${headerType}.html`, 'utf8');
        // 替換style
        const newStyle = copyData(htmlFile, '/* 新增處style start */', '/* 新增處style end */');
        styleScss = styleScss.replace(/\/\/ header style/g, newStyle);

        // 替換body
        const newBody = copyData(htmlFile, '<!-- 新增處body start -->', '<!-- 新增處body end -->');
        indexHtml = indexHtml.replace(/<!-- header body -->/g, newBody);

        // 替換main.js
        if (headerType === 2) {
            const mainJsFile = await readFileAsync(`components/header/main.js`, 'utf8');
            const newMainJsData = copyData(
                mainJsFile,
                '// 新增處js data start',
                '// 新增處js data end'
            );
            const newMainJsMethods = copyData(
                mainJsFile,
                '// 新增處js methods start',
                '// 新增處js methods end'
            );
            mainJs = mainJs.replace(/\/\/ header data/g, newMainJsData);
            mainJs = mainJs.replace(/\/\/ header methods/g, newMainJsMethods);
        } else {
            mainJs = mainJs.replace(/\/\/ header data/g, '');
            mainJs = mainJs.replace(/\/\/ header methods/g, '');
        }
    }
    // goTop
    async function goTopHandle() {
        if (hasGoTopIcon) {
            const htmlFile = await readFileAsync(`components/goTop/index.html`, 'utf8');
            // 替換goTop style
            const newStyle = copyData(htmlFile, '/* 新增處style start */', '/* 新增處style end */');
            styleScss = styleScss.replace(/\/\/ goTop style/g, newStyle);
            // 替換goTop body
            const newBody = copyData(
                htmlFile,
                '<!-- 新增處body start -->',
                '<!-- 新增處body end -->'
            );
            indexHtml = indexHtml.replace(/<!-- goTop body -->/g, newBody);
            // 替換goTop main.js
            const mainJsFile = await readFileAsync(`components/goTop/main.js`, 'utf8');
            const newMainJsData = copyData(
                mainJsFile,
                '// 新增處js data start',
                '// 新增處js data end'
            );
            const newMainJsMounted = copyData(
                mainJsFile,
                '// 新增處js mounted start',
                '// 新增處js mounted end'
            );
            const newMainJsBeforeDestroy = copyData(
                mainJsFile,
                '// 新增處js beforeDestroy start',
                '// 新增處js beforeDestroy end'
            );
            const newMainJsMethods = copyData(
                mainJsFile,
                '// 新增處js methods start',
                '// 新增處js methods end'
            );
            mainJs = mainJs
                .replace(/\/\/ goTop data/g, newMainJsData)
                .replace(/\/\/ goTop mounted/g, newMainJsMounted)
                .replace(/\/\/ goTop beforeDestroy/g, newMainJsBeforeDestroy)
                .replace(/\/\/ goTop methods/g, newMainJsMethods);
        } else {
            styleScss = styleScss.replace(/\/\/ goTop style/g, '');
            indexHtml = styleScss.replace(/<!-- goTop body -->/g, '');
            mainJs = mainJs
                .replace(/\/\/ goTop data/g, '')
                .replace(/\/\/ goTop mounted/g, '')
                .replace(/\/\/ goTop beforeDestroy/g, '')
                .replace(/\/\/ goTop methods/g, '');
        }
    }
    // aos
    async function aosHandle() {
        if (hasAos) {
            const htmlFile = await readFileAsync(`js/aos/index.html`, 'utf8');
            // 替換aos link
            const newLink = copyData(
                htmlFile,
                '<!-- 新增處link start -->',
                '<!-- 新增處link end -->'
            );
            // 替換aos script
            const newScript = copyData(
                htmlFile,
                '<!-- 新增處script start -->',
                '<!-- 新增處script end -->'
            );
            indexHtml = indexHtml
                .replace(/<!-- aos link -->/g, newLink)
                .replace(/<!-- aos script -->/g, newScript);
        } else {
            indexHtml = indexHtml
                .replace(/<!-- aos link -->/g, '')
                .replace(/<!-- aos script -->/g, '');
        }
    }
    // countTo
    async function countToHandle() {
        if (hasCountTo) {
            const htmlFile = await readFileAsync(`js/countTo/index.html`, 'utf8');
            // 替換countTo script
            const newScript = copyData(
                htmlFile,
                '<!-- 新增處script start -->',
                '<!-- 新增處script end -->'
            );
            // 替換countTo body
            const newBody = copyData(
                htmlFile,
                '<!-- 新增處body start -->',
                '<!-- 新增處body end -->'
            );
            indexHtml = indexHtml
                .replace(/<!-- countTo script -->/g, newScript)
                .replace(/<!-- countTo body -->/g, newBody);
        } else {
            indexHtml = indexHtml
                .replace(/<!-- countTo script -->/g, '')
                .replace(/<!-- countTo body -->/g, '');
        }
    }
    // scrollBar
    async function scrollBarHandle() {
        if (useCustomScrollBar) {
            const commonStyle = await readFileAsync('css/common.css', 'utf8');
            const newStyle = copyData(commonStyle, '/* scrollBar start */', '/* scrollBar end */');
            styleScss = styleScss.replace(/\/\/ scrollBar style/g, newStyle);
        } else {
            styleScss = styleScss.replace(/\/\/ scrollBar style/g, '');
        }
    }
};
run();

function copyData(data, start, end) {
    data = data.replace(start, '<copyDataStart>').replace(end, '<copyDataEnd>');

    const pattern = new RegExp(`<copyDataStart>(.*?)<copyDataEnd>`, 's');
    const match = data.match(pattern);

    return match[1].trim();
}

function clean(url) {
    if (fs.existsSync(url)) {
        const files = fs.readdirSync(url);
        files.forEach(function (file) {
            var curPath = path.join(url, file);

            if (fs.statSync(curPath).isDirectory()) {
                clean(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });

        fs.rmdirSync(url);
    }
}
