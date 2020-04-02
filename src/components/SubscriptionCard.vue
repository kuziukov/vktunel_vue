<template>
    <div>
        <div :class="isLimitReached(getTasks, subscription) ? 'card border-danger' : 'card'" v-if="isPaid === true && isAuthenticated" style="width: 18rem;">
            <div class="card-body">
                <h4 class="card-title">
                    {{subscription.title}}
                    <a type="button" data-toggle="modal" class="close" data-dismiss="modal" aria-label="Close" data-target="#exampleModalCenter">
                        <span aria-hidden="true">&times;</span>
                    </a>
                </h4>
                <p class="card-text">
                    {{subscription.desc}}
                </p>
                <h3 class="card-title pricing-card-title">{{getTasks.length}} <small class="text-muted">/ {{subscription.limits.numberOfAlbums}} альбомов</small></h3>
                <ul class="list-unstyled mt-3 mb-4">
                    <li>{{ priceValue(subscription.limits.numberOfPhotos) }}</li>
                </ul>
            </div>
            <div class="card-footer">
                <small class="text-muted">Активно до {{ plan.expired_on | formatDate }}</small>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Подписка</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img src="/icons/StatusWarning.png" alt="">
                        <p class="pt-3">Вы нажали на кнопку отмены подписки, если вы сделали это случайно, закройте это окно.</p>
                        <span>В случае отмены подписки, <b>деньги за оставшееся время</b> возвращены не будут.</span>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Закрыть</button>
                        <button @click="_deleteSubscription()" type="button" data-dismiss="modal" class="btn btn-outline-primary">Отписаться</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import {formatDate, priceFiller} from "../utils";
  export default {
      name: 'SubcriptionCard',
      computed: {
          ...mapGetters(['isPaid', 'subscription', 'getTasks', 'plan', 'isAuthenticated']),
      },
      async created() {
          if (this.isAuthenticated)
              await this.tasks();
      },
      methods: {
          ...mapActions(['tasks', 'deleteSubscription', 'getProfile']),
          isLimitReached: function(tasks, subscription){
              return tasks.length === subscription.limits.numberOfAlbums;
          },
          priceValue: function (value) {
              return priceFiller(value)
          },
          _deleteSubscription: async function(){
              try{
                  let response = await this.deleteSubscription();
                  await this.getProfile();

                  if (response){
                      this.$notify({
                          group: 'foo',
                          title: 'Тарифный план',
                          type: 'success',
                          text: 'Вы успешно отключили тарифный план '
                      });
                  }
              }
              catch (e) {
                  this.$notify({
                      group: 'foo',
                      title: 'Тарифный план',
                      type: 'danger',
                      text: 'Произошла ошибка при отключении тарифного плана, попробуйте позже'
                  });
              }
          },
      },
      filters: {
          formatDate: function (value) {
              return formatDate(value)
          }
      },
  }

</script>

<style scoped>

</style>
