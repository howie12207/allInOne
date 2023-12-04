new Vue({
    el: '#swiper-content',
    data() {
        return {
            activeTab: 0,
        };
    },
    mounted() {
        this.$nextTick(() => {
            new Swiper('.main-swiper', {
                perPageView: 2,
                loop: true,
                autoplay: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        });
    },
    methods: {
        handleTabClick(index) {
            this.activeTab = index;
            this.$nextTick(() => {
                this.$refs.mainSwiper.swiper.slideTo(0);
            });
        },
    },
});
