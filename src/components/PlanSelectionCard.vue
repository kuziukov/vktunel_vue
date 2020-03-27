<template>
    <div class="card" v-if="isPaid === null && isAuthenticated">
        <div class="card-body">
            <h4 class="card-title">Тарифный план</h4>
            <p class="card-text">
                Вы не выбрали тарифный план, предлагаем вам ознакомиться с имеющимися у нас тарифными планами
            </p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" v-bind:key="plan.id" v-for="plan in plans">
                <a href="#" v-on:click="changePlan(plan.id)">{{plan.title}} (₽{{plan.price}})</a>
            </li>
        </ul>
        <div class="card-body">
            <router-link class="card-link" to="/plans">О тарифах</router-link>
        </div>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
      name: 'PlanSelectionCard',
      data(){
          return{
              plans: [],
          }
      },
      computed: {
          ...mapGetters(['isPaid', 'isAuthenticated']),
      },
      methods: {
          ...mapActions(['getPlans', 'choosePlan', 'getProfile']),
          changePlan: async function (id) {
              try{
                  let response = await this.choosePlan(id);
                  await this.getProfile();
              }
              catch (e) {
                  this.$notify({
                      group: 'foo',
                      title: 'Тарифный план',
                      type: 'danger',
                      text: 'Произошла критическая ошибка, пожалуйста попробуйте позднее'
                  });
              }

          }
      },
      async beforeMount() {
          try{
              let response = await this.getPlans();
              this.plans = response.data.result.items;
          }
          catch(e){
              this.$notify({
                  group: 'foo',
                  title: 'Тарифный план',
                  type: 'danger',
                  text: 'Произошла критическая ошибка, пожалуйста попробуйте позднее'
              });
          }


      }
  }

</script>

<style scoped>

</style>
