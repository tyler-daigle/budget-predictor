import getNextId from "../utils/id";

export class Transaction {
  constructor(name, amount, frequency, type) {
    this.id = getNextId();
    this.name = name;

    if (typeof amount !== "number") {
      this.amount = Number.parseFloat(amount);
    } else {
      this.amount = amount;
    }

    if (Object.values(Transaction.frequencies).indexOf(frequency) === -1) {
      this.frequency = Transaction.frequencies.weekly;
    } else {
      this.frequency = frequency;
    }

    if (Object.values(Transaction.types).indexOf(type) === -1) {
      this.type = Transaction.types.expense;
    } else {
      this.type = type;
    }
  }
}

Transaction.types = {
  expense: "Expense",
  income: "Income"
};

Transaction.frequencies = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
  biweekly: "Biweekly"
};

export class TransactionList {
  constructor() {
    this.list = [];
    this.count = 0;
  }

  add(transaction) {
    if (!(transaction instanceof Transaction)) {
      throw new Error("Adding non Transaction object to list.");
    }
    this.list.push(transaction);
    this.count++;
  }

  // get lets you search for a transaction by a field.
  // Either use {name: "Transaction Name"} or {id: 1}
  // The transaction will be returned if found or null if not.
  getTransaction(options) {
    if (options.name) {
      let transaction = this.list.find(t => t.name === options.name);
      if (transaction) {
        return transaction;
      } else {
        return null;
      }
    } else if (options.id) {
      let transaction = this.list.find(t => t.id === options.id);
      if (transaction) {
        return transaction;
      } else {
        return null;
      }
    }
    return null;
  }

  getTransactionsByType(type) {
    return this.list.filter(t => t.type === type);
  }

  // updateTransaction() doesn't allow you to update the IDs of the Transactions
  updateTransaction(transaction) {
    let list = this.list.map(item => {
      if (item.id !== transaction.id) {
        return item;
      } else {
        return transaction; // the updated transaction to replace
      }
    });
    this.list = list;
  }
  getAll() {
    return [...this.list];
  }

}