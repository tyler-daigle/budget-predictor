<template>
  <div>
    <div v-if="overlayVisible" class="focus-overlay"></div>
    <the-header />
    <main-container>
      <template v-slot:left-side>
        <add-transaction-dialog
          v-if="dialogVisible"
          @close-dialog="closeDialog"
          @add-transaction="addTransaction"
          @edit-transaction="editTransaction"
          @delete-transaction="deleteTransaction"
          :transactionData="transactionToEdit"
        />
        
        <button id="add-transaction-button" type="button" @click="displayAddTransactionDialog">
          Add Transaction
        </button>

        <the-transaction-table
          :transactions="transactions"
          @transaction-click="displayEditTransactionDialog"
        />

        <div v-if="transactions.length === 0" class="demo-instructions">
          <p>
            If you would like to load some data to view a demo, click the <strong>Load Demo</strong> button.
          </p>
          <button type="button" id="load-demo-button" @click="loadDemoData">Load Demo</button>
        </div>
      </template>

      <template v-slot:right-side>
        <budget-forecast
          v-if="transactionList.count !== 0"
          :transactionList="transactionList"
          :startingValue="0"
        />
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

import BudgetForecast from "./components/UI/BudgetForecast";

export default {
  components: {
    TheHeader,
    AddTransactionDialog,
    MainContainer,
    TheTransactionTable,
    BudgetForecast,
  },  
  data() {
    return {
      transactionList: new TransactionList(),
      dialogVisible: false,
      transactionToEdit: null,
      overlayVisible: false,
    };
  },
  computed: {
    transactions() {
      console.log("Changing...");
      return this.transactionList.getAll();
    },
  },
  methods: {
    loadDemoData() {
      const transactions = [
        {               
          name: "Groceries",
          amount: 91.25,
          frequency: Transaction.frequencies.weekly,
          type: Transaction.types.expense,
        },
        {
          name: "Car Payment",
          amount: 369.99,
          frequency: Transaction.frequencies.monthly,
          type: Transaction.types.expense,
        },
        {
          name: "Mortgage",
          amount: 1788.27,
          frequency: Transaction.frequencies.monthly,
          type: Transaction.types.expense,
        },
        {
          name: "Rental Income",
          amount: 600.0,
          frequency: Transaction.frequencies.monthly,
          type: Transaction.types.income,
        },
        {
          name: "Salary",
          amount: 530.00,
          frequency: Transaction.frequencies.weekly,
          type: Transaction.types.income,
        }
      ];
      transactions.forEach((t) =>
        this.transactionList.add(
          new Transaction(t.name, t.amount, t.frequency, t.type)
        )
      );
    },
    addTransaction(transaction) {
      this.transactionList.add(transaction);
      this.closeDialog();
    },
    editTransaction(transaction) {
      this.transactionList.updateTransaction(transaction);
      this.closeDialog();
    },
    deleteTransaction(transaction) {
      console.log(`Deleting transaction ${transaction.name}`);
      this.transactionList.deleteTransaction(transaction);
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
      if (!this.dialogVisible) {
        const transaction = this.transactionList.getTransaction({ id: id });
        this.transactionToEdit = transaction;
        this.showDialog();
      }
    },
    showDialog() {
      this.dialogVisible = true;
      this.overlayVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.overlayVisible = false;
      this.transactionToEdit = null;
    },
  },
};
</script>

<style>
:root {
  /* --text-color: #2f3e46;
  --primary-color: #84a98c;
  --secondary-color: #cad2c5;
  --dark-color: #354f52; */

  --text-color: #2f3e46;
  --primary-color: #86b5d0;
  --secondary-color: #688daf;
  --dark-color: #285675;
}

.demo-instructions {
  background-color: #b1eeb1;
  padding: 1rem;
  margin: 2rem 0;
  color: var(--text-color);
  font-size: .85rem;
  border: solid 1px #a6d4a6;
}

.focus-overlay {
  width: 100%;
  height: 100%;
  background-color: #e9eef0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 100%;
  right: 100%;
  opacity: 0.8;
}

body {
  margin: 0;
  box-sizing: border-box;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  /* color: var(--text-color); */
  color: black;
}

#load-demo-button {
  background-color: #3ba53b;
  border: solid 1px #6bc06b;
}

#add-transaction-button {
  margin-top: 1rem;
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

.section-header {
  border-bottom: solid 2px black;
}
</style>
