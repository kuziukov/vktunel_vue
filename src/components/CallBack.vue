<template>
<div>

</div>
</template>

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
        self.access_token = this.$route.query.access_token
        self.user_id = this.$route.query.user_id
        
        axios({url: self.url, method: 'GET' })
        .then(resp => {
          console.log(resp)
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
    }
}

</script>

<style scoped>

</style>
