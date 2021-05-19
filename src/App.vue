<template>
  <div>
    <the-header />
    <main-container>
      <template v-slot:left-side>
        <the-budget-form @add-transaction="addTransaction" />
      </template>

      <template v-slot:right-side>
        <h2>This is the right</h2>
        <the-transaction-list :transactions="transactions" />
      </template>
    </main-container>
  </div>
</template>

<script>
import frequencies from "./utils/frequencies";

import MainContainer from "./components/layout/MainContainer";

import TheHeader from "./components/UI/TheHeader";
import TheBudgetForm from "./components/UI/TheBudgetForm";
import TheTransactionList from "./components/UI/TheTransactionList";

export default {
  components: {
    TheHeader,
    TheBudgetForm,
    MainContainer,
    TheTransactionList,
  },
  data() {
    // income type: {id: 0, name: "Whatever", amount: 324.33, frequency:"daily | weekly | biweekly | monthly | Date()" }
    // expense type: {id: 0, name: "", amount: -122.32, frequency: "daily | weekly | biweekly | monthly | Date()" }
    // since they are both the same they could just be called "transactions" and just make the amount of the
    // expenses negative and the income positive.

    return {
      transactionId: 100,
      transactions: [],
    };
  },
  methods: {
    addTransaction(transaction) {
      transaction.id = this.nextId();
      console.log(transaction);
      this.transactions.push(transaction);
    },
    nextId() {
      let id = this.transactionId;
      this.transactionId++;
      return id;
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
}
</style>
