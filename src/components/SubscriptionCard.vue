<template>
    <div class="card border-info" v-if="isPaid === true && isAuthenticated" style="width: 18rem;">
        <div class="card-body">
          <h4 class="card-title">
              {{subscription.title}}
              <a @click="_deleteSubscription()" type="button" class="close" data-dismiss="modal" aria-label="Close">
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
          await this.tasks();
      },
      methods: {
          ...mapActions(['tasks', 'deleteSubscription', 'getProfile']),
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
