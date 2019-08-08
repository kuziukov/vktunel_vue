<template>
    <Main v-if="isAuthenticated"/>
    <Landing v-else-if="!isAuthenticated"/>
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
            isAuthenticated : function(){ return this.$store.getters.isAuthenticated},
        }
    }

</script>

<style scoped>

</style>
