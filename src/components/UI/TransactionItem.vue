<template>
  <tr class="transaction-item-row">
    <td class="transaction-name">{{ transactionData.name }}</td>
    <td class="transaction-amount transaction-data">
      {{ transactionData.amount }}
    </td>
    <td class="transaction-frequency transaction-data">
      {{ transactionData.frequency }}
    </td>
    <td class="transaction-type transaction-data">
      {{ transactionData.type }}
    </td>
  </tr>
</template>

<script>
export default {
  emits: ["transaction-click"],
  props: {
    transactionData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.transaction-name {
  font-weight: bold;
  padding-left: 1rem;
}
.transaction-data {
  padding: 0.5rem;
}
.transaction-item-row {
  border: solid 1px var(--secondary-color);
  cursor: pointer;
}

tr:nth-child(odd) {
  background-color: var(--primary-color);
}

.transaction-item-row:hover {
  background-color: var(--secondary-color);
}
</style>