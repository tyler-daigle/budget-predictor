<template>
  <div class="budget-forecast-container">
    <forecast-list :forecast="forecast" />
    <transaction-totals :transactionList="transactionList" />
  </div>
</template>

<script>
/*
  <BudgetForecast> component is just a container for the forecast
  components. This component takes the transactionList that is 
  created in <App> and calls the method forecastBudget() on the
  transactionList.

  forecastBudget() returns a 12 element array, 1 element for each month.
  Each element will contain the amount of money the user will have that
  month after executing the transactions that they have added in the
  <TheTransactionTable> component.
*/
import { forecastBudget } from "../../utils/calculate";
import ForecastList from "./ForecastList.vue";
import TransactionTotals from "./TransactionTotals";

export default {
  components: {
    TransactionTotals,
    ForecastList,
  },
  props: {
    transactionList: {
      type: Object,
      required: true,
    },
    startingValue: {
      type: Number,
      required: false,
      default() {
        return 0;
      },
    },
  },
  computed: {
    numTransactions() {
      return this.transactionList.count;
    },
    forecast() {
      return forecastBudget(this.transactionList, 0);
    },
  },
};
</script>

<style scoped>
.budget-forecast-container {
}
</style>