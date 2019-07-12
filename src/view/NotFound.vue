<template>
  <div class="d-flex flex-column h-100">
    <main role="main" class="flex-shrink-0">
      <div class="container">
        <h1 class="mt-5">Страница не найдена</h1>
        <p class="lead">Извините, но похоже страница или данные, которые вы запрашиваете, не найдены.</p>
        <p>Пожалуйста <a href="#">вернитесь</a> и попробуйте заного</p>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
    props: {
      msg: String
    }
  }
</script>

<style scoped>
</style>
