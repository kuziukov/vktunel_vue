<script>
    import store from '../store'
    export default {
        name: 'CallBack',
        async beforeRouteEnter(to, from, next){
            let code = {
                'code': to.query.code
            };

            try{
                await store.dispatch('signUp', code)
                await store.dispatch('getProfile')
            } catch (e) {
                console.log(e);
            } finally {
                next('/');
            }

        },

    }

</script>