<template>
<div>

</div>
</template>

<script>
export default {
    name: 'CallBack',
    props: {
        msg: String
    },
    mounted: function () {
        this.$nextTick(function () {
            code = this.$route.query.code
            console.log(code)
            response = this.$store.dispatch('getAccessToken', code)
            console.log(response)
        })
    }
}

</script>

<style scoped>

</style>
