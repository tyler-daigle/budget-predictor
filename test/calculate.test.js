import { forecastBudget } from "../src/utils/calculate";
import { Transaction, TransactionList } from "../src/classes/Transaction";

test("forecastBudget() exists", () => {
  expect(forecastBudget).toBeDefined();
});

test("An empty transaction list should return a forecast with each item set to zero", () => {
  let list = new TransactionList();
  let forecast = forecastBudget(list);
  expect(forecast.length).toEqual(12);
  forecast.forEach(f => {
    expect(f).toEqual(0);
  });
});

test("A daily transaction of $1 should end up with a total of $364 at the end of the year", () => {
  // since this is not exact there are only 364 days instead of 365 in the year which makes the calculations 
  // easier. We miss 1 day but there are exactly 52 weeks (364 / 7) and exactly 26 biweeks (364 / 14)
  let list = new TransactionList();
  list.add(new Transaction("Money", 1, Transaction.frequencies.daily, Transaction.types.income));

  let forecast = forecastBudget(list);
  expect(forecast[11]).toEqual(364);
});

test("A monthly transaction of $100 should end the year with a total of $1200", () => {
  let list = new TransactionList();
  list.add(new Transaction("Money", 100, Transaction.frequencies.monthly, Transaction.types.income));

  let forecast = forecastBudget(list);
  expect(forecast[11]).toEqual(1200);
});

test("A biweekly transaction of $100 should end the year with a total of $2600", () => {
  // the math is not exact - there are 365 days in a year without a leap year. 365 / 7 ~= 52, 52 / 2 = 26
  // so biweekly should be calculated 26 times. So that gives the value of $2600 at the end of the year
  let list = new TransactionList();
  list.add(new Transaction("Money", 100, Transaction.frequencies.biweekly, Transaction.types.income));

  let forecast = forecastBudget(list);
  expect(forecast[11]).toEqual(2600);
});

test("A weekly transaction of $100 should end with $5200", () => {
  let list = new TransactionList();
  list.add(new Transaction("Money", 100, Transaction.frequencies.weekly, Transaction.types.income));

  let forecast = forecastBudget(list);
  expect(forecast[11]).toEqual(5200);
});

test("A weekly transaction of -$100 should end up with -$5200", () => {
  let list = new TransactionList();
  list.add(new Transaction("Money", 100, Transaction.frequencies.weekly, Transaction.types.expense));

  let forecast = forecastBudget(list);
  expect(forecast[11]).toEqual(-5200);
});

test("A monthly transaction of $100 and a starting amount of $100 should be $1300", () => {
  let list = new TransactionList();
  list.add(new Transaction("Money", 100, Transaction.frequencies.monthly, Transaction.types.income));

  let forecast = forecastBudget(list, 100);
  expect(forecast[11]).toEqual(1300);
});