<template>
<div>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Список сообществ</h1>
      <p class="lead">Посмотрите ниже и вы увидите список доступных вам сообществ. Нажмите на кнопку «Список альбомов», чтобы перейти к списку альбомов сообщества. </p>
    </div>

    <main role="main" class="container">

      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link :to="{ name: 'Community' }">Сообщество</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">Название сообщества</li>
        </ol>
      </nav>

      <div class="my-3 p-3 bg-white rounded shadow-sm">
        <h6 class="border-bottom border-gray pb-2 mb-0">Список доступных вам сообществ</h6>

          <div class="media text-muted pt-3" v-bind:key="community.id" v-for="community in listOfCommunities">
            <img :src="community.photo_50" alt="..." class="bd-placeholder-img mr-2 rounded" width="32" height="32">
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <div class="d-flex justify-content-between align-items-center w-100">
                <strong class="text-gray-dark">{{community.name}}</strong>
                <router-link :to="{ name: 'Albums', params: { cummunity_id: `-${community.id}` } }">Список альбомов</router-link>
              </div>
              <span class="d-block">Описание сообщества, возможно количество альбомов и еще что-то</span>
            </div>
          </div>
      </div>

    </main>
</div>
</template>

<script>
    import store from '../store'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Community',
        data(){
            return{}
        },
        computed: {
            ...mapGetters(['listOfCommunities'])
        },
        methods: {},
        async beforeRouteEnter(to, from, next){
            try {
                let response = await store.dispatch('communities');
                next();
            } catch (e) {
                this.$notify({
                    group: 'foo', title: 'Сообщества',
                    type: 'danger', text: 'Произошла неизвестная ошибка, попробуйте позднее'
                });

            }
        }
    }
</script>

<style scoped>

</style>
