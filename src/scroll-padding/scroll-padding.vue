<template lang="pug">
.vue-scroll-wrap
    .vue-scroll-overflow(:style="{'height': maxHeight, 'width': maxWidth}")
        .vue-scroll-padding(ref="padding"  @scroll="parentScroll")
            .scroll-content(ref="content")
                slot(name="wrap")
    .scroll-bar-vertical(
        v-if="verticalShow"
        @mousedown="down(arguments, 'vertical')"
        :class="{'active': dragging.vertical}"
        :style="{'width': verticalPadding.width + 'px', 'height': verticalPadding.height + 'px', 'top': verticalPadding.top + 'px', 'right': verticalPadding.right + 'px', 'left': verticalPadding.left + 'px'}"
    )
    .scroll-bar-horizon(
        v-if="horizonShow"
        @mousedown="down(arguments, 'horizon')"
        :class="{'active': dragging.horizon}"
        :style="{'width': horizonPadding.width + 'px', 'height': horizonPadding.height + 'px', 'top': horizonPadding.top + 'px', 'bottom': horizonPadding.bottom + 'px', 'left': horizonPadding.left + 'px'}"
    )
</template>
<style lang="stylus" scoped>
.vue-scroll-wrap
    position relative
    .vue-scroll-overflow
        position relative
        overflow hidden
    .scroll-bar-vertical, .scroll-bar-horizon
        position absolute
        border-radius 15px
        background-color #c5c5c5
        z-index 10000
        user-select none
        &.active
            background-color #b2b2b2
.vue-scroll-padding
    position relative
    overflow auto
    position absolute
    left 0
    top 0
    .scroll-content
        width 200px
        height 200px
.vue-scroll-padding::-webkit-scrollbar
    width 0
    height 0
    background transparent
.vue-scroll-padding
    -ms-overflow-style none
    overflow -moz-scrollbars-none
</style>

<script src="./scroll-padding.js"></script>
