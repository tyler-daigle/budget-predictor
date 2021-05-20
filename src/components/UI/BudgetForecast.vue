<template>
  <div class="budget-forecast-container">
    <!-- <h2>Budget Forecast</h2>
    <p>There are {{ numTransactions }} items in the list</p>
    <p>The Starting value is {{ startingValue }}</p>
    <ul>
      <li v-for="(amount, idx) in forecast" :key="idx">
        {{ idx }}: {{ amount }}
      </li>
    </ul> -->
    <forecast-chart :forecastData="forecast" />
  </div>
</template>

<script>
import { forecastBudget } from "../../utils/calculate";
import ForecastChart from "./ForecastChart";

export default {
  components: {
    ForecastChart,
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
      return forecastBudget(this.transactionList);
    },
  },
};
</script>