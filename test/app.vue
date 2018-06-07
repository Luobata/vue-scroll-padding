<template lang="pug">
    div.wrap
        vue-scroll-padding.padding(
            ref="padding"
            :vertical="true"
            maxHeight="200px"
            maxWidth="200px"
        )
            .ul(slot="wrap" ref="content")
                .li(v-for="item in lists") {{ item }}
    
        .button(@click="toggle")
</template>
<style scoped lang="stylus">
.wrap
    padding 150px
.padding
    width 200px
    border 1px solid red
    .ul
        width 500px
    .li
        width 100%
        height 80px
        background yellow
        cursor pointer
        border-bottom 1px solid green
    .li:hover
        background #73f173
.button
    margin-top 100px
    width 100px
    height 100px
    background red
</style>
<script>
export default {
    data() {
        return {
            lists: [1, 2, 3],
            lists: [1],
        };
    },
    methods: {
        toggle() {
            this.lists = [1, 2, 3, 4];
        },
    },
    mounted() {
        // this.$refs['padding'].update(this.$refs['content']);
    },
};
</script>
