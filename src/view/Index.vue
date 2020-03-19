<template>
    <Main v-if="isAuthenticated"/>
    <Landing v-else-if="!isAuthenticated"/>
</template>

<script>
    import Main from '../components/MainComponent.vue'
    import Landing from '../components/LandingComponent'

    export default {
        name: 'Index',
        components: {
            Main,
            Landing
        },
        computed : {
            isAuthenticated : function(){ return this.$store.getters.isAuthenticated},
        }
    }

</script>

<style scoped>

</style>
