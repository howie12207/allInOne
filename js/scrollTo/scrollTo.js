const ScrollTo = async ({
    target,
    behavior = 'smooth',
    block = 'start',
    inline = 'nearest',
    delay = false,
}) => {
    const scroll = () => {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior, block, inline });
    };

    if (delay)
        await new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 0);
        });
    scroll();
};

window.$scrollTo = ScrollTo;
