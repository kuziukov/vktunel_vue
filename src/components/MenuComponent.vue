<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
    <h5 class="my-0 mr-md-auto font-weight-normal">Вскачай все</h5>
    <nav class="my-2 my-md-0 mr-md-3">
        
        <router-link :to="{ name: 'LandingComponent' }" class="p-2 text-dark">На главную</router-link>
        <router-link to="/about" class="p-2 text-dark">About</router-link>
        <a class="p-2 text-dark" href="#">Сообщества</a>
        <a class="p-2 text-dark" href="#">Поддержка</a>
    </nav>
    <router-link to="/about" class="btn btn-outline-primary">
        Имя пользователя
        <span class="badge badge-pill badge-primary">0</span>
        <span class="sr-only">unread messages</span>
    </router-link>
  </div>
</template>


<script>
export default {
  name: 'MenuComponent',
  props: {
    msg: String
  }
}
</script>

