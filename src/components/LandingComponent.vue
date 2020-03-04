<template>
    <div class="hello">
        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center">
            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h1 class="display-4">Мы поможем сохранить ваши моменты</h1>
                <p class="lead">Наша цель помочь вам извлечь все ваши фотографии с Вконтакте</p>
            </div>
        </div>

        <div class="container my-5 pt-5">
            <div class="row mb-2">
            <div class="col-md-6">
                <div class="card flex-md-row mb-4 box-shadow h-md-250">
                    <div class="card-body d-flex flex-column align-items-start">
                        <strong class="d-inline-block mb-2 text-primary">Images</strong>
                        <h3 class="mb-0">
                            <a class="text-dark" href="#">Загрузка альбомов</a>
                        </h3>
                        <div class="mb-1 text-muted">Nov 12</div>
                        <p class="card-text mb-auto">Статья поможет познакомиться с процессом загрузки альбомов</p>
                        <a href="#">Продолжить читать</a>
                    </div>
                    <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17077e0f492%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17077e0f492%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.1953125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" style="width: 200px; height: 250px;">
                </div>
            </div>
            <div class="col-md-6">
                <div class="card flex-md-row mb-4 box-shadow h-md-250">
                    <div class="card-body d-flex flex-column align-items-start">
                        <strong class="d-inline-block mb-2 text-success">Service</strong>
                        <h3 class="mb-0">
                            <a class="text-dark" href="#">Знакомство с Wlusm</a>
                        </h3>
                        <div class="mb-1 text-muted">Nov 11</div>
                        <p class="card-text mb-auto">В этой статье расмотрены все основные функции сервиса и знакомство со всеми его фнукциями</p>
                        <a href="#">Продолжить читать</a>
                    </div>
                    <img class="card-img-right flex-auto d-none d-md-block" data-src="holder.js/200x250?theme=thumb" alt="Thumbnail [200x250]" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17077e0f495%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17077e0f495%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.1953125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" style="width: 200px; height: 250px;">
                </div>
            </div>
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
    import { oauthAuthorizationLink } from '../utils'
    export default {
        name: 'Landing',
        methods: {
            login: function () {
                window.location = oauthAuthorizationLink()
                },
        },
    }

</script>

<style scoped>

</style>
