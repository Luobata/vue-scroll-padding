<template lang="pug">
    div
        vue-scroll-padding(
            siteName='看房团管理后台'
            userName='罗比塔'
            @changeCity='changeCity')
</template>
<style scoped lang="styl">
    #app
        height 100%
</style>
<script>
    export default {
        methods: {
            changeCity (city) {
                console.log(city);
            }
        }
    };
</script>
