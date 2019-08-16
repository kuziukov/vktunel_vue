<template>
    <div class="container">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Загрузка альбома сообщества по ссылке</h1>
            <p class="lead">Укажите ссылку на сообщество и мы загрузим его для вас.</p>
        </div>

        <div class="alert alert-danger" v-if="error">
            {{error}} <a href="#">Вернуться</a>
        </div>

        <form class="needs-validation" role="form" method="POST">
            <div class="form-group has-search">
                <span class="fa fa-search form-control-feedback"></span>
                <form class="needs-validation" role="form" method="POST">
                    <div class="form-group has-search">
                        <span icon="search" class="fa fa-search form-control-feedback"></span>
                        <input class="form-control" id="query" name="query" v-model="query" placeholder="https://vk.com/fest" type="text" value="" v-on:keydown.enter.prevent="search">

                    </div>
                    <input id="csrf_token" name="csrf_token" type="hidden" value="ImIwNGVkOTdlMzU3Y2I1MWZhMTBlZGNiMDY1NWU5NGY2Mzc2OTJmNWIi.XSWvwg.SsGjqYxFEGk2rK79rju4-araBTw">
                </form>
            </div>

        </form>


        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">© 2019 VK Tunel</p>
        </footer>
    </div>

</template>

<script>

    export default {
        name: 'Main',
        data(){
            return{
                error: null,
                query: null
            }
        },
        methods: {
            search (e) {
                this.$store.dispatch('SEARCH', { "link": this.query })
                    .then(resp => {
                        if (resp.data.result.type === 'user'){
                            this.$router.push({ name: 'Albums', params: { cummunity_id: `${resp.data.result.object_id}`}})
                        }
                        else if (resp.data.result.type === 'group'){
                            this.$router.push({ name: 'Albums', params: { cummunity_id: `-${resp.data.result.object_id}` } })
                        }
                    }).catch(err => {

                        this.$notify({
                            group: 'foo',
                            title: 'Произошла ошибка',
                            type: 'warning',
                            text: 'Мы не смогли распознать вашу ссылку, попробуйте еще раз'
                        });

                    });

                e.preventDefault();
            }
        },
    }
</script>

<style scoped>
    .main {
        width: 50%;
        margin: 50px auto;
    }

    .has-search .form-control {
        padding-left: 2.375rem;
    }

    .has-search .form-control-feedback {
        position: absolute;
        z-index: 2;
        display: block;
        width: 2.375rem;
        height: 2.375rem;
        line-height: 2.375rem;
        text-align: center;
        pointer-events: none;
        color: #aaa;
    }
</style>
