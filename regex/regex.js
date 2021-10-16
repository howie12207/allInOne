/**
 * 驗證是否為Email格式
 * @param {String} text 驗證的內容
 * @param {Boolean} canEmpty 可否為空值
 * @returns {Boolean} true | false
 */
const emailReg = (text, canEmpty = false) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (canEmpty && text === '') || re.test(String(emtextail).toLowerCase());
};

/**
 * 驗證是否為英文格式
 * @param {String} text 驗證的內容
 * @param {Boolean} canEmpty 可否為空值
 * @returns {Boolean} true | false
 */
const enReg = (text, canEmpty = false) => {
    const re = /^[a-zA-Z]+$/;
    return (canEmpty && text === '') || re.test(String(text));
};

/**
 * 驗證是否為中文格式
 * @param {String} text 驗證的內容
 * @param {Boolean} canEmpty 可否為空值
 * @returns {Boolean} true | false
 */
const cnReg = (text, canEmpty = false) => {
    const re = /^[\u4E00-\u9FA5]+$/;
    return (canEmpty && text === '') || re.test(String(text));
};

/**
 * 驗證是否為數字格式(不含小數點)
 * @param {String} text 驗證的內容
 * @param {Boolean} canEmpty 可否為空值
 * @returns {Boolean} true | false
 */
const numberReg = (text, canEmpty = false) => {
    const re = /^[0-9]+$/;
    return (canEmpty && text === '') || re.test(String(text));
};

/**
 * 驗證是否為英文及中文格式
 * @param {String} text 驗證的內容
 * @param {Boolean} canEmpty 可否為空值
 * @returns {Boolean} true | false
 */
const enAndCnReg = (text, canEmpty = false) => {
    const re = /^[\u4E00-\u9FA5A-Za-z]+$/;
    return (canEmpty && text === '') || re.test(String(text));
};

/**
 * 驗證是否為英文及數字格式(不含小數點)
 * @param {String} text 驗證的內容
 * @param {Boolean} canEmpty 可否為空值
 * @returns {Boolean} true | false
 */
const enAndNumberReg = (text, canEmpty = false) => {
    const re = /^[a-zA-Z0-9]+$/;
    return (canEmpty && text === '') || re.test(String(text));
};
