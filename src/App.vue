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
import { Transaction, TransactionList } from "./classes/Transaction";

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
  created() {
    // Just sample data
    const transactions = [
      {
        id: 200,
        name: "Salary",
        amount: 1324.33,
        frequency: Transaction.frequencies.weekly,
        type: Transaction.types.income,
      },
      {
        id: 201,
        name: "Cat Food",
        amount: 19.12,
        frequency: Transaction.frequencies.weekly,
        type: Transaction.types.income,
      },
      {
        id: 202,
        name: "Car Payment",
        amount: 369.99,
        frequency: Transaction.frequencies.weekly,
        type: Transaction.types.income,
      },
      {
        id: 203,
        name: "Mortgage",
        amount: 1788.27,
        frequency: Transaction.frequencies.weekly,
        type: Transaction.types.income,
      },
      {
        id: 204,
        name: "Rental Income",
        amount: 600.0,
        frequency: Transaction.frequencies.weekly,
        type: Transaction.types.income,
      },
    ];
    transactions.forEach((t) =>
      this.transactionList.add(
        new Transaction(t.name, t.amount, t.frequency, t.type)
      )
    );
  },
  data() {
    return {
      transactionList: new TransactionList(),
      dialogVisible: false,
      transactionToEdit: null,
    };
  },
  computed: {
    transactions() {
      console.log("Changing...");
      return this.transactionList.getAll();
    },
  },
  methods: {
    addTransaction(transaction) {
      this.transactionList.add(transaction);
      this.closeDialog();
    },
    editTransaction(transaction) {
      this.transactionList.updateTransaction(transaction);
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
      const transaction = this.transactionList.getTransaction({ id: id });
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
