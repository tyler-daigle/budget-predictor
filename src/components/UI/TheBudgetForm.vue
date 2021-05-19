<template>
  <div class="budget-form-container">
    <h2>Create a new Transaction</h2>
    <button type="button" @click="addTransaction">Add Transaction</button>
  </div>
</template>

<script>
import frequencies from "../../utils/frequencies";

export default {
  emits: ["add-transaction"],
  methods: {
    addTransaction() {
      const testData = {
        name: "Test Transaction",
        amount: 533.21,
        frequency: frequencies.weekly,
      };
      this.$emit("add-transaction", testData);
    },
  },
};
</script>

<style scoped>
</style>