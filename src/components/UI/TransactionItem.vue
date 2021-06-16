<template>
  <tr class="transaction-item-row">
    <td class="transaction-name">{{ transactionData.name }}</td>
    <td class="transaction-amount transaction-data">
      ${{ transactionData.amount.toFixed(2) }}
    </td>
    <td class="transaction-frequency transaction-data">
      {{ transactionData.frequency }}
    </td>
    <td class="transaction-type transaction-data" :style="typeStyle">
      {{ transactionData.type }}
    </td>
  </tr>
</template>

<script>
import { Transaction } from "../../classes/Transaction";
export default {
  emits: ["transaction-click"],
  props: {
    transactionData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    typeStyle() {
      if (this.transactionData.type === Transaction.types.expense) {
        return {
          color: "#be3939",
        };
      } else {
        return {
          color: "blue",
        };
      }
    },
  },
};
</script>

<style scoped>
.transaction-name {
  /* font-weight: bold; */
  padding-left: 1rem;
}
.transaction-amount {
  color: #224b22;
}
.transaction-data {
  padding: 0.25rem;
}
.transaction-item-row {
  border: solid 1px var(--secondary-color);  
  cursor: pointer;
}

tr:nth-child(odd) {
  background-color: var(--primary-color);
}

.transaction-item-row:hover {
  background-color: #edf1ab;  
}
.transaction-type {
  /* font-weight: bold; */
}
</style>