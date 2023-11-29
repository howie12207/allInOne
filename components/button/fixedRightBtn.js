export default {
    props: {
        arrow: {
            type: String,
            default: 'right',
        },
    },
    setup(props) {
        const { title } = props;
        const group = [
            {
                link: 'https://etrade.franklin.com.tw/Home/Login',
                title: '立即申購',
                type: 'type2',
                arrow: 'right',
            },
            {
                link: 'https://etrade.franklin.com.tw/OpenAccount/',
                title: '線上開戶',
                arrow: '',
            },
        ];
        return { title, group };
    },
    template: `<div class="fixed-btn-area">
    <div v-for="item in group" :key="item.link" class="fixed-btn" :class="item?.type">
        <a
            href="https://etrade.franklin.com.tw/Home/Login"
            target="_blank"
            title="{{item.title}}"
        >{{item.title}}
            <i v-if="item.arrow === 'right'" class="fas fa-chevron-right">
            </i>
            <i v-else-if="item.arrow === 'down'" class="fas fa-chevron-down">
            </i>
        </a>
    </div>
    </div>`,
};
