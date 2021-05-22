<template>
  <dl>
    <dt>{{ prefix }} Income:</dt>
    <dd class="income">{{ currencyPrefix }}{{ income.toFixed(2) }}</dd>
    <dt>{{ prefix }} Expense:</dt>
    <dd class="expense">{{ currencyPrefix }}{{ expense.toFixed(2) }}</dd>
  </dl>
</template>

<script>
export default {
  props: {
    prefix: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
    expense: {
      type: Number,
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
};
</script>

<style scoped>
dl {
  font-size: 0.85rem;
  /* background-color: #e7e3e3; */
  margin-top: 1rem;
  margin: 0;
  padding: 0;
}

dt {
  font-weight: bold;
}

dd {
  margin: 0;
  margin-bottom: 0.5rem;
}
.income {
  color: blue;
}

.expense {
  color: #be3939;
}
</style>