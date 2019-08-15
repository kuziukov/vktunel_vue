import Vue from 'vue'
import Vuex from 'vuex'

import generalModule from './store/general'
import userModule from './store/user'
import communityModule from './store/community'
import utilsModule from './store/utils'
import tasksModule from './store/tasks'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        generalModule,
        userModule,
        communityModule,
        utilsModule,
        tasksModule
    }
})