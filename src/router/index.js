import Vue from "vue";
import VueRouter from "vue-router";
import main from "../components/main/main"

Vue.use(VueRouter);

export default new VueRouter({
  routes:[
    {
      path:"/",
      component:main
    }
  ]
})
