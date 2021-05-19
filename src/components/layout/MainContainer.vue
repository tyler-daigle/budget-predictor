<template>
  <div class="main-container">
    <div class="container">
      <slot name="left-side"></slot>
    </div>

    <div class="container">
      <slot name="right-side"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.main-container {
  width: 70%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.container {
  margin-top: 1rem;
  padding: 1rem;
}

@media (max-width: 900px) {
  .main-container {
    display: block;
    width: 100%;
  }
}
</style>