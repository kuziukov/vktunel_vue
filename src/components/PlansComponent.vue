<template>

  <section id="pricing" class="pricing section-bg">
    <div class="container">
      <div class="row">

        <div :class="plans[0] === plan ? 'col-lg-3 col-md-6' : 'col-lg-3 col-md-6 mt-4 mt-md-0'" v-bind:key="plan.id" v-for="plan in plans">
          <div :class="plans[1] === plan ? 'box featured' : 'box'">
            <span class="advanced" v-if="plans[3] === plan">Безлимит</span>
            <h3>{{plan.title}}</h3>
            <h4><sup>₽</sup>{{plan.price}}<span> / мес</span></h4>
            <ul>
              <li>
                {{textOfNumberPhotos(plan.limits.numberOfPhotos)}}
              </li>
              <li>
                {{plan.limits.numberOfAlbums}} альбомов
              </li>
            </ul>
            <div class="btn-wrap">
              <a href="#" v-if="plans[0] === plan" @click="isAuthenticated ? changePlan(plan.id) : login(plan.id)" class="btn-buy">Присоединиться</a>
              <a href="#" v-if="plans[0] !== plan" class="btn-buy">Не доступно</a>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>



</template>

<script>
  import { oauthAuthorizationLink, planNumberOfPhotos } from '../utils'
  import { mapGetters, mapActions } from 'vuex';
  import router from "../router";

  export default {
    name: 'Plans',
    data() {
      return {
        plans: [],
      }
    },
    methods: {
      ...mapActions(['getPlans', 'choosePlan', 'getProfile']),
      login: async function (id) {
        window.location = oauthAuthorizationLink();
      },
      changePlan: async function (id) {
        try{
          await this.choosePlan(id);
          await this.getProfile();

          this.$notify({
            group: 'foo',
            title: 'Тарифный план',
            type: 'success',
            text: 'Вы успешно подключили тарифный план'
          });

          router.push('/');
        }
        catch (e) {
          this.$notify({
            group: 'foo',
            title: 'Тарифный план',
            type: 'danger',
            text: 'Произошла критическая ошибка, пожалуйста попробуйте позднее'
          });
        }

      },
      textOfNumberPhotos: function (numberOfPhotos) {
          return planNumberOfPhotos(numberOfPhotos)
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
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
          text: 'Нам не удалось подгрузить тарифные планы, попробуйте повторить позднее'
        });
      }


    }
  }

</script>

<style scoped>
  section {
    padding: 10px 0;
    overflow: hidden;
  }

  .section-bg {
    background-color: #f7f8f9;
  }

  .section-title h2 {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
    padding-bottom: 0;
    font-family: "Poppins", sans-serif;
    color: #627680;
  }

  .section-title p {
    margin-bottom: 0;
  }

  .pricing .box {
    padding: 10px;
    background: #fff;
    text-align: center;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    border: 2px solid #e9ecee;
  }

  .pricing h3 {
    font-weight: 600;
    padding: 20px 15px;
    font-size: 18px;
    color: #777777;
  }

  .pricing h4 {
    font-size: 36px;
    color: #009cea;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    margin-bottom: 20px;
  }

  .pricing h4 sup {
    font-size: 20px;
    top: -15px;
    left: -3px;
  }

  .pricing h4 span {
    color: #bababa;
    font-size: 16px;
    font-weight: 300;
  }

  .pricing ul {
    padding: 0;
    list-style: none;
    color: #444444;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
  }

  .pricing ul li {
    padding-bottom: 16px;
  }

  .pricing ul i {
    color: #009cea;
    font-size: 18px;
    padding-right: 4px;
  }

  .pricing ul .na {
    color: #ccc;
    text-decoration: line-through;
  }

  .pricing .btn-wrap {
    padding: 20px 15px;
    text-align: center;
  }

  .pricing .btn-buy {
    background: #009cea;
    display: inline-block;
    padding: 8px 30px;
    border-radius: 4px;
    color: #fff;
    font-size: 13px;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    text-transform: uppercase;
  }

  .pricing .featured {
    background: #009cea;
    border-color: #009cea;
  }

  .pricing .featured h3, .pricing .featured h4, .pricing .featured h4 span, .pricing .featured ul, .pricing .featured ul .na {
    color: #fff;
  }

  .pricing .featured .btn-buy {
    background: #fff;
    color: #009cea;
  }

  .pricing .advanced {
    width: 200px;
    position: absolute;
    top: 18px;
    right: -68px;
    transform: rotate(45deg);
    z-index: 1;
    font-size: 14px;
    padding: 1px 0 3px 0;
    background: #009cea;
    color: #fff;
  }
</style>
