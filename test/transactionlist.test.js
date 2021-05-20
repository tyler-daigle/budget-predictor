import { Transaction, TransactionList } from "../src/classes/Transaction";

let testData = {
  name: "Test Transaction",
  amount: 192.12,
  frequency: Transaction.frequencies.weekly,
  type: Transaction.types.expense
};

test("TransactionList should exist", () => {
  expect(TransactionList).toBeDefined();
});

test("Adding a non Transaction item to the list should throw an error", () => {
  let randomObj = { name: "Car Payment", amount: 216.32, type: "Payment", frequency: "Once a month" };
  let list = new TransactionList();
  expect(list.add(randomObj)).toThrowError();
});