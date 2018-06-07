<template lang="pug">
.vue-scroll-wrap
    .vue-scroll-padding(ref="padding"  @scroll="parentScroll" :style="{'max-height': maxHeight, 'max-width': maxWidth}")
        .scroll-content(ref="content")
            slot(name="wrap")
    .scroll-bar-vertical(
        v-if="vertical && verticalShow"
        @mousedown="down(arguments, 'vertical')"
        :class="{'active': dragging.vertical}"
        :style="{'width': verticalPadding.width + 'px', 'height': verticalPadding.height + 'px', 'top': verticalPadding.top + 'px', 'right': verticalPadding.right + 'px', 'left': verticalPadding.left + 'px'}"
    )
</template>
<style lang="stylus" scoped>
.vue-scroll-wrap
    position relative
    .scroll-bar-vertical
        position absolute
        border-radius 15px
        background-color #c5c5c5
        z-index 10000
        &.active
            background-color #b2b2b2
.vue-scroll-padding
    position relative
    overflow auto
.vue-scroll-padding::-webkit-scrollbar
    width 0
    height 0
    background transparent
</style>

<script src="./scroll-padding.js"></script>
