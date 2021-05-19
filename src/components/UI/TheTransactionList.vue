<template>
  <div class="transaction-list-container">
    <ul v-if="transactions.length !== 0" class="transaction-list">
      <li v-for="transaction in transactions" :key="transaction.name">
        <transaction-item :transactionData="transaction" />
      </li>
    </ul>
    <h2 v-else>Enter a new transaction</h2>
  </div>
</template>

<script>
import TransactionItem from "./TransactionItem";

export default {
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  components: {
    TransactionItem,
  },
};
</script>