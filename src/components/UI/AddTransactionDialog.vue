<template>
  <dialog class="add-transaction-dialog" open>
    <h2 class="dialog-title" v-if="transactionData">Edit Transaction</h2>
    <h2 class="dialog-title" v-else>Create a new Transaction</h2>
    <div class="add-transaction-form-container">
      <div class="form-control">
        <label for="transaction-name">Transaction Name:</label>
        <input
          type="text"
          name="transaction-name"
          placeholder="Transaction Name"
          v-model="transactionName"
        />
      </div>

      <div class="form-control">
        <label for="transaction-amount">Transaction Amount:</label>
        <input
          type="number"
          name="transaction-amount"
          placeholder="Transaction Amount"
          v-model="transactionAmount"
        />
      </div>

      <div class="form-control">
        <label for="transaction-frequency">Transaction Frequency:</label>
        <input
          type="text"
          name="transaction-frequency"
          placeholder="Transaction Frequency"
          v-model="transactionFrequency"
        />
      </div>

      <div class="form-control">
        <button type="button" @click="addTransaction">
          {{ buttonAction }}
        </button>
        <button type="button" @click="$emit('close-dialog')">Cancel</button>
      </div>
    </div>
  </dialog>
</template>

<script>
import frequencies from "../../utils/frequencies";
import getNextId from "../../utils/id";

// TODO: Make a radio button so you can select between Income or Expense
// TODO: Turn the frequency into a select list
export default {
  emits: ["add-transaction", "edit-transaction", "close-dialog"],
  props: {
    // transactionData will be set if the user clicks on one of the items in
    // the transaction list - allowing them to edit the transaction
    transactionData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      transactionName: this.transactionData ? this.transactionData.name : "",
      transactionAmount: this.transactionData
        ? this.transactionData.amount
        : "",
      transactionFrequency: this.transactionData
        ? this.transactionData.frequency
        : "",
    };
  },
  computed: {
    buttonAction() {
      if (this.transactionData) {
        return "Edit Transaction";
      } else {
        return "Add Transaction";
      }
    },
  },
  methods: {
    addTransaction() {
      let transaction = {
        name: this.transactionName,
        amount: Number.parseFloat(this.transactionAmount),
        frequency: this.transactionFrequency,
      };

      if (this.transactionData) {
        transaction.id = this.transactionData.id;
        this.$emit("edit-transaction", transaction);
      } else {
        transaction.id = getNextId();
        this.$emit("add-transaction", transaction);
      }
    },
  },
};
</script>

<style scoped>
.add-transaction-dialog {
  border: solid 1px var(--secondary-color);
  box-shadow: 3px 3px 10px var(--dark-color);
}

.dialog-title {
  text-align: center;
  margin: 0;
}

.form-control {
  margin: 0.5rem 0.5rem;
  display: flex;
}

.form-control button {
  flex: 1;
  margin: 1rem 0.5rem 0;
}
label {
  flex: 1;
  margin-right: 1rem;
}
input {
  flex: 1;
  font-family: inherit;
}
</style>