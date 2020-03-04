<template>

    <div class="card-deck mb-3 text-center">
      <div class="card mb-4 box-shadow">
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">Бесплатно</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">₽0 <small class="text-muted">/ мес</small></h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>1к фотографий</li>
            <li>Не более 10 альбомов</li>
          </ul>
          <button type="button" @click="login" v-if="isAuthenticated === false" class="btn btn-lg btn-block btn-outline-primary">Присоединяйся бесплатно</button>
        </div>
      </div>
      <div class="card mb-4 box-shadow">
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">Чашечка кофе</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">₽100 <small class="text-muted">/ мес</small></h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>Неограниченно фотографий</li>
            <li>20 альбомов</li>
          </ul>
          <button type="button" class="btn btn-lg btn-block btn-primary" v-if="isAuthenticated === false" disabled>Начни сейчас</button>
        </div>
      </div>
      <div class="card mb-4 box-shadow">
        <div class="card-header">
          <h4 class="my-0 font-weight-normal">Кофе с пироженкой</h4>
        </div>
        <div class="card-body">
          <h1 class="card-title pricing-card-title">₽200 <small class="text-muted">/ мес</small></h1>
          <ul class="list-unstyled mt-3 mb-4">
            <li>Неограниченно фотографий</li>
            <li>Неограничено альбомов</li>
          </ul>
          <button type="button" class="btn btn-lg btn-block btn-primary" v-if="isAuthenticated === false" disabled>Начни на безлимите</button>
        </div>
      </div>
    </div>

</template>

<script>
  import { oauthAuthorizationLink } from '../utils'
  import { mapGetters } from 'vuex';
  export default {
    name: 'Plans',
    methods: {
        login: function () {
          window.location = oauthAuthorizationLink()
        }
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
    },
  }

</script>

<style scoped>

</style>
