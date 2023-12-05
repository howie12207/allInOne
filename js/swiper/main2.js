new Vue({
    el: '#swiper-content',
    data() {
        return {
            activeTab: 0,
        };
    },
    // watch: {
    //     activeTab(newVal) {
    //         this.$refs.tabSwiper.swiper.slideTo(newVal);
    //         this.$refs.mainSwiper.swiper.slideTo(newVal);
    //     },
    // },
    mounted() {
        this.$nextTick(() => {
            new Swiper('.main-swiper', {
                perPageView: 1,
                speed: 500,
                autoplay: false,
            });
            new Swiper('.tab-swiper', {
                slidesPerView: 2,
                loop: true,
                autoplay: true,
                speed: 500,
                slideToClickedSlide: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // breakpoints: {
                //     // when window width is >= 320px
                //     320: {
                //         slidesPerView: 2,
                //         spaceBetween: 20,
                //     },
                //     // when window width is >= 640px
                //     768: {
                //         slidesPerView: 4,
                //         spaceBetween: 20,
                //     },
                // },
            });
            this.$refs.tabSwiper.swiper.on('slideChange', this.handleTabSlideChange);
            this.$refs.mainSwiper.swiper.on('slideChange', this.handleSlideChange);
        });
    },
    methods: {
        handleTabClick(index) {
            console.log(index);
            this.activeTab = index;
            // this.$refs.tabSwiper.swiper.slideTo(index);
        },
        handleTabSlideChange() {
            this.$nextTick(() => {
                this.activeTab = this.$refs.tabSwiper.swiper.realIndex;
            });
        },
        handleSlideChange() {
            this.$nextTick(() => {
                this.activeTab = this.$refs.mainSwiper.swiper.realIndex;
            });
        },
    },
});
