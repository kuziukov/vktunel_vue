<template>
<div>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Список альбомов</h1>
        <p class="lead">Посмотрите ниже и вы увидите список доступных для загрузки альбомов. Нажмите на кнопку «Добавить в (Загрузить)», чтобы добавить альбом в список на загрузку. Всегда рад помочь :)</p>
    </div>

    <main role="main" class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Сообщество</a></li>
                <li class="breadcrumb-item"><a href="#">Название Сообщества</a></li>
                <li class="breadcrumb-item active" aria-current="page">Название альбома</li>
            </ol>
        </nav>

            <div class="alert alert-warning text-center" role="alert">
                Простите, но, похоже, у вас нет доступа к этому альбому. Нам очень жаль, <a href="#">вернуться</a>
            </div>

            <div class="my-3 p-3 bg-white rounded shadow-sm">
                <h6 class="border-bottom border-gray pb-2 mb-0">Список доступных вам альбомов</h6>

                
                    <div class="media text-muted pt-3">
                        <img src="#" alt="..." class="bd-placeholder-img mr-2 rounded" width="32" height="32">
                        <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                            <div class="d-flex justify-content-between align-items-center w-100">
                                <strong class="text-gray-dark">Название альбома</strong>
                                <a href="#">Добавить в (Загрузить)</a>
                            </div>
                            <span class="d-block">Фотографий в альбоме: 1000. Дата создания альбома: 01.01.2018 23:11</span>
                        </div>
                    </div>
     

                <small class="d-block text-right mt-3">
                    <a href="#">All suggestions</a>
                </small>
            </div>



    </main>
</div>
</template>

<script>
export default {
  name: 'Albums',
  data(){
    return{
      albums: [],
      error:null,
    }
  },
  methods: {
    setData (err, albums) {
      if (err) {
        this.error = err.toString()
      } else {
        this.albums = albums
      }
    }
  },
  beforeRouteEnter(to, from, next){

      console.log(this.$route.params)
    console.log(this.$router.query)

    axios.get('http://localhost:5000/v1.0/community/<string:community_id>/albums')
          .then(resp => {
            if ('code' in resp.data && resp.data['code'] == 200){
              next(vm => vm.setData(null, resp.data.result.items))
            }
          })
          .catch(err => {
            next(vm => vm.setData(err, null))
          })   
  },
  mounted: function () {
      
  }
}
</script>

<style scoped>

</style>
