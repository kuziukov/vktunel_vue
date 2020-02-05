<template>
    <div class="hello">
        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center">
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h1 class="display-4">Мы поможем сохранить ваши моменты</h1>
                <p class="lead">Наша цель помочь вам извлечь все ваши фотографии с Вконтакте</p>
            </div>
        </div>

        <div class="container">
            <footer class="my-5 pt-5 text-muted text-center text-small">
                <p class="mb-1">© 2019 Wlusm</p>
            </footer>
        </div>
    </div>
</template>

<script>
    import config from '../config';
    export default {
        name: 'Landing',
        methods: {
            login: function () {
                window.location = config.authorizeLocation;
                },
        },
    }

</script>

<style scoped>

</style>
