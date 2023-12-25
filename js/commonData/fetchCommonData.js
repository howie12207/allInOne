let fetchRetry = 0;

const fetchCommonData = async () => {
    if (fetchRetry > 2) return;

    try {
        const prodList = [
            "etrade.franklin.com.tw",
            "event.franklin.com.tw",
            "www.franklin.com.tw",
        ];
        const isProd = prodList.includes(window.location.host);
        const req = isProd
            ? await fetch("https://event.franklin.com.tw/commonResources/js/commonData.json")
            : await fetch("https://event.franklin.com.tw/commonResources/js/commonData-dev.json");
        const res = await req.json();
        if (res.seasonDate) content.$set(content, "seasonDate", res.seasonDate);
    } catch (_) {
        fetchRetry++;
        fetchCommonData();
    }
};

fetchCommonData();
