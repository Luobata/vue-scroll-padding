import { addResizeListener, removeResizeListener } from 'Lib/resize-event';
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
            scrollContent: '',
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
            const parentRect = this.scrollPadding.getBoundingClientRect();
            if (parentRect.height < rect.height && this.vertical) {
                this.verticalShow = true;
                this.getVertical(parentRect.height, rect.height);
            } else {
                this.verticalShow = false;
            }
        },
        getVertical(parentHeight, innerHeight) {
            console.log(1);
            const paddingTop = 10;
            const paddingBottom = 10;
            const paddingRight = 10;

            const innerRealHeight = parentHeight - paddingTop - paddingBottom;
        },
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
        this.scrollContent = this.$refs.content;
        this.scrollPadding = this.$refs.padding;
        this.resizeEvent = throttle(50, () => {
            this.computedShow();
        });
        addResizeListener(this.scrollContent, this.resizeEvent);
        // this.scrollContent.addEventListener(
        //     'scroll',
        //     this.scrollHorizonEvent,
        // );
    },
    destoryed() {
        // remove
    },
};
