<template>
  <div>
    <!-- <welcome-page v-if="welcomeVisible" />
    <budget-page v-else/>     -->
    <router-view></router-view>
  </div>
</template>

<script>
// import BudgetPage from "./pages/BudgetPage.vue";
// import WelcomePage from "./pages/WelcomePage.vue";

export default {
  components: {
    // BudgetPage,
    // WelcomePage
  },
  data() {
    return {
      welcomeVisible: true
    }
  },
  created() {
    document.title = "Budget Predictor";
  }
}
</script>

<style>

</style>