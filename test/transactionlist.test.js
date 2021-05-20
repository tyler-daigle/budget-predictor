import { Transaction, TransactionList } from "../src/classes/Transaction";

let testData = {
  name: "Test Transaction",
  amount: 192.12,
  frequency: Transaction.frequencies.weekly,
  type: Transaction.types.expense
};
let a;
let list;
beforeEach(() => {
  a = new Transaction(testData.name, testData.amount, testData.frequency, testData.type);
  list = new TransactionList();
});

test("TransactionList should exist", () => {
  expect(TransactionList).toBeDefined();
});

test("Adding a non Transaction item to the list should throw an error", () => {
  let randomObj = { name: "Car Payment", amount: 216.32, type: "Payment", frequency: "Once a month" };
  let list = new TransactionList();
  expect(() => list.add(randomObj)).toThrow();
});

test("Adding a Transaction item should increase the count by 1", () => {
  list.add(a);
  expect(list.count).toEqual(1);
});

test("Getting a Transaction from the list by name should work", () => {
  list.add(a);
  const t = list.getTransaction({ name: "Test Transaction" });
  expect(t).toEqual(a);
});

test("Getting a transaction that doesn't exist should return null", () => {
  list.add(a);
  const t = list.getTransaction({ name: "Fake" });
  expect(t).toBeNull();
});

test("Getting a transaction by ID should return the ID", () => {
  list.add(a);
  const t = list.getTransaction({ id: a.id });
  expect(t).toEqual(a);
});

test("Getting transactions by type should work", () => {
  let numIncomeTypes = 5;
  let numExpenseTypes = 5;

  for (let i = 0; i < numIncomeTypes; i++) {
    list.add(new Transaction("T2", 123.45, Transaction.frequencies.monthly, Transaction.types.income));
  }

  for (let i = 0; i < numExpenseTypes; i++) {
    list.add(new Transaction("T2", 123.45, Transaction.frequencies.monthly, Transaction.types.expense));
  }

  expect(list.count).toEqual(numExpenseTypes + numIncomeTypes);
  let income = list.getTransactionsByType(Transaction.types.income);
  let expense = list.getTransactionsByType(Transaction.types.expense);

  expect(income.length).toEqual(numIncomeTypes);
  expect(expense.length).toEqual(numExpenseTypes);


});