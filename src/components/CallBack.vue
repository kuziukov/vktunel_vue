<script>
    import store from '../store'

    export default {
        name: 'CallBack',
        beforeRouteEnter(to, from, next){
            let code = {
                'code': to.query.code
            };
            store.dispatch('SIGNUP', code)
                .then().catch().finally(() => {
                next('/')
            });
        },

    }

</script>