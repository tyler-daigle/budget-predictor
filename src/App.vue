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
        <the-transaction-table
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
import TheTransactionTable from "./components/UI/TheTransactionTable";

export default {
  components: {
    TheHeader,
    AddTransactionDialog,
    MainContainer,
    TheTransactionTable,
  },
  data() {
    // income type: {id: 0, name: "Whatever", amount: 324.33, frequency:"daily | weekly | biweekly | monthly | Date()" }
    // expense type: {id: 0, name: "", amount: -122.32, frequency: "daily | weekly | biweekly | monthly | Date()" }
    // since they are both the same they could just be called "transactions" and just make the amount of the
    // expenses negative and the income positive.

    return {
      transactions: [
        {
          id: 200,
          name: "Salary",
          amount: 1324.33,
          frequency: "weekly",
          type: "expense",
        },
        {
          id: 201,
          name: "Cat Food",
          amount: 19.12,
          frequency: "weekly",
          type: "income",
        },
        {
          id: 202,
          name: "Car Payment",
          amount: 369.99,
          frequency: "monthly",
          type: "expense",
        },
        {
          id: 203,
          name: "Mortgage",
          amount: 1788.27,
          frequency: "monthly",
          type: "expense",
        },
        {
          id: 204,
          name: "Rental Income",
          amount: 600.0,
          frequency: "monthly",
          type: "income",
        },
      ],
      dialogVisible: false,
      transactionToEdit: null,
    };
  },
  methods: {
    addTransaction(transaction) {
      this.transactions.push(transaction);
      this.closeDialog();
    },
    editTransaction(transaction) {
      // replaces the edited transaction with the new one.
      this.transactions = this.transactions.map((t) => {
        if (t.id === transaction.id) {
          return transaction;
        } else {
          return t;
        }
      });
      this.closeDialog();
    },
    // displayAddTransActionDialog() is the handler for when the "Add Transaction" button is pressed.
    // It shows the dialog and allows the user to enter a new transaction.
    displayAddTransactionDialog() {
      this.showDialog();
    },

    // displayEditTransactionDialog() is the handler for when one of the items in the transaction
    // list is clicked. It sets the transactionToEdit variable to reference the transaction which
    // is sent to the AddTransactionDialog so that the form is prepopulated with the information
    // from the already entered transaction. The user can then edit the transaction.
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
  /* color: var(--text-color); */
  color: black;
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
