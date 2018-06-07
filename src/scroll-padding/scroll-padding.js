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
        maxHeight: {
            type: String,
        },
        maxWidth: {
            type: String,
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
                width: 5,
                height: '',
                top: '',
                right: '',
                left: '',
            },
            resizeEvent: '',
            dragging: {
                vertical: false,
                horizon: false,
            },
            verticalStart: 0,
            horizonStart: 0,
            inner: {
                // 滚动区域的高度和宽度 考虑到padding
                height: 0,
                width: 0,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                paddingRight: 10,
            },
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
            // 滚动区域完整高度
            this.inner.height =
                parent.height -
                this.inner.paddingTop -
                this.inner.paddingBottom;
            // 滚动区域顶部距离
            const scrollHeight =
                (parent.height / inner.height) * this.inner.height;
            const scrollTop =
                (this.scrollPadding.scrollTop / parent.height) * scrollHeight;
            this.verticalPadding.top = scrollTop + this.inner.paddingTop;
            this.verticalPadding.height = scrollHeight;

            if (this.verticalDirection === 'right') {
                this.verticalPadding.right = this.inner.paddingRight;
            } else {
                this.verticalPadding.left = this.inner.paddingLeft;
            }
        },
        scrollVertical(movement = 0) {
            const targetY = this.verticalPadding.top + movement;
            if (targetY < this.inner.paddingTop) {
                this.verticalPadding.top = this.inner.paddingTop;
            } else if (
                targetY + this.verticalPadding.height - this.inner.paddingTop >
                this.inner.height
            ) {
                this.verticalPadding.top =
                    this.inner.height +
                    this.inner.paddingTop -
                    this.verticalPadding.height;
            } else {
                this.verticalPadding.top = targetY;
            }

            const scrollY =
                (movement / this.verticalPadding.height) *
                this.scrollPadding.getBoundingClientRect().height;
            this.scrollPadding.scrollTop += scrollY;
        },
        scrollHorizion() {},
        down(args, type) {
            this.dragging[type] = true;
            const e = args[0];
            if (type === 'vertical') {
                this.verticalStart = e.pageY;
            } else {
                this.horizonStart = e.pageX;
            }
        },
        move(e) {
            if (this.dragging.vertical) {
                const movement = e.pageY - this.verticalStart;
                this.scrollVertical(movement);
                this.verticalStart = e.pageY;
            } else {
                const movement = e.pageX - this.horizonStart;
                this.scrollHorizion(movement);
                this.horizonStart = e.pageX;
            }
            // console.log('move:', e);
        },
        up() {
            this.dragging.vertical = false;
            this.dragging.horizon = false;
        },
        update(content) {
            this.content = content;
        },
        parentScroll(e) {
            if (this.dragging.vertical) {
                return;
            }
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
        document.addEventListener('mousemove', this.move);
        document.addEventListener('mouseup', this.up);
    },
    destoryed() {
        removeResizeListener(this.scrollContent, this.resizeEvent);
        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('mouseup', this.up);
    },
};
