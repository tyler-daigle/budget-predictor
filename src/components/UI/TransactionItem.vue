<template>
  <div class="transaction-item-container">
    <h3 class="transaction-name">{{ transactionData.name }}</h3>
    <span class="transaction-amount transaction-data"
      >Amount: {{ transactionData.amount }}</span
    >
    <span class="transaction-frequency transaction-data"
      >Frequency: {{ transactionData.frequency }}</span
    >
  </div>
</template>

<script>
export default {
  emits: ["transaction-click"],
  props: {
    transactionData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.transaction-name {
  text-align: center;
  margin: 0;
}
.transaction-data {
  display: block;
}
.transaction-item-container {
  border: solid 1px var(--secondary-color);
  margin-bottom: 1rem;
  padding: 1rem;
  cursor: pointer;
}

.transaction-item-container:hover {
  background-color: var(--secondary-color);
}
</style>