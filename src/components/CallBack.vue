<script>
    import store from '../store'
    import route from '../router'

    export default {
        name: 'CallBack',
        beforeRouteEnter(to){
            let code = {
                'code': to.query.code
            };
            store.dispatch('authorization_code', code)
                .then().catch().finally(() => {
                route.replace('/')
            });
        },

    }

</script>