<template lang="pug">
.vue-scroll-wrap
    .vue-scroll-padding(ref="padding"  @scroll="parentScroll")
        .scroll-content(ref="content")
            slot(name="wrap")
        .scroll-bar-vertical(v-if="vertical && verticalShow"
            :style="{'width': verticalPadding.width, 'height': verticalPading.height, 'top': verticalPadding.top, 'right: 'verticalPadding.right, 'left': verticalPadding.left}"
        )
</template>
<style lang="stylus" scoped>
.vue-scroll-wrap
    position relative

.vue-scroll-padding
    position relative
    max-height 200px
    overflow hidden
    overflow auto
    .scroll-bar-vertical
        position absolute
        border-radiuse 100%

.vue-scroll-padding::-webkit-scrollbar
    width 0
    background transparent
/* 滚动槽 */
.vue-scroll-padding::-webkit-scrollbar-track
    background transparent
/* 滚动条滑块 */
.vue-scroll-padding::-webkit-scrollbar-thumb
    background transparent
.vue-scroll-padding::-webkit-scrollbar-thumb:window-inactive
    background transparent
scroll-width = 10px
.scroll-wrap
    position absolute
    height 100%
    right 5px
    width scroll-width
    top 0
    overflow auto
.scroll-wrap::-webkit-scrollbar
    width scroll-width
/* 滚动槽 */
.scroll-wrap::-webkit-scrollbar-track
/* 滚动条滑块 */
.scroll-wrap::-webkit-scrollbar-thumb
    border-radius 10px
    background rgba(0, 0, 0, 0.1)
    background #ccc
    -webkit-box-shadow inset006pxrgba(0, 0, 0, 0.5)
.scroll-wrap::-webkit-scrollbar-thumb:window-inactive
</style>

<script src="./scroll-padding.js"></script>
