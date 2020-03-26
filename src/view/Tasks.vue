<template>
    <div>

        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Список поставленных вами задач</h1>
            <p class="lead">Список поставленных вами задач и статус их исполнения. Как только задача будет выполнена, вы получите ссылку на скачивание архива. </p>
        </div>

        <main role="main" class="container">

            <div class="progress" style="height: 1px;" v-if="limits">
                <div class="progress-bar" role="progressbar" :style="`width: ${ (getTasks.length * 100 ) / limits.numberOfAlbums }%;`" aria-valuenow="25" aria-valuemin="0" :aria-valuemax="`${limits.numberOfAlbums}`"></div>
            </div>

            <div class="alert alert-info text-center" role="alert" v-if="getTasks.length < 1">
                У вас еще нет ни одной поставленной задачи.
            </div>

            <div class="my-3 p-3 bg-white rounded shadow-sm" v-if="getTasks.length > 0">
                <h6 class="border-bottom border-gray pb-2 mb-0">Список поставленных вами задач</h6>

                    <div class="media text-muted pt-3" v-bind:key="task.id" v-for="task in getTasks">
                        <svg class="bd-placeholder-img mr-2 rounded" width="35" height="35" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32">
                            <image :href="`${Object.values(task.archive).length > 0 ? '/icons/ArchiveCompleted.png' : '/icons/ArchiveWaiting.png'}`" height="35" width="35"/>
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
    import { mapGetters, mapMutations } from 'vuex';
    import store from '../store'
    import { convertBytes } from '../utils'
    import { files_url } from '../config'

    export default {
        name: 'Task',
        data(){
            return{}
        },
        computed: {
            ...mapGetters(['getTasks', 'limits'])
        },
        methods: {
            ...mapMutations(['setTasks']),
            download: function(task_id){
                window.open(files_url+task_id)
            },
            convertBytes: function (bytes) {
                return convertBytes(bytes)
            }
        },
        async beforeRouteEnter(to, from, next){
            try {
                let response = store.dispatch('tasks');
                next(vm => {
                    vm.setTasks(response);
                });
            } catch (e) {
                this.$notify({
                    group: 'foo', title: 'Список задач',
                    type: 'danger', text: 'Произошла неизвестная ошибка, попробуйте попозже'
                });
            }
        },
    }
</script>

<style scoped>

</style>
