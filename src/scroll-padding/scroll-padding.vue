<template lang="pug">
.vue-scroll-wrap
    .vue-scroll-padding(ref="padding"  @scroll="parentScroll")
        .scroll-content(ref="content")
            slot(name="wrap")
    .scroll-bar-vertical(
        v-if="vertical && verticalShow"
        :style="{'width': verticalPadding.width, 'height': verticalPadding.height, 'top': verticalPadding.top, 'right': verticalPadding.right, 'left': verticalPadding.left}"
    )
</template>
<style lang="stylus" scoped>
.vue-scroll-wrap
    position relative
    .scroll-bar-vertical
        position absolute
        border-radius 15px
        background-color #c5c5c5
.vue-scroll-padding
    position relative
    max-height 200px
    overflow hidden
    overflow auto
.vue-scroll-padding::-webkit-scrollbar
    width 0
    background transparent
</style>

<script src="./scroll-padding.js"></script>
