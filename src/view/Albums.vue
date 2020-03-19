<template>
    <div>
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Список альбомов</h1>
            <p class="lead">Посмотрите ниже и вы увидите список доступных для загрузки альбомов. Нажмите на кнопку «Добавить в (Загрузить)», чтобы добавить альбом в список на загрузку. </p>
        </div>
        <main role="main" class="container">
            <nav aria-label="breadcrumb" v-if="!error">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><router-link :to="{ name: 'Community' }">{{ object ? 'name' in object ? 'Сообщество' : 'Пользователь' : 'Не определено' }}</router-link></li>
                    <li class="breadcrumb-item"><router-link :to="{ name: 'Albums', params: { cummunity_id: object ? object.id : '#' } }">{{ object ? 'name' in object ? object.name : `${object.first_name + ' ' + object.last_name}` : 'Не определено'}}</router-link></li>
                    <li class="breadcrumb-item active" aria-current="page">Название альбома</li>
                </ol>
            </nav>

            <div class="alert alert-warning text-center" role="alert" v-if="error">
                Сожалеем, но альбом скрыт от пользователей настройками приватности, вы не можете получить к нему доступ. <router-link :to="{ name: 'Community' }">Вернуться</router-link>
            </div>

            <div class="my-3 p-3 bg-white rounded shadow-sm" v-if="!error">
                <h6 class="border-bottom border-gray pb-2 mb-0">Список доступных вам альбомов</h6>
                    <div class="media text-muted pt-3" v-bind:key="album.id" v-for="album in albums">
                        <img :src="album.thumb_src" alt="..." class="bd-placeholder-img mr-2 rounded" width="32" height="32">
                        <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                            <div class="d-flex justify-content-between align-items-center w-100">
                                <strong class="text-gray-dark">{{album.title}}</strong>
                                <a href="#" @click="createTask(album.id)">Добавить в (Загрузить)</a>
                            </div>
                            <span class="d-block">Фотографий в альбоме: {{album.size}}. Дата создания альбома: {{ album.created | formatDate }}</span>
                        </div>
                    </div>
            </div>
        </main>
    </div>
</template>

<script>
    import axios from 'axios'
    import api from '../api'
    import { formatDate } from "../utils";

    export default {
        name: 'Albums',
        data(){
            return{
                albums: [],
                error: null,
                object: null
            }
        },
        methods: {
            createTask: function (album_id) {
                let community_id = this.$route.params.cummunity_id;
                this.$store.dispatch('createTask', { 'subject_id': community_id, 'album_id': album_id })
                    .then(resp => {
                        if (resp.data['code'] === 200){
                            this.$notify({
                                group: 'foo',
                                title: 'Задача добавлена в загрузку',
                                type: 'success',
                                text: 'Альбом "'+ resp.data.result.task.album_name+ '" добавлен в <a href="/tasks" class="alert-link">загрузки</a>'
                            });
                        }
                        if (resp.data['code'] === 410){
                            this.$notify({
                                group: 'foo',
                                title: 'Тарифный план',
                                type: 'danger',
                                text: `Тарифный план <u><strong>не активен</strong></u>, выберите тарифный план для продолжения работы`
                            });
                        }
                    }).catch((error) => {
                        this.$notify({
                            group: 'foo',
                            title: 'Произошла ошибка',
                            type: 'warning',
                            text: 'Извините, нам не удалось загрузить ваш альбом, попробуйте снова'
                        });
                    })
            },
            setData (err, albums) {
                if (err) {
                    this.error = err.toString()
                } else {
                    this.albums = albums
                }
            },
            setObject(err, object){
                if (err) {
                    this.error = err.toString()
                } else {
                    this.object = object
                }
            }
        },
        filters: {
            formatDate: function (value) {
                return formatDate(value)
            }
        },
        beforeRouteEnter(to, from, next){

            axios.all([
                api.get('/albums/'+to.params.cummunity_id),
                api.get('/'+ (to.params.cummunity_id < 0 ? 'community' : 'profile') + '/' +to.params.cummunity_id.replace('-', ''))
            ]).then(axios.spread((AlbumsRes, ObjectRes) => {

                if (('code' in AlbumsRes.data && AlbumsRes.data['code'] === 200) && ('code' in ObjectRes.data && ObjectRes.data['code'] === 200)){
                    next(vm => {
                        vm.setData(null, AlbumsRes.data.result.items);
                        vm.setObject(null, ObjectRes.data.result);
                    });
                }
            })).catch(err => {
                next(vm => {
                    vm.setData(err, null);
                    vm.setObject(err, null);
                });
            });
        },
    }

</script>
