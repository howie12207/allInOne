import fs from 'fs';
import path from 'path';
import util from 'util';

import {
    fileName,
    title,
    description,
    headerType,
    hasBanner,
    hasGoTopIcon,
    hasAos,
    hasCountTo,
    useCustomScrollBar,
    floatBtnType,
    footerType,
    hasDiscount,
    hasModal,
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
    // 替換banner
    await bannerHandle();
    // 加入footer
    await footerHandle();
    // 替換goTop
    await goTopHandle();
    // 加入floatBtn
    await floatBtnHandle();
    // 替換discount
    await discountHandle();
    // 替換countTo
    await countToHandle();
    // 替換aos
    await aosHandle();
    // 替換scrollBar
    await scrollBarHandle();
    // 加入floatBtn
    await floatBtnHandle();
    // 加入footer
    await footerHandle();
    // 替換modal
    await modalHandle();

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
            const newMainJsData = copyData(htmlFile, '// 新增處data start', '// 新增處data end');
            const newMainJsMethods = copyData(
                htmlFile,
                '// 新增處methods start',
                '// 新增處methods end'
            );
            mainJs = mainJs.replace(/\/\/ header data/g, newMainJsData);
            mainJs = mainJs.replace(/\/\/ header methods/g, newMainJsMethods);
        } else {
            mainJs = mainJs.replace(/\/\/ header data/g, '');
            mainJs = mainJs.replace(/\/\/ header methods/g, '');
        }
    }
    // banner
    async function bannerHandle() {
        if (hasBanner) {
            const htmlFile = await readFileAsync(`components/banner/index.html`, 'utf8');
            const newStyle = copyData(htmlFile, '/* 新增處style start */', '/* 新增處style end */');
            styleScss = styleScss.replace(/\/\/ banner style/g, newStyle);

            const newBody = copyData(
                htmlFile,
                '<!-- 新增處body start -->',
                '<!-- 新增處body end -->'
            );
            indexHtml = indexHtml.replace(/<!-- banner body -->/g, newBody);
        } else {
            styleScss = styleScss.replace(/\/\/ banner style/g, '');
            indexHtml = indexHtml.replace(/<!-- banner body -->/g, '');
        }
    }
    // footer
    async function footerHandle() {
        if (!footerType) return;
        let htmlFile = await readFileAsync(`components/footer/index.html`, 'utf8');

        // 新增style
        const newStyle = copyData(htmlFile, '/* 新增處style start */', '/* 新增處style end */');
        styleScss = `${styleScss}
        ${newStyle}`;

        // 替換body
        const newBody = copyData(htmlFile, '<!-- 新增處body start -->', '<!-- 新增處body end -->');
        indexHtml = indexHtml.replace(/<!-- footer body -->/g, newBody);
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
            const newMainJsData = copyData(htmlFile, '// 新增處data start', '// 新增處data end');
            const newMainJsMounted = copyData(
                htmlFile,
                '// 新增處mounted start',
                '// 新增處mounted end'
            );
            const newMainJsBeforeDestroy = copyData(
                htmlFile,
                '// 新增處beforeDestroy start',
                '// 新增處beforeDestroy end'
            );
            const newMainJsMethods = copyData(
                htmlFile,
                '// 新增處methods start',
                '// 新增處methods end'
            );
            mainJs = mainJs
                .replace(/\/\/ goTop data/g, newMainJsData)
                .replace(/\/\/ goTop mounted/g, newMainJsMounted)
                .replace(/\/\/ goTop beforeDestroy/g, newMainJsBeforeDestroy)
                .replace(/\/\/ goTop methods/g, newMainJsMethods);
        } else {
            styleScss = styleScss.replace(/\/\/ goTop style/g, '');
            indexHtml = indexHtml.replace(/<!-- goTop body -->/g, '');
            mainJs = mainJs
                .replace(/\/\/ goTop data/g, '')
                .replace(/\/\/ goTop mounted/g, '')
                .replace(/\/\/ goTop beforeDestroy/g, '')
                .replace(/\/\/ goTop methods/g, '');
        }
    }
    // floatBtn
    async function floatBtnHandle() {
        if (floatBtnType === '0') {
            indexHtml = indexHtml.replace(/<!-- floatBtn body -->/g, '');
            styleScss = styleScss.replace(/\/\/ floatBtn style/g, '');
            return;
        }

        let htmlFile = await readFileAsync(`components/floatBtn/index.html`, 'utf8');
        // 新增style
        const newStyle = copyData(htmlFile, '/* 新增處style start */', '/* 新增處style end */');
        styleScss = styleScss.replace(/\/\/ floatBtn style/g, newStyle);

        let newBody = copyData(htmlFile, '<!-- 新增處body start -->', '<!-- 新增處body end -->');

        if (floatBtnType === '1') {
            const waitDelete = copyData(
                newBody,
                '<!-- 第二顆按鈕 start -->',
                '<!-- 第三顆按鈕 end -->'
            );
            newBody = newBody
                .replace(waitDelete, '')
                .replace(/ three-btns/g, '')
                .replace(/<!-- 第二顆按鈕 start -->/g, '')
                .replace(/<!-- 第三顆按鈕 end -->/g, '');
        } else if (floatBtnType === '2') {
            const waitDelete = copyData(
                newBody,
                '<!-- 第二顆按鈕 end -->',
                '<!-- 第三顆按鈕 end -->'
            );
            newBody = newBody
                .replace(waitDelete, '')
                .replace(/ three-btns/g, ' two-btns')
                .replace(/<!-- 第二顆按鈕 end -->/g, '')
                .replace(/<!-- 第三顆按鈕 end -->/g, '');
        } else {
            newBody = newBody
                .replace(/<!-- 第二顆按鈕 start -->/g, '')
                .replace(/<!-- 第二顆按鈕 end -->/g, '')
                .replace(/<!-- 第三顆按鈕 start -->/g, '')
                .replace(/<!-- 第三顆按鈕 end -->/g, '');
        }
        indexHtml = indexHtml.replace(/<!-- floatBtn body -->/g, newBody);
    }
    // discount
    async function discountHandle() {
        if (hasDiscount) {
            const htmlFile = await readFileAsync(`components/discount/index.html`, 'utf8');
            // 替換discount script
            const newScript = copyData(
                htmlFile,
                '<!-- 新增處script start -->',
                '<!-- 新增處script end -->'
            );
            // 替換discount body
            const newBody = copyData(
                htmlFile,
                '<!-- 新增處body start -->',
                '<!-- 新增處body end -->'
            );
            indexHtml = indexHtml
                .replace(/<!-- discount script -->/g, newScript)
                .replace(/<!-- discount body -->/g, newBody);
            // 替換discount style
            const newStyle = copyData(htmlFile, '/* 新增處style start */', '/* 新增處style end */');
            styleScss = styleScss.replace(/\/\/ discount style/g, newStyle);
            // 替換mainjs
            const newComponents = copyData(
                htmlFile,
                '// 新增處components start',
                '// 新增處components end'
            );
            mainJs = mainJs.replace(/\/\/ discount components/g, newComponents);
        } else {
            indexHtml = indexHtml
                .replace(/<!-- discount script -->/g, '')
                .replace(/<!-- discount body -->/g, '');
            styleScss = styleScss.replace(/\/\/ discount style/g, '');
            mainJs = mainJs.replace(/\/\/ discount components/g, '');
        }
    }
    // countTo
    async function countToHandle() {
        if (hasCountTo) {
            const htmlFile = await readFileAsync(`components/countTo/index.html`, 'utf8');
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
    // modal
    async function modalHandle() {
        if (hasModal) {
            const htmlFile = await readFileAsync('components/modal/index.html', 'utf8');
            const newStyle = copyData(htmlFile, '/* 新增處style start */', '/* 新增處style end */');
            styleScss = styleScss.replace(/\/\/ modal style/g, newStyle);

            const newBody = copyData(
                htmlFile,
                '<!-- 新增處body start -->',
                '<!-- 新增處body end -->'
            );
            indexHtml = indexHtml.replace(/<!-- modal body -->/g, newBody);

            const newVueComponents = copyData(
                htmlFile,
                '// 新增處vueComponent start',
                '// 新增處vueComponent end'
            );
            const newMethods = copyData(htmlFile, '// 新增處methods start', '// 新增處methods end');
            mainJs = mainJs
                .replace('// modal vueComponent', newVueComponents)
                .replace('// modal methods', newMethods);
        } else {
            styleScss = styleScss.replace(/\/\/ modal style/g, '');
            indexHtml = indexHtml.replace(/<!-- modal body -->/g, '');
            mainJs = mainJs.replace('// modal vueComponent', '').replace(/\/\/ modal methods/g, '');
        }
    }
};
run();

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
