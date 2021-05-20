import { Transaction } from "../src/classes/Transaction";

let testData = {
  name: "Test Transaction",
  amount: 192.12,
  frequency: Transaction.frequencies.weekly,
  type: Transaction.types.expense
};

test("Transaction class should exists", () => {
  expect(Transaction).toBeDefined();
});

test("Creating two transactions should have different IDs", () => {
  let a = new Transaction(testData.name, testData.amount, testData.frequency, testData.type);
  let b = new Transaction(testData.name, testData.amount, testData.frequency, testData.type);

  expect(a.id === b.id).toBeFalsy();
});

test("Passing a string as an amount should convert it to a number", () => {
  let a = new Transaction(testData.name, "192.12", testData.frequency, testData.type);
  expect(typeof a.amount).toEqual("number");
});

test("Created transaction should have a frequency of weekly", () => {
  let a = new Transaction(testData.name, "192.12", testData.frequency, testData.type);
  expect(a.frequency).toEqual(Transaction.frequencies.weekly);
});

test("Creating a transaction with a random type value should default to expense", () => {
  let a = new Transaction(testData.name, "192.12", testData.frequency, "savings");
  expect(a.type).toEqual(Transaction.types.expense);
});

test("Created transaction should have a type of expense", () => {
  let a = new Transaction(testData.name, "192.12", testData.frequency, testData.type);
  expect(a.type).toEqual(Transaction.types.expense);
});

test("Creating a transaction with a random frequency value should default to weekly", () => {
  let a = new Transaction(testData.name, "192.12", "whenever", testData.type);
  expect(a.frequency).toEqual(Transaction.frequencies.weekly);
});