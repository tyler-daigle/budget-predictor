<template>
  <div>
    <the-header />
    <main-container>
      <template v-slot:left-side>
        <add-transaction-dialog
          v-if="dialogVisible"
          @close-dialog="closeDialog"
          @add-transaction="addTransaction"
          @edit-transaction="editTransaction"
          :transactionData="transactionToEdit"
        />
        <button type="button" @click="displayAddTransactionDialog">
          Add Transaction
        </button>
        <the-transaction-list
          :transactions="transactions"
          @transaction-click="displayEditTransactionDialog"
        />
      </template>

      <template v-slot:right-side>
        <h2>This is the right</h2>
      </template>
    </main-container>
  </div>
</template>

<script>
import frequencies from "./utils/frequencies";

import MainContainer from "./components/layout/MainContainer";

import TheHeader from "./components/UI/TheHeader";
import AddTransactionDialog from "./components/UI/AddTransactionDialog";
import TheTransactionList from "./components/UI/TheTransactionList";

export default {
  components: {
    TheHeader,
    AddTransactionDialog,
    MainContainer,
    TheTransactionList,
  },
  data() {
    // income type: {id: 0, name: "Whatever", amount: 324.33, frequency:"daily | weekly | biweekly | monthly | Date()" }
    // expense type: {id: 0, name: "", amount: -122.32, frequency: "daily | weekly | biweekly | monthly | Date()" }
    // since they are both the same they could just be called "transactions" and just make the amount of the
    // expenses negative and the income positive.

    return {
      transactions: [],
      dialogVisible: false,
      transactionToEdit: null,
    };
  },
  methods: {
    addTransaction(transaction) {
      console.log(transaction);
      this.transactions.push(transaction);
      this.closeDialog();
    },
    editTransaction(transaction) {
      this.transactions = this.transactions.map((t) => {
        if (t.id === transaction.id) {
          return transaction;
        } else {
          return t;
        }
      });
      this.closeDialog();
    },
    displayAddTransactionDialog() {
      this.showDialog();
    },
    displayEditTransactionDialog(id) {
      const transaction = this.transactions.find((t) => t.id === id);
      this.transactionToEdit = transaction;
      this.showDialog();
    },
    showDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.transactionToEdit = null;
    },
  },
};
</script>

<style>
:root {
  --text-color: #2f3e46;
  --primary-color: #84a98c;
  --secondary-color: #cad2c5;
  --dark-color: #354f52;
}

body {
  margin: 0;
  box-sizing: border-box;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  color: var(--text-color);
}

button {
  font-family: inherit;
  font-size: 1rem;
  background-color: var(--primary-color);
  color: white;
  border: solid 1px var(--secondary-color);
  padding: 0.5rem 0.5rem;
}
button:hover {
  background-color: var(--dark-color);
}
</style>
