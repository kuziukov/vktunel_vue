<template>
    <Main v-if="isLoggedIn"/>
    <Landing v-else-if="!isLoggedIn"/>
</template>

<script>
    import Landing from '../components/LandingComponent.vue'
    import Main from '../components/MainComponent.vue'

    export default {
        name: 'Index',
        components: {
            Landing,
            Main
        },
        computed : {
            isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
        }
    }

</script>

<style scoped>

</style>
