// 根據https://event.franklin.com.tw/commonResources/js/appUse/click.js 做移除jquery
document.addEventListener('DOMContentLoaded', function () {
    let regxList = [
        {
            regx: '^https://www.franklin.com.tw/Mobile/Fund/FundInfo\\?idNo=([\\da-zA-Z]*)&token=([\\da-zA-Z]*)&fundGuid=(\\d{4})&?(_ga=[\\d.-])?',
            path: function (arguments) {
                let fundId = arguments[3];
                return 'twsice://fundDetail?' + fundId;
            },
        },
        {
            regx: '^https://www.franklin.com.tw/ContactUs/Index/DivLeaveMessage\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://onlineService';
            },
        },
        {
            regx: '^https://www.franklin.com.tw/Fund/BasicInformation/(\\d{4})\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                let fundId = arguments[1];
                return 'twsice://fundDetail?' + fundId;
            },
        },
        {
            regx: '^https://www.franklin.com.tw/ReservationAccount/ECFAQ/DivPoint\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return '';
            },
        },
        {
            regx: '^https://www.franklin.com.tw/AI_robo/kyc\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://robo?';
            },
        },
        {
            regx: '^https://www.franklin.com.tw/Member/Index\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://memberCenter';
            },
        },
        {
            regx: '^https://www.franklin.com.tw/ReservationAccount/ECFAQ\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return '';
            },
        },
        {
            regx: '^https://www.franklin.com.tw/AI_robo/\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://robo?';
            },
        },
        {
            regx: '^https://www.franklin.com.tw/Privacy\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'defaultUrl';
            },
        },
        // {
        //     regx: '^https://www.franklin.com.tw\\??&?(_ga=[\\d.-])?',
        //     path: function (arguments) {
        //         return '';
        //     }
        // },
        {
            regx: '^http://www.fundclear.com.tw\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return '';
            },
        },
        {
            regx: createRegExp(
                '^https://etrade.franklin.com.tw/Home/Login\\?ReturnUrl=/Trade/LumpSum/ShowForm/(\\d{4})&?(_ga=[\\d.-])?'
            ),
            path: function (arguments) {
                let fundId = arguments[1];
                return 'twsice://fundDetail?' + fundId;
            },
        },
        {
            regx: '^https://etrade.franklin.com.tw/Open/NewMember\\?so=Online&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://login?';
            },
        },
        {
            regx: '^https://etrade.franklin.com.tw/Home/Login\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://fundList?';
            },
        },
        {
            regx: '^https://etrade.franklin.com.tw/Open/Entrance\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://login?';
            },
        },
        {
            regx: '^https://etrade.franklin.com.tw/OpenAccount\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://login?';
            },
        },
        {
            regx: '^https://etrade.franklin.com.tw/Open/NewMember\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://login?';
            },
        },
        {
            regx: '^https://etrade.franklin.com.tw/Open/OpenOnlineAuthenticated\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://login?';
            },
        },
        {
            regx: '^https://etrade.franklin.com.tw/Trade/LumpSum\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://fundList?';
            },
        },
        {
            regx: '^http://line.naver.jp/ti/p/@franklin\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://lineHome';
            },
        },
        {
            regx: '^https://www.youtube.com/user/franklin0800885888\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://youtubeHome';
            },
        },
        {
            regx: '^https://www.facebook.com/franklin.taiwan/\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://facebookHome';
            },
        },
        {
            regx: '^https://m.me/franklin.taiwan/\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return 'twsice://onlineService';
            },
        },
        {
            regx: '^market.html\\??&?(_ga=[\\d.-])?',
            path: function (arguments) {
                return '';
            },
        },
    ];
    function createRegExp(str, a) {
        return new RegExp(str);
    }
    function getHref(href) {
        for (let i = 0; i < regxList.length; i += 1) {
            const { regx, path } = regxList[i];
            const arguments = href.match(regx);
            if (arguments) {
                if (arguments.length > 1) {
                    return path(arguments);
                }
                return path;
            }
        }
        return href;
    }
    function openUrl(link) {
        const { openLog } = window.appInfo || {};
        if (openLog) {
            console.log(link);
            return false;
        } else {
            window.location.href = link;
        }
    }
    document.body.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            const { isApp, openLog } = window.appInfo || {};
            if (isApp) {
                const dom = $(e.currentTarget);
                const href = dom.attr('href');
                const applink = dom.attr('applink');
                if (href.indexOf('https://') !== -1) {
                    const url = unescape(href);
                    const link = getHref(url);
                    if (link !== url) {
                        dom.attr('href', 'javascript: void(0)');
                        dom.attr('applink', href);
                    }
                    if (link === 'defaultUrl') {
                        console.log(1);
                        return openUrl(url);
                    }
                    console.log(2);

                    return openUrl(link);
                } else if (href === 'javascript: void(0)' && applink) {
                    const url = unescape(applink);
                    const link = getHref(url);
                    if (link === 'defaultUrl') {
                        console.log(3);

                        return openUrl(url);
                    }
                    console.log(4);

                    return openUrl(link);
                }
            }
        }
    });
});
