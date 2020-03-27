<template>
    <div class="card" v-if="isPaid === false && isAuthenticated" style="width: 18rem;">
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
            <h3 class="card-title pricing-card-title">₽{{subscription.price}} <small class="text-muted">/ мес</small></h3>
            <ul class="list-unstyled mt-3 mb-4">
              <li>{{ priceValue(subscription.limits.numberOfPhotos) }}</li>
              <li>{{subscription.limits.numberOfAlbums}} альбомов</li>
            </ul>
            <a href="#" @click="_payPlan(plan.id)" class="btn btn-outline-primary">Продолжить оплату</a>
        </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { priceFiller } from "../utils";
  export default {
      name: 'SubscriptionCompleteCard',
      computed: {
          ...mapGetters(['isPaid', 'subscription', 'plan', 'isAuthenticated']),
      },
      methods: {
          ...mapActions(['payPlan', 'getProfile', 'deleteSubscription']),
          priceValue: function (value) {
              return priceFiller(value)
          },
          changePlan: function () {

          },
          _payPlan: async function (plan_id) {
              try{
                  let response = await this.payPlan(plan_id);
                  await this.getProfile();
              }
              catch (e) {
                  this.$notify({
                      group: 'foo',
                      title: 'Оплата тарифного плана',
                      type: 'danger',
                      text: 'Произошла ошибка при оплате тарифного плана, попробуйте позже'
                  });
              }

          },
          _deleteSubscription: async function(){
              try{
                  await this.deleteSubscription();
                  await this.getProfile();
              }
              catch (e) {
                  this.$notify({
                      group: 'foo',
                      title: 'Оплата тарифного плана',
                      type: 'danger',
                      text: 'Произошла ошибка при отпключении тарифного плана, попробуйте позже'
                  });
              }
          },
      }
  }

</script>

<style scoped>

</style>
