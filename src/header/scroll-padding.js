import { addResizeListener, removeResizeListener } from 'CONFIG/resize-event';
import throttle from 'throttle-debounce/throttle';

export default {
    name: 'vue-scroll-padding',
    props: {
        vertical: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            verticalShow: false,
            hasPadding: true,
            content: '',
            height: '0px',
            scrollWrap: '',
            scrollPadding: '',
            scrollEelement: 'wrap',
            verticalPadding: {
                width: '5px',
                height: '',
                top: '',
                right: '',
                left: '',
            },
            resizeEvent: '',
        };
    },
    watch: {
        content(val) {
            console.log(val);
            if (val) {
                console.log(val.getBoundingClientRect());
                this.height = val.getBoundingClientRect().height + 'px';
            }
        },
    },
    methods: {
        computedShow() {
            // resize 计算滚动条是否展示
            const wrap = this.$slots.wrap[0].elm;
            if (!wrap) {
                return;
            }

            const rect = wrap.getBoundingClientRect();
            const parentRect = this.$refs.padding.getBoundingClientRect();
            if (parentRect.height > rect.height && tthis.vertical) {
                this.verticalShow = true;
                this.getVertical();
            } else {
                this.verticalShow = false;
            }
        },
        getVertical() {},
        update(content) {
            this.content = content;
        },
        down() {
            this.scrollEelement = 'padding';
            console.log('down');
        },
        up() {
            this.scrollEelement = 'wrap';
            console.log('up');
        },
        scroll(e) {
            if (this.scrollEelement === 'padding') {
                const top = e.target.scrollTop;
                this.scrollPadding.scrollTop = top;
            }
            e.stopPropagation();
            e.preventDefault();
        },
        parentScroll(e) {
            if (this.scrollEelement === 'wrap') {
                const top = e.target.scrollTop;
                this.scrollWrap.scrollTop = top;
            }
            e.stopPropagation();
            e.preventDefault();
        },
    },
    mounted() {
        this.scrollWrap = this.$refs['scroll-wrap'];
        this.scrollPadding = this.$refs['scroll-padding'];
        this, (resizeEvent = throttle(50, () => {}));
        addResizeListener(this.$refs['crm-table'], this.resizeEvent);
        this.$refs['crm-table'].addEventListener(
            'scroll',
            this.scrollHorizonEvent,
        );
    },
    destoryed() {
        // remove
    },
};
