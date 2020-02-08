<template>
    <div>
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Страница уведомлений</h1>
            <p class="lead">Здесь вы можете посмотреть все ваши действия на сервисе.</p>
        </div>

        <main role="main" class="container">

            <div class="alert alert-info text-center" role="alert" v-if="listOfNotifications.length < 1">
                У вас еще нет ни одного уведомления.
            </div>

            <div class="my-3 p-3 bg-white rounded shadow-sm" v-if="listOfNotifications.length > 0">
                <h6 class="border-bottom border-gray pb-2 mb-0">Список уведомлений</h6>

                <div class="media text-muted pt-3" v-bind:key="notification.id" v-for="notification in listOfNotifications">
                    <svg class="bd-placeholder-img mr-3 rounded" width="35" height="35" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32">
                        <image :href="`/icons/${notification.type}.png`" height="35" width="35"/>
                    </svg>
                    <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <div class="d-flex justify-content-between align-items-center w-100">
                            <div class="text-gray-dark" v-html="notification_title(notification)"></div>
                            <a href="#" @click="notification_hide(notification.id)"><i class="fa fa-chevron-down"></i></a>
                        </div>
                        <i class="d-block"><i class="fa fa-calendar-o"></i> {{ notification.created_at | formatDate }}</i>
                    </div>
                </div>

            </div>



        </main>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import store from "../store";
    import { make_notification_titles } from "../utils";
    import { formatDate } from "../utils";

    export default {
        name: 'Notifications',
        data(){
            return{
                notifications: [],
                error:null,
            }
        },
        filters: {
            formatDate: function (value) {
                return formatDate(value)
            }
        },
        computed: {
            ...mapGetters(['listOfNotifications']),
        },
        methods: {
            notification_title(notification){
                return make_notification_titles(notification)
            },
            notification_hide(id){
                store.dispatch('notification_delete', id)
                    .then(resp => {
                        if ('code' in resp.data && resp.data['code'] === 200){
                            this.$notify({
                                group: 'foo', title: 'Страница Уведомлений',
                                type: 'success', text: 'Уведомление было успешно скрыто, больше вы его не увидите'
                            });
                            this.setData(null, this.listOfNotifications)
                        }
                    })
                    .catch(err => {
                        this.setData(err, null)
                    })
            },
            setData (err, notifications) {
                if (err) {
                    this.error = err.toString()
                } else {
                    this.notifications = notifications
                }
            },
        },
        beforeRouteEnter(to, from, next){
            next(vm => vm.setData(null, vm.$store.getters.listOfNotifications))
        },
        created() {
            store.dispatch('notifications')
                .then(resp => {
                    if ('code' in resp.data && resp.data['code'] === 200){
                        this.setData(null, resp.data.result.items)
                    }
                })
                .catch(err => {
                    this.setData(err, null)
                })
        }
    }
</script>

<style scoped>
</style>
