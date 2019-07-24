<template>
<div>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Список поставленных вами задач</h1>
      <p class="lead">Ниже вы можете увидеть список поставленных вами задач и статус их исполнения. Как только задача будет выполнена, вы получите ссылку на скачивание архива. Всегда готов вам помочь.</p>
    </div>

    <main role="main" class="container">

      <div class="my-3 p-3 bg-white rounded shadow-sm">
        <h6 class="border-bottom border-gray pb-2 mb-0">Список поставленных вами задач</h6>

          <div class="media text-muted pt-3" v-bind:key="task.id" v-for="task in tasks">
            <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
            <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <div class="d-flex justify-content-between align-items-center w-100">
                <strong class="text-gray-dark">{{task.album_name}}</strong>
                <a href="#">{{task.archive ? 'Скачать (250 МБ)' : ''}}</a>
              </div>
              <span class="d-block">Статус задачи: {{task.archive ? 'готово' : 'выполняется'}} </span>
            </div>
          </div>

        <small class="d-block text-right mt-3">
          <a href="#">All suggestions</a>
        </small>
      </div>

    </main>
</div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Task',
  data(){
    return{
      tasks: [],
      error:null,
    }
  },
  methods: {
    setData (err, tasks) {
      if (err) {
        this.error = err.toString()
      } else {
        this.tasks = tasks
      }
    }
  },
  beforeRouteEnter(to, from, next){
    axios.get('http://localhost:5000/v1.0/tasks')
          .then(resp => {
            if ('code' in resp.data && resp.data['code'] == 200){
              next(vm => vm.setData(null, resp.data.result.items))
            }
          })
          .catch(err => {
            next(vm => vm.setData(err, null))
          })   
  },
  mounted: function () {

     
  }
}
</script>

<style scoped>

</style>
