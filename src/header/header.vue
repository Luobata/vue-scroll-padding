<template lang="pug">
.vue-scroll-wrap
    .vue-scroll-padding(ref="scroll-padding"  @scroll="parentScroll")
        // .scroll-clip
        slot(name="wrap")
    .scroll-wrap(ref="scroll-wrap" v-if="hasPadding" @scroll="scroll" @mousedown="down" @mouseup="up")
        .scroll(:style="{'height': height}")
</template>
<style lang="stylus" scoped>
.vue-scroll-wrap {
    position: relative;
}

.vue-scroll-padding {
    position: relative;
    max-height: 200px;
    overflow: hidden;
    overflow: auto;
}

.vue-scroll-padding::-webkit-scrollbar {
    width: 0;
    background: transparent;
}

/* 滚动槽 */
.vue-scroll-padding::-webkit-scrollbar-track {
    background: transparent;
}

/* 滚动条滑块 */
.vue-scroll-padding::-webkit-scrollbar-thumb {
    background: transparent;
}

.vue-scroll-padding::-webkit-scrollbar-thumb:window-inactive {
    background: transparent;
}

.scroll-wrap {
    position: absolute;
    height: 100%;
    right: 5px;
    width: 10px;
    top: 0;
    overflow: auto;
}

.scroll-wrap::-webkit-scrollbar {
    width: 10px;
}

/* 滚动槽 */
.scroll-wrap::-webkit-scrollbar-track {
}

/* 滚动条滑块 */
.scroll-wrap::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    background: gray;
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}

.scroll-wrap::-webkit-scrollbar-thumb:window-inactive {
}
</style>

<script src="./scroll-padding.js"></script>
