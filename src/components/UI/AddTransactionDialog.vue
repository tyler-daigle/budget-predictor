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
          required
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
        <option-selector
          name="transaction-frequency"
          v-model="transactionFrequency"
          :choices="frequencyChoices"
        />
      </div>

      <div class="form-control">
        <label for="transaction-type">Transaction Type:</label>
        <option-selector
          name="transaction-type"
          v-model="transactionType"
          :choices="transactionTypeChoices"
        />
      </div>

      <div class="form-control">
        <button type="button" @click="addTransaction">
          {{ buttonAction }}
        </button>
        <button type="button" @click="$emit('close-dialog')">Cancel</button>

        <button
          v-if="transactionData"
          type="button"
          @click="$emit('delete-transaction', transactionData)"
          class="delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  </dialog>
</template>

<script>
// import frequencies from "../../utils/frequencies";
// import transactionTypes from "../../utils/transaction_types";
import { Transaction } from "../../classes/Transaction";

import OptionSelector from "./OptionSelector";

export default {
  emits: [
    "add-transaction",
    "edit-transaction",
    "close-dialog",
    "delete-transaction",
  ],
  components: {
    OptionSelector,
  },
  props: {
    // transactionData will be set if the user clicks on one of the items in
    // the transaction list - allowing them to edit the transaction
    transactionData: {
      type: Object,
      required: false,
    },
  },
  data() {
    // set the values if transactionData is provided, prepopulating the form.
    return {
      transactionName: this.transactionData ? this.transactionData.name : "",
      transactionAmount: this.transactionData
        ? this.transactionData.amount
        : "",
      transactionFrequency: this.transactionData
        ? this.transactionData.frequency
        : Transaction.frequencies.weekly,
      transactionType: this.transactionData
        ? this.transactionData.type
        : Transaction.types.expense,
    };
  },
  computed: {
    buttonAction() {
      // change the button text based on if a transaction object was provided or not.
      if (this.transactionData) {
        return "Edit Transaction";
      } else {
        return "Add Transaction";
      }
    },
    frequencyChoices() {
      return Object.values(Transaction.frequencies);
    },
    transactionTypeChoices() {
      return Object.values(Transaction.types);
    },
  },
  methods: {
    addTransaction() {
      // some form validation
      let transaction = new Transaction(
        this.transactionName,
        Number.parseFloat(this.transactionAmount),
        this.transactionFrequency,
        this.transactionType
      );

      if (this.transactionData) {
        //make sure to change the id back to what it was since new Transaction() creates a new id.
        transaction.id = this.transactionData.id;
        this.$emit("edit-transaction", transaction);
      } else {
        this.$emit("add-transaction", transaction);
      }
    },
    frequencyChanged(value) {
      console.log("Frequency Changed");
      this.transactionFrequency = value;
    },
  },
};
</script>

<style scoped>
button {
  font-size: 0.75rem;
}
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

.delete-button {
  background-color: #ce4f4f;
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