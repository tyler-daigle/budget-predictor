<template>
  <section class="transaction-totals-container">
    <header>
      <h2 class="section-header">Transactions Summary</h2>
    </header>

    <div class="transaction-container">
      <span class="transaction-data">
        <h3>Total Transactions: {{ transactions.total.count }}</h3>
        <income-expense-list
          :prefix="'Total'"
          :income="transactions.total.income"
          :expense="transactions.total.expense"
        />
      </span>

      <span class="transaction-data">
        <h3>Monthly Transactions: {{ transactions.monthly.count }}</h3>
        <income-expense-list
          :prefix="'Monthly'"
          :income="transactions.monthly.income"
          :expense="transactions.monthly.expense"
        />
      </span>

      <span class="transaction-data">
        <h3>Weekly Transactions: {{ transactions.weekly.count }}</h3>
        <income-expense-list
          :prefix="'Weekly'"
          :income="transactions.weekly.income"
          :expense="transactions.weekly.expense"
        />
      </span>

      <span class="transaction-data">
        <h3>Daily Transactions: {{ transactions.daily.count }}</h3>
        <income-expense-list
          :prefix="'Daily'"
          :income="transactions.daily.income"
          :expense="transactions.daily.expense"
        />
      </span>

      <span class="transaction-data">
        <h3>Biweekly Transactions: {{ transactions.biweekly.count }}</h3>
        <income-expense-list
          :prefix="'Biweekly'"
          :income="transactions.biweekly.income"
          :expense="transactions.biweekly.expense"
        />
      </span>

      <span class="transaction-data">
        <h3>Yearly Transactions: {{ transactions.yearly.count }}</h3>
        <income-expense-list
          :prefix="'Yearly'"
          :income="transactions.yearly.income"
          :expense="transactions.yearly.expense"
        />
      </span>
    </div>
  </section>
</template>

<script>
import IncomeExpenseList from "./IncomeExpenseList";
import { Transaction } from "../../classes/Transaction";

export default {
  components: {
    IncomeExpenseList,
  },
  props: {
    transactionList: {
      type: Object,
      required: true,
    },
  },
  computed: {
    transactions() {
      const all = this.transactionList.getAll();

      const monthly = this.transactionList.getTransactionsByFrequency(
        Transaction.frequencies.monthly
      );
      const weekly = this.transactionList.getTransactionsByFrequency(
        Transaction.frequencies.weekly
      );
      const daily = this.transactionList.getTransactionsByFrequency(
        Transaction.frequencies.daily
      );
      const yearly = this.transactionList.getTransactionsByFrequency(
        Transaction.frequencies.yearly
      );
      const biweekly = this.transactionList.getTransactionsByFrequency(
        Transaction.frequencies.biweekly
      );

      const incomeAcc = (acc, v) => {
        if (v.type === Transaction.types.income) {
          return acc + v.amount;
        } else {
          return acc;
        }
      };

      const expenseAcc = (acc, v) => {
        if (v.type === Transaction.types.expense) {
          return acc + v.amount;
        } else {
          return acc;
        }
      };

      return {
        total: {
          count: all.length,
          income: all.reduce(incomeAcc, 0),
          expense: all.reduce(expenseAcc, 0),
        },
        weekly: {
          count: weekly.length,
          income: weekly.reduce(incomeAcc, 0),
          expense: weekly.reduce(expenseAcc, 0),
        },
        monthly: {
          count: monthly.length,
          income: monthly.reduce(incomeAcc, 0),
          expense: monthly.reduce(expenseAcc, 0),
        },
        daily: {
          count: daily.length,
          income: daily.reduce(incomeAcc, 0),
          expense: daily.reduce(expenseAcc, 0),
        },
        yearly: {
          count: daily.length,
          income: daily.reduce(incomeAcc, 0),
          expense: daily.reduce(expenseAcc, 0),
        },
        biweekly: {
          count: biweekly.length,
          income: biweekly.reduce(incomeAcc, 0),
          expense: biweekly.reduce(expenseAcc, 0),
        },
      };
    },
  },
};
</script>

<style scoped>
.transaction-data {
  display: block;
  /* border: solid 1px black;
  border-radius: 5px; */
}
.transaction-totals-container {
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 0; */
  margin-left: 1rem;
}

h3 {
  font-size: 1rem;
  margin-bottom: 1rem;
  border-bottom: solid 1px black;
}
@media (max-width: 900px) {
}
</style>