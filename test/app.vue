<template lang="pug">
    div.wrap
        vue-scroll-padding.padding(
            ref="padding"
            @changeCity='changeCity')
            .ul(slot="wrap" ref="content")
                .li(v-for="item in lists") {{ item }}
</template>
<style scoped lang="stylus">
.wrap {
    padding: 20px;
}

.padding {
    width: 200px;
    border: 1px solid red;

    .li {
        width: 100%;
        height: 80px;
        background: yellow;
        cursor: pointer;
    }

    .li:hover {
        background: red;
    }
}
</style>
<script>
export default {
    data() {
        return {
            lists: [1, 2, 3],
        };
    },
    methods: {
        changeCity(city) {
            console.log(city);
        },
    },
    mounted() {
        this.$refs['padding'].update(this.$refs['content']);
    },
};
</script>
