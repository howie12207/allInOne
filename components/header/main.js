var content = new Vue({
    el: '#content',
    data() {
        return {
            // 新增處js data start
            isOpenMenu: false,
            // 新增處js data end
        };
    },
    methods: {
        // 新增處js methods start
        switchMenu() {
            this.isOpenMenu = !this.isOpenMenu;
        },
        // 新增處js methods end
    },
});
