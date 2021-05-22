<template>
  <section class="forecast-list-container">
    <h2 class="section-header">Your Forecast For The Year</h2>
    <ul>
      <li v-for="(amount, index) in forecast" :key="amount * index">
        <span class="month">{{ months[index] }}</span>
        <span class="amount" :class="amount < 0 ? 'negative' : 'positive'"
          >{{ currencyPrefix }}{{ amount.toFixed(2) }}</span
        >
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    forecast: {
      type: Array,
      required: true,
    },
    currencyPrefix: {
      type: String,
      required: false,
      default() {
        return "$";
      },
    },
  },
  data() {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
};
</script>

<style scoped>
.forecast-list-container {
  margin-left: 1rem;
  padding-right: 1rem;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  border-bottom: dashed 1px #c9c9f5;
  justify-content: space-between;
}
.month {
}

.amount {
  display: inline-block;
}

.positive {
  color: blue;
}

.negative {
  color: red;
}
</style>