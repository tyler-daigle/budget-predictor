import { Transaction } from "../classes/Transaction";

export function forecastBudget(transactionList, startingAmount = 0) {
  let day = 0;
  let week = 0;
  let month = 0;
  let forecast = [];

  // start with an empty forecast for each month
  for (let i = 0; i < 12; i++) {
    forecast.push(0);
  }

  const dailyTransactions = transactionList.getTransactionsByFrequency(Transaction.frequencies.daily);
  const monthlyTransactions = transactionList.getTransactionsByFrequency(Transaction.frequencies.monthly);
  const weeklyTransactions = transactionList.getTransactionsByFrequency(Transaction.frequencies.weekly);
  const biWeeklyTransactions = transactionList.getTransactionsByFrequency(Transaction.frequencies.biweekly);

  // since there are not exactly 4 weeks for every month this calculation is only an estimate

  // daily transactions
  let monthlyTotal = startingAmount;
  let calcDays = 364; // 1 less day to make calculations easier

  for (let day = 0; day < calcDays; day++) {
    if (day % 7 === 0) {
      // execute the weekly transactions
      weeklyTransactions.forEach(t => monthlyTotal += executeTransaction(t));
      week++;
      if (week % 2 === 0) {
        // execute biweekly transactions
        biWeeklyTransactions.forEach(t => monthlyTotal += executeTransaction(t));
      }
      if (week % 4 === 0) {
        // and monthly transactions
        if (month < 12) {
          monthlyTransactions.forEach(t => monthlyTotal += executeTransaction(t));
          forecast[month] = monthlyTotal;
          month++;
        }
      }

    }
    dailyTransactions.forEach(t => monthlyTotal += executeTransaction(t));
  }

  // the loop ends and month is set to 12 but the monthly total wasn't set yet
  // since it skipped executing what was in the if statement (month < 12)
  forecast[11] = monthlyTotal;

  return forecast;
}

function executeTransaction(transaction) {
  if (transaction.type === Transaction.types.income) {
    return transaction.amount;
  } else {
    return -transaction.amount;
  }
}