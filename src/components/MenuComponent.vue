<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
    <h5 class="my-0 mr-md-auto font-weight-normal">Вскачай все</h5>
    <nav class="my-2 my-md-0 mr-md-3">
        <router-link :to="{ name: 'LandingComponent' }">Home</router-link>
        <router-link to="/about">About</router-link>
        <a class="p-2 text-dark" href="#">На главную</a>
        <a class="p-2 text-dark" href="#">Сообщества</a>
        <a class="p-2 text-dark" href="#">Поддержка</a>
    </nav>
    <a class="btn btn-outline-primary" href="#">
        Имя пользователя
        <span class="badge badge-pill badge-primary">0</span>
        <span class="sr-only">unread messages</span>
    </a>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
