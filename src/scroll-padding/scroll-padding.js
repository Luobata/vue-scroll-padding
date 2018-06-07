import throttle from 'throttle-debounce/throttle';
import { addResizeListener, removeResizeListener } from 'Lib/resize-event';

export default {
    name: 'vue-scroll-padding',
    props: {
        verticalDirection: {
            // enums ['left', 'right']
            type: String,
            default: 'right',
        },
        horizonDirection: {
            // enums ['top', 'bottom']
            type: String,
            default: 'bottom',
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
            wrap: '',
            verticalShow: false,
            horizonShow: false,
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
            horizonPadding: {
                width: '',
                height: 5,
                left: '',
                top: '',
                bottom: '',
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
                vertical: {
                    height: 0,
                    width: 0,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                },
                horizon: {
                    height: 0,
                    width: 0,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                },
            },
        };
    },
    watch: {},
    methods: {
        computedShow(type) {
            // resize 计算滚动条是否展示
            const rect = this.wrap.getBoundingClientRect();
            const parentRect = this.scrollPadding.getBoundingClientRect();
            if (parentRect.height < rect.height) {
                this.verticalShow = true;
                if (type !== 'vertical') {
                    this.getVertical(parentRect, rect);
                }
            } else {
                this.verticalShow = false;
            }

            if (parentRect.width < rect.width) {
                this.horizonShow = true;
                if (type !== 'horizon') {
                    this.getHorizon(parentRect, rect);
                }
            } else {
                this.horizonShow = false;
            }
        },
        getVertical(parent, inner) {
            // 滚动区域完整高度
            this.inner.vertical.height =
                parent.height -
                this.inner.vertical.paddingTop -
                this.inner.vertical.paddingBottom;
            // 滚动区域顶部距离
            const scrollHeight =
                (parent.height / inner.height) * this.inner.vertical.height;
            const scrollTop =
                (this.scrollPadding.scrollTop / parent.height) * scrollHeight;
            this.verticalPadding.top =
                scrollTop + this.inner.vertical.paddingTop;
            this.verticalPadding.height = scrollHeight;

            if (this.verticalDirection === 'right') {
                this.verticalPadding.right = this.inner.vertical.paddingRight;
            } else {
                this.verticalPadding.left = this.inner.vertical.paddingLeft;
            }
        },
        getHorizon(parent, inner) {
            // 滚动区域完整高度
            this.inner.horizon.width =
                parent.width -
                this.inner.horizon.paddingTop -
                this.inner.horizon.paddingBottom;
            // 滚动区域顶部距离
            const scrollWidth =
                (parent.width / inner.width) * this.inner.horizon.width;
            const scrollLeft =
                (this.scrollPadding.scrollLeft / parent.width) * scrollWidth;
            this.horizonPadding.left =
                scrollLeft + this.inner.horizon.paddingLeft;
            this.horizonPadding.width = scrollWidth;

            if (this.horizonDirection === 'bottom') {
                this.horizonPadding.bottom = this.inner.horizon.paddingBottom;
            } else {
                this.horizonPadding.top = this.inner.horizon.paddingTop;
            }
        },
        getHorizonScrollLeft() {
            return (
                ((this.horizonPadding.left - this.inner.horizon.paddingLeft) /
                    this.horizonPadding.width) *
                this.scrollPadding.getBoundingClientRect().width
            );
        },
        scrollVertical(movement = 0) {
            const targetY = this.verticalPadding.top + movement;
            if (targetY < this.inner.vertical.paddingTop) {
                this.verticalPadding.top = this.inner.vertical.paddingTop;
            } else if (
                targetY +
                    this.verticalPadding.height -
                    this.inner.vertical.paddingTop >
                this.inner.vertical.height
            ) {
                this.verticalPadding.top =
                    this.inner.vertical.height +
                    this.inner.vertical.paddingTop -
                    this.verticalPadding.height;
            } else {
                this.verticalPadding.top = targetY;
            }

            const scrollY =
                (movement / this.verticalPadding.height) *
                this.scrollPadding.getBoundingClientRect().height;
            this.scrollPadding.scrollTop += scrollY;
            // this.scrollPadding.scrollLeft = this.getHorizonScrollLeft();
        },
        scrollHorizion(movement) {},
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
        parentScroll(e) {
            e.stopPropagation();
            e.preventDefault();
            // 不能直接return 拖拽vertical的时候 可以触发horizon的滚动
            // if (this.dragging.vertical || this.dragging.horizon) {
            //     return;
            // }
            if (this.dragging.vertical) {
                this.resizeEvent('vertical');
            } else {
                this.resizeEvent('horizon');
            }
        },
    },
    mounted() {
        this.scrollContent = this.$refs.content;
        this.scrollPadding = this.$refs.padding;
        this.resizeEvent = throttle(0, type => {
            const wrap = this.$slots.wrap[0].elm;
            if (!wrap) {
                return;
            }
            this.wrap = wrap;
            this.computedShow(type);
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
