<script>
    import store from '../store'
    import route from '../router'

    export default {
        name: 'CallBack',
        beforeRouteEnter(to){
            let code = {
                'code': to.query.code
            };
            store.dispatch('SIGNUP', code)
                .then().catch().finally(() => {
                route.replace('/')
            });
        },

    }

</script>