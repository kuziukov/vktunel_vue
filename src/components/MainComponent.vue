<template>
<div class="container">
  <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Загрузка альбома сообщества по ссылке</h1>
      <p class="lead">Укажите ссылку на сообщество и мы загрузим его для вас.</p>
    </div>

    <div class="alert alert-danger" v-if="error">
        {{error}} <a href="#">Вернуться</a>
    </div>

    <form class="needs-validation" role="form" method="POST" v-if="!error">
        <div class="form-group has-search">
            <span class="fa fa-search form-control-feedback"></span>
            <form class="needs-validation" role="form" method="POST">
                <div class="form-group has-search">
                    <span class="fa fa-search form-control-feedback"></span>
                    <input class="form-control" id="search" name="search" placeholder="https://vk.com/fest" type="text" value="">
                    
                </div>
                <input id="csrf_token" name="csrf_token" type="hidden" value="ImIwNGVkOTdlMzU3Y2I1MWZhMTBlZGNiMDY1NWU5NGY2Mzc2OTJmNWIi.XSWvwg.SsGjqYxFEGk2rK79rju4-araBTw">
            </form>
        </div>

    </form>


  <footer class="my-5 pt-5 text-muted text-center text-small">
    <p class="mb-1">© 2019 VK Tunel</p>
  </footer>
</div>

</template>

<script>
export default {
    name: 'Main',
    data(){
        return{
            error: null,
        }
    },
}
</script>

<style scoped>
    .main {
        width: 50%;
        margin: 50px auto;
    }

    .has-search .form-control {
        padding-left: 2.375rem;
    }

    .has-search .form-control-feedback {
        position: absolute;
        z-index: 2;
        display: block;
        width: 2.375rem;
        height: 2.375rem;
        line-height: 2.375rem;
        text-align: center;
        pointer-events: none;
        color: #aaa;
    }
</style>
