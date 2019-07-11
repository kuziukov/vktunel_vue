<script>

import axios from 'axios'

export default {
    name: 'CallBack',
    props: {
        msg: String
    },
    data(){
        return{
            access_token: '',
            user_id: '',
        }
    },
    mounted: function () {
        self.code = {
            'code': this.$route.query.code
        }
        this.$store.dispatch('authorization_code', self.code)
        .then(resp => {
            console.log(resp)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            window.location.replace('/')
        })
    }
}

</script>