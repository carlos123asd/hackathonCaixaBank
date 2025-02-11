import React, { Suspense } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';

function Statistics() {
    const transactions = useStore(transactionsStore);
    // Filter transactions by 'expense' type
    // Instructions:
    // - Implement logic to filter the transactions array to only include expenses.
    const expenses = transactions.filter((transaction) => {
        return transaction.type === 'expense'
    }); // Replace with logic to filter expenses

    // Calculate total expense
    // Instructions:
    // - Sum the amounts of all expense transactions.
    const totalExpense = expenses.reduce((acumulator,transaction) => acumulator + parseFloat(transaction.amount) ,0); // Replace with logic to calculate total expense

    // Get unique dates from expenses
    // Instructions:
    // - Extract the unique dates from the expense transactions.
    // - Calculate the average daily expense.
    const uniqueDates = new Set(transactions
        .filter(transaction => transaction.type === 'expense')
        .map(transaction => transaction.date) 
    );
    const dailyExpenses = [...uniqueDates].map(date => {
        return {
            date,
            total: transactions
                .filter(transaction => transaction.date === date && transaction.type === 'expense') // Filter for expenses on that date
                .reduce((accumulator, transaction) => accumulator + parseFloat(transaction.amount), 0) // Sum the expenses
        };
    });
    const totalExpenses = dailyExpenses.reduce((accumulator,expense) => accumulator + expense.total, 0);
    const numberOfDays = uniqueDates.size;
    const averageDailyExpense = numberOfDays > 0 ? totalExpenses / numberOfDays : 0; // Replace with logic to calculate average daily expense

    // Find the category with the highest spending
    // Instructions:
    // - Use the categoryExpenses object to accumulate the total amount spent in each category.
    // - Implement logic to determine which category has the highest total expense.
    // - Ensure that `maxCategory` contains the category with the highest spending.
    const categoryExpenses = {};

    transactions.forEach(transaction => {
        if (transaction.type === 'expense') {
            const category = transaction.category;
            const amount = parseFloat(transaction.amount);

            if (categoryExpenses[category]) {
                categoryExpenses[category] += amount;
            } else {
                categoryExpenses[category] = amount;
            }
        }
    });

    let maxCategory = null;
    let maxAmount = 0;

    for (const category in categoryExpenses) {
        if (categoryExpenses[category] > maxAmount) {
            maxAmount = categoryExpenses[category];
            maxCategory = category;
        }
    }

    return (
        <Paper sx={{ padding: 2, mt: 2 }}>
            <Typography variant="h6">Key Statistics</Typography>
            <Typography>
                Average Daily Expense: {averageDailyExpense.toFixed(2)} €
            </Typography>
            <Typography>
                Highest Spending Category:{' '}
                {maxCategory
                    ? `${maxCategory} (${categoryExpenses[maxCategory].toFixed(2)} €)`
                    : 'No data available'}
            </Typography>
        </Paper>
    );
}

export default Statistics;
