<template>
  <div>  
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  created() {
    document.title = "Budget Predictor";
  }
}
</script>

<style>

</style>