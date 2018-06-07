import throttle from 'throttle-debounce/throttle';
import { addResizeListener, removeResizeListener } from 'Lib/resize-event';

export default {
    name: 'vue-scroll-padding',
    props: {
        vertical: {
            type: Boolean,
            default: false,
        },
        verticalDirection: {
            // enums ['left', 'right']
            type: String,
            default: 'right',
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
                this.getVertical(parentRect, rect);
            } else {
                this.verticalShow = false;
            }
        },
        getVertical(parent, inner) {
            const paddingTop = 10;
            const paddingBottom = 10;
            const paddingRight = 10;
            const paddingLeft = 10;

            // 滚动区域完整高度
            const innerRealHeight = parent.height - paddingTop - paddingBottom;
            // 滚动区域顶部距离
            const scrollHeight =
                (parent.height / inner.height) * innerRealHeight;
            const scrollTop =
                (this.scrollPadding.scrollTop / parent.height) * scrollHeight;
            this.verticalPadding.top = `${scrollTop + paddingTop}px`;
            this.verticalPadding.height = `${scrollHeight}px`;

            if (this.verticalDirection === 'right') {
                this.verticalPadding.right = `${paddingRight}px`;
            } else {
                this.verticalPadding.left = `${paddingLeft}px`;
            }
        },
        update(content) {
            this.content = content;
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
            this.resizeEvent();
            e.stopPropagation();
            e.preventDefault();
        },
    },
    mounted() {
        this.scrollContent = this.$refs.content;
        this.scrollPadding = this.$refs.padding;
        this.resizeEvent = throttle(0, () => {
            this.computedShow();
        });
        addResizeListener(this.scrollContent, this.resizeEvent);
        // this.scrollContent.addEventListener(
        //     'scroll',
        //     this.scrollHorizonEvent,
        // );
    },
    destoryed() {
        removeResizeListener(this.scrollContent, this.resizeEvent);
    },
};
