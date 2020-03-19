<template>
    <div class="container">

        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Загрузка альбома по ссылке</h1>
            <p class="lead">Укажите ссылку на сообщество или пользователя и мы загрузим его для вас.</p>
        </div>

        <div class="alert alert-danger" v-if="error">
            {{error}} <a href="#">Вернуться</a>
        </div>

        <form class="needs-validation" role="form" method="POST">
            <div class="input-group">
                <input class="form-control" id="query" name="query" v-model="query" placeholder="https://vk.com/durov" type="text" value="" v-on:keydown.enter.prevent="search">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" v-on:click="search">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </form>

        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="mb-1">© 2019 Wlusm</p>
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
                        switch (resp.data.result.type) {
                            case 'user':
                                this.$router.push(
                                    {
                                        name: 'Albums',
                                        params: {
                                            cummunity_id: `${resp.data.result.object_id}`
                                        }
                                    }
                                );
                                break;
                            case 'group':
                                this.$router.push(
                                    {
                                        name: 'Albums',
                                        params: {
                                            cummunity_id: `-${resp.data.result.object_id}`
                                        }
                                    }
                                );
                        }
                    }).catch(err => {
                        this.$notify({
                            group: 'foo',
                            title: 'Загрузка альбома по ссылке',
                            type: 'warning',
                            text: 'Мы не смогли распознать вашу ссылку, попробуйте еще раз'
                        });

                    });
                e.preventDefault();
            }
        },
    }
</script>
