var content = new Vue({
    el: '#content',
    data() {
        return {
            swiperOptions1: {
                autoplay: false,
            },
            swiperTab1: 1,
        };
    },
    mounted() {
        this.$refs.swiper1.swiper.on('slideChange', this.onSwiperSlideChange1);
        this.handleSwiperPlay1();
    },
    methods: {
        changeSwiperTab1(target) {
            this.swiperTab1 = target;
            this.$refs.swiper1.swiper.slideTo(target - 1);
            this.$refs.swiper1.swiper.autoplay.start();
        },
        onSwiperSlideChange1() {
            this.swiperTab1 = this.$refs.swiper1.swiper.realIndex + 1;
        },
        handleSwiperPlay1() {
            const swiperContainer = document.querySelector('.swiper-container1');
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) this.$refs.swiper1.swiper.autoplay.start();
                    else this.$refs.swiper1.swiper.autoplay.stop();
                });
            });

            observer.observe(swiperContainer);
        },
    },
});
