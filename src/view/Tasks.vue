<template>
    <div>

        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Список поставленных вами задач</h1>
            <p class="lead">Список поставленных вами задач и статус их исполнения. Как только задача будет выполнена, вы получите ссылку на скачивание архива. </p>
        </div>

        <main role="main" class="container">

            <div class="alert alert-info text-center" role="alert" v-if="tasks.length < 1">
                У вас еще нет ни одной поставленной задачи.
            </div>

            <div class="my-3 p-3 bg-white rounded shadow-sm" v-if="tasks.length > 0">
                <h6 class="border-bottom border-gray pb-2 mb-0">Список поставленных вами задач</h6>

                    <div class="media text-muted pt-3" v-bind:key="task.id" v-for="task in tasks">
                        <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#2f91fa"/>
                        </svg>
                      <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                          <div class="d-flex justify-content-between align-items-center w-100">
                              <strong class="text-gray-dark">{{task.album_name}}</strong>
                              <a href="#" @click="download(task.id)">{{Object.values(task.archive).length > 0 ? 'Скачать (' + convertBytes(task.archive.length) + ')' : ''}}</a>
                          </div>
                          <span class="d-block" v-html="`Статус задачи ${Object.values(task.archive).length > 0 ? `<i class='fa fa-check'> (выполнено)</i>` : `<i class='fa fa-clock-o'> (выполняется)</i>`}`"> </span>
                      </div>
                    </div>

            </div>

        </main>
    </div>
</template>

<script>
import store from '../store'
import { convertBytes } from '../utils'

export default {
    name: 'Task',
    data(){
        return{
            tasks: [],
            error:null,
        }
    },
    computed: {
        listOfTasks: function(){ return this.$store.getters.listOfTasks},
    },
    methods: {
        download: function(task_id){
            window.open('https://api.wlusm.ru/files/'+task_id)
        },
        setData (err, tasks) {
            if (err) {
                this.error = err.toString()
            } else {
                this.tasks = tasks
            }
        },
        convertBytes: function (bytes) {
            return convertBytes(bytes)
        }
    },
    beforeRouteEnter(to, from, next){
        next(vm => vm.setData(null, vm.$store.getters.listOfTasks['items']))
    },
    created() {
        store.dispatch('TASKS')
                .then(resp => {
                    if ('code' in resp.data && resp.data['code'] === 200){
                        this.setData(null, resp.data.result.items)
                    }
              }).catch(err => {
                  this.setData(err, null)
              })
    }
}
</script>

<style scoped>

</style>
