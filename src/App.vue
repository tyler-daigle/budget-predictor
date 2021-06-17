<template>
  <div>  
    <router-view></router-view>
  </div>
</template>

<script>

export default {
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