<template>
  <div class="transaction-item-container">
    <h3>{{ transactionData.name }}</h3>
    <span class="transaction-amount">{{ transactionData.amount }}</span>
    <span class="transaction-frequency">{{ transactionData.frequency }}</span>
  </div>
</template>

<script>
export default {
  props: {
    transactionData: {
      type: Object,
      required: true,
    },
  },
};
</script>