<template>
    <div>
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h1 class="display-4">Страница уведомлений</h1>
            <p class="lead">Здесь вы можете посмотреть все ваши действия на сервисе.</p>
        </div>

        <main role="main" class="container">

            <div class="alert alert-info text-center" role="alert" v-if="getNotifications.length < 1">
                У вас еще нет ни одного уведомления.
            </div>

            <div class="my-3 p-3 bg-white rounded shadow-sm" v-if="getNotifications.length > 0">
                <h6 class="border-bottom border-gray pb-2 mb-0">Список уведомлений</h6>

                <div class="media text-muted pt-3" v-bind:key="notification.id" v-for="notification in getNotifications">
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
    import { mapGetters, mapMutations } from 'vuex';
    import store from "../store";
    import { make_notification_titles } from "../utils";
    import { formatDate } from "../utils";

    export default {
        name: 'Notifications',
        data(){
            return{}
        },
        filters: {
            formatDate: function (value) {
                return formatDate(value)
            }
        },
        computed: {
            ...mapGetters(['getNotifications']),
        },
        methods: {
            ...mapMutations(['setNotifications', 'removeNotification', 'removeActivities']),
            notification_title(notification){
                return make_notification_titles(notification)
            },
            notification_hide(id){
                store.dispatch('deleteNotification', id)
                    .then(response => {
                        let notificationId = response['id'];
                        this.removeNotification(notificationId);
                        this.removeActivities(notificationId);

                        this.$notify({
                            group: 'foo', title: 'Страница Уведомлений',
                            type: 'success', text: 'Уведомление было успешно скрыто, больше вы его не увидите'
                        });
                    })
                    .catch(err => {
                        this.$notify({
                            group: 'foo', title: 'Страница Уведомлений',
                            type: 'danger', text: 'Произошла неизвестная ошибка, попробуйте попозже'
                        });
                    })
            },
        },
        async beforeRouteEnter(to, from, next){
            try {
                let response = store.dispatch('notifications');
                next(vm => {
                    vm.setNotifications(response);
                })
            } catch (e) {
                this.$notify({
                    group: 'foo', title: 'Страница Уведомлений',
                    type: 'danger', text: 'Произошла неизвестная ошибка, попробуйте попозже'
                });
            }
        },
    }
</script>

<style scoped>
</style>
