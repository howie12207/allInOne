new Vue({
  el: '#swiper-content-2',
  data() {
      return {
          activeTab: 0,
      };
  },
  mounted() {
      this.$nextTick(() => {
          new Swiper('.single-main-swiper', {
              perPageView: 2,
              loop: true,
              autoplay: true,
              pagination: {
                  el: '.single-main-swiper .swiper-pagination',
                  clickable: true,
              },
              navigation: {
                  nextEl: '.single-main-swiper .swiper-button-next',
                  prevEl: '.single-main-swiper .swiper-button-prev',
              },
          });
      });
  },
  methods: {
      handleTabClick(index) {
          this.activeTab = index;
          this.$nextTick(() => {
              this.$refs.singleMainSwiper.swiper.slideTo(0);
          });
      },
  },
});
