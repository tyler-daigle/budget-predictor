import frequencies from "../utils/frequencies";
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

class TransactionList {
  constructor() {
    this.list = [];
  }

  add(transaction) {
    this.list.push(transaction);
  }
}