<template>
  <div class="transaction-table-container">
    <table v-if="transactions.length !== 0" class="transaction-table">
      <thead>
        <tr>
          <th>Transaction Name</th>
          <th>Amount</th>
          <th>Frequency</th>
          <th>Type</th>
        </tr>
      </thead>
      <transaction-item
        v-for="transaction in transactions"
        :key="transaction.id"
        @click="transactionClicked(transaction.id)"
        :transactionData="transaction"
      />
    </table>
    <h2 v-else>Enter a new transaction</h2>
  </div>
</template>

<script>
// Maybe the transaction list should actually be a table with Edit and Delete links
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
  methods: {
    transactionClicked(id) {
      this.$emit("transaction-click", id);
    },
  },
};
</script>

<style scoped>
.transaction-table {
  margin-top: 1rem;
  border-collapse: collapse;
  width: 100%;
  font-size: 0.85rem;
}
th {
  text-align: left;
  padding: 1rem 0.25rem;
}
thead {
  background-color: var(--secondary-color);
}
</style>