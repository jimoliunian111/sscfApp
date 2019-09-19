import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions'
import * as getters from './getters'
import toast from './modules/toast';
import placeholder from './modules/placeholder'


Vue.use(Vuex);

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    toast,
    placeholder
  }
});
