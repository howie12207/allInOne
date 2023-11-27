var content = new Vue({
    el: '#content',
    data() {
        return {
            isOpenMenu: true,
        };
    },
    methods: {
        switchMenu() {
            this.isOpenMenu = !this.isOpenMenu;
        },
    },
});
