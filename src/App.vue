<template>
  <div id="app">
    <MenuComponent msg="Welcome to Your Vue.js App"/>
    <router-view></router-view>
  </div>
</template>

<script>
import MenuComponent from './components/MenuComponent.vue'

export default {
  name: 'app',
  components: {
    MenuComponent
  }
}
</script>

<style>
    html{
            overflow-y: scroll;
        }
</style>
