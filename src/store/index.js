import Vue from 'vue'
import Vuex from 'vuex'
import * as reminder from "@/store/modules/reminder.js";
import * as notification from "@/store/modules/notification.js";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    notification,
    reminder
  }
})
