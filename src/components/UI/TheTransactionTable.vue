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
    <section v-else class="instructions">
      <h2 class="section-header">Enter a new transaction</h2>
      <p>
        Use the <strong>Add Transaction</strong> button above to add a new transaction. 
      </p>

      <p>
         Each transaction can be either an expense or income. Some examples of transactions are:
      </p>
      <ul>
        <li>Car Payments</li>
        <li>Mortgage/Rent</li>
        <li>Your Salary</li>
        <li>The amount you spend each day on food.</li>
      </ul>      
      
      <p>
        As you add transactions they will appear in the transaction table. You can click on
        a transaction to edit or delete the transaction.
      </p>
    </section>
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
  box-shadow: 3px 3px 5px var(--secondary-color);
}
th {
  text-align: left;
  padding: 1rem 0.25rem;
  color: white;
}
th:first-child {
  padding-left: 1rem;
}
thead {
  border: solid 1px var(--secondary-color);
  background-color: var(--secondary-color);
}
</style>