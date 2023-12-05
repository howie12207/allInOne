new Vue({
    el: '#swiper-content',
    data() {
        return {
            activeTab: 0,
            isFromMobile: false,
            autoplayInstance: null,
        };
    },
    mounted() {
        this.isFromMobile = window.innerWidth < 768;
        this.$nextTick(() => {
            this.initTabSwiper();
            new Swiper('.main-swiper', {
                perPageView: 1,
                speed: 600,
                autoplay: false,
            });
            this.$refs.mainSwiper.swiper.on('slideChange', this.handleSlideChange);
            this.$refs.mainSwiper.swiper.on('resize', this.handleWidthResize);
            this.initIntersectionObserver();
        });
    },
    methods: {
        initTabSwiper() {
            const paramsByWidth = this.isFromMobile
                ? {
                      slidesPerView: 2,
                      spaceBetween: 20,
                  }
                : {
                      slidesPerView: 4,
                      spaceBetween: 20,
                  };

            new Swiper('.tab-swiper', {
                loop: this.isFromMobile,
                autoplay: false,
                speed: 600,
                slideToClickedSlide: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                ...paramsByWidth,
            });
            this.$refs.tabSwiper.swiper.on('slideChange', this.handleTabSlideChange);
        },
        handleTabClick(index) {
            this.activeTab = index;
            this.$refs.mainSwiper.swiper.slideTo(index);
            this.clearAutoplayInstance();
            this.handleAutoplay();
        },
        handleTabSlideChange() {
            this.$nextTick(() => {
                this.activeTab = this.$refs.tabSwiper.swiper.realIndex;
                this.$refs.mainSwiper.swiper.slideTo(this.activeTab);
            });
        },
        handleSlideChange() {
            this.$nextTick(() => {
                this.activeTab = this.$refs.mainSwiper.swiper.realIndex;
            });
        },
        handleWidthResize() {
            const resetTabSwiper = () => {
                this.$refs.tabSwiper.swiper.destroy();
                this.initTabSwiper();
            };
            if (window.innerWidth < 768 && !this.isFromMobile) {
                this.isFromMobile = true;
                resetTabSwiper();
                this.clearAutoplayInstance();
            } else if (window.innerWidth > 767 && this.isFromMobile) {
                this.isFromMobile = false;
                resetTabSwiper();
            }
        },
        handleAutoplay() {
            if (this.isFromMobile) return;
            this.clearAutoplayInstance();
            this.autoplayInstance = setInterval(() => {
                let nextIndex = this.activeTab + 1;
                const totalSlides = this.$refs.tabSwiper.swiper.slides.length;
                if (nextIndex >= totalSlides) {
                    nextIndex = 0;
                }
                this.$refs.tabSwiper.swiper.slideTo(nextIndex);
                this.handleTabClick(nextIndex);
            }, 2500);
        },
        clearAutoplayInstance() {
            if (this.autoplayInstance) {
                clearInterval(this.autoplayInstance);
                this.autoplayInstance = null;
            }
        },
        initIntersectionObserver() {
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.$refs.tabSwiper.swiper.autoplay.start();
                            this.handleAutoplay();
                        }
                    });
                },
                {
                    root: null,
                    threshold: 0.7,
                }
            );
            const swiperEl = document.querySelector('.swiper-with-tab');
            observer.observe(swiperEl);
        },
    },
    beforeDestroy() {
        this.clearAutoplayInstance();
    },
});
