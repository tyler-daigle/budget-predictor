import {createApp} from "vue";
import {createWebHashHistory, createRouter} from "vue-router";

import App from './App.vue'
import WelcomePage from "./pages/WelcomePage";
import BudgetPage from "./pages/BudgetPage";


const routes = [
  {path: "/", component: WelcomePage},
  {path: "/budget", component: BudgetPage}
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});


const app = createApp(App);
app.use(router);
app.mount("#app");

