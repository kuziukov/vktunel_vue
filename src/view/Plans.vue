<template>
    <div>
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Тарифные планы</h1>
            <p class="lead">Чтобы пользоваться нашим сервисом вы можете воспользоваться одним из нижепредставленных тарифных планов</p>
        </div>

        <div class="container">
            <Plans/>
            <footer class="my-5 pt-5 text-muted text-center text-small">
                <p class="mb-1">© 2019 Wlusm</p>
            </footer>
        </div>
    </div>
</template>

<script>
    import Plans from '../components/PlansComponent.vue'

    export default {
        name: 'Index',
        components: {
            Plans
        }
    }

</script>

<style scoped>

</style>
