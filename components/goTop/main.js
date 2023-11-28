var content = new Vue({
    el: '#content',
    data() {
        return {
            // 新增處js data start
            showGoTop: false,
            // 新增處js data end
        };
    },
    mounted() {
        // 新增處js mounted start
        window.addEventListener('scroll', this.throttle(this.handleScroll));
        // 新增處js mounted end
    },
    beforeDestroy() {
        // 新增處js beforeDestroy start
        window.removeEventListener('scroll', this.throttle(this.handleScroll));
        // 新增處js beforeDestroy end
    },
    methods: {
        // 新增處js methods start
        throttle(fn, delay = 300) {
            let timeId = null;
            let previousTime = 0;

            return () => {
                const nowTime = Date.now();
                const remain = delay - (nowTime - previousTime);

                if (remain <= 0 || remain > delay) {
                    if (timeId) timeId = null;

                    previousTime = nowTime;
                    fn();
                } else if (!timeId) {
                    timeId = setTimeout(() => {
                        previousTime = Date.now();
                        timeId = null;
                        fn();
                    }, remain);
                }
            };
        },
        handleScroll() {
            const showY = 160;
            const nowScrollY = window.scrollY;
            if (nowScrollY > showY && !this.showGoTop) this.showGoTop = true;
            else if (nowScrollY < showY && this.showGoTop) this.showGoTop = false;
        },
        // 新增處js methods end
    },
});
