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
            margin: {
                vertical: 0,
                horizon: 0,
            },
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
            downPoint: {
                vertical: {
                    start: '',
                    top: '',
                    scrollTop: '',
                },
                horizon: {
                    start: '',
                    left: '',
                    scrollLeft: '',
                },
            },
        };
    },
    watch: {},
    methods: {
        computedShow() {
            const parent = this.scrollPadding.getBoundingClientRect();
            const child = this.scrollContent.getBoundingClientRect();
            this.margin.vertical = parent.width - child.width;
            this.margin.horizon = parent.height - child.height;
            console.log(this.margin.horizon);
            // resize 计算滚动条是否展示
            const rect = this.wrap.getBoundingClientRect();
            const parentRect = this.scrollPadding.getBoundingClientRect();
            if (parentRect.height < rect.height - this.margin.vertical) {
                this.verticalShow = true;
                this.getVertical(parentRect, rect);
            } else {
                this.verticalShow = false;
            }

            if (parentRect.width < rect.width - this.margin.horizon) {
                this.horizonShow = true;
                this.getHorizon(parentRect, rect);
            } else {
                this.horizonShow = false;
            }
        },
        getVertical(parent, inner) {
            // 滚动区域完整高度
            const parentHeight = parent.height - this.margin.horizon;
            this.inner.vertical.height =
                parentHeight -
                this.inner.vertical.paddingTop -
                this.inner.vertical.paddingBottom;
            // 滚动区域顶部距离
            const scrollHeight =
                parentHeight / inner.height * this.inner.vertical.height;
            const scrollTop =
                this.scrollPadding.scrollTop / parentHeight * scrollHeight;
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
            const parentWidth = parent.width - this.margin.vertical;
            this.inner.horizon.width =
                parentWidth -
                this.inner.horizon.paddingTop -
                this.inner.horizon.paddingBottom;
            // 滚动区域顶部距离
            const scrollWidth =
                parentWidth / inner.width * this.inner.horizon.width;
            const scrollLeft =
                this.scrollPadding.scrollLeft / parentWidth * scrollWidth;
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
                (this.horizonPadding.left - this.inner.horizon.paddingLeft) /
                this.horizonPadding.width *
                this.scrollPadding.getBoundingClientRect().width
            );
        },
        scrollVertical(movement = 0) {
            const startTop = this.downPoint.vertical.top;
            const targetY = startTop + movement;
            const startScrollTop = this.downPoint.vertical.scrollTop;
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
                movement /
                this.verticalPadding.height *
                this.scrollPadding.getBoundingClientRect().height;
            this.scrollPadding.scrollTop = startScrollTop + scrollY;
            // this.scrollPadding.scrollLeft = this.getHorizonScrollLeft();
        },
        scrollHorizion(movement) {
            const startLeft = this.downPoint.horizon.left;
            const targetX = startLeft + movement;
            const startScrollLeft = this.downPoint.horizon.scrollLeft;
            if (targetX < this.inner.horizon.paddingLeft) {
                this.horizonPadding.left = this.inner.horizon.paddingLeft;
            } else if (
                targetX +
                    this.horizonPadding.width -
                    this.inner.horizon.paddingLeft -
                    this.margin.vertical >
                this.inner.horizon.width
            ) {
                this.horizonPadding.left =
                    this.inner.horizon.width +
                    this.inner.horizon.paddingLeft -
                    this.horizonPadding.width;
            } else {
                this.horizonPadding.left = targetX;
            }

            const scrollX =
                movement /
                this.horizonPadding.width *
                this.scrollPadding.getBoundingClientRect().width;
            this.scrollPadding.scrollLeft = startScrollLeft + scrollX;
        },
        down(args, type) {
            this.dragging[type] = true;
            const e = args[0];
            if (type === 'vertical') {
                this.downPoint.vertical = {
                    start: e.pageY,
                    top: this.verticalPadding.top,
                    scrollTop: this.scrollPadding.scrollTop,
                };
            } else {
                this.downPoint.horizon = {
                    start: e.pageX,
                    left: this.horizonPadding.left,
                    scrollLeft: this.scrollPadding.scrollLeft,
                };
                this.horizonStart = e.pageX;
            }
        },
        move(e) {
            if (this.dragging.vertical) {
                const movement = e.pageY - this.downPoint.vertical.start;
                this.scrollVertical(movement);
            } else if (this.dragging.horizon) {
                const movement = e.pageX - this.downPoint.horizon.start;
                this.scrollHorizion(movement);
                this.horizonStart = e.pageX;
            }
        },
        up() {
            this.dragging.vertical = false;
            this.dragging.horizon = false;
        },
        parentScroll(e) {
            e.stopPropagation();
            e.preventDefault();
            if (this.dragging.vertical || this.dragging.horizon) {
                return;
            }
            this.resizeEvent();
        },
    },
    mounted() {
        this.scrollContent = this.$refs.content;
        this.scrollPadding = this.$refs.padding;
        const wrap = this.$slots.wrap[0].elm;
        this.wrap = wrap;
        this.resizeEvent = throttle(0, type => {
            if (!this.wrap) {
                return;
            }
            this.computedShow(type);
        });
        addResizeListener(this.wrap, this.resizeEvent);
        document.addEventListener('mousemove', this.move);
        document.addEventListener('mouseup', this.up);
    },
    destoryed() {
        removeResizeListener(this.wrap, this.resizeEvent);
        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('mouseup', this.up);
    },
};
