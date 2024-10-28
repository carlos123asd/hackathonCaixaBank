import React, { Suspense, useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { CircularProgress, Typography, Box, Paper } from '@mui/material';

function Recommendations() {
    const transactions = useStore(transactionsStore); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Simulate data loading and handle possible errors
        // Instructions:
        // - Set loading to true before fetching the data.
        // - After a delay (simulated with setTimeout), set loading to false.
        // - You may simulate an error by setting the error state.
        setLoading(true);
        setTimeout(() => {
            // Simulate error in case of failure (optional)
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if(!loading){// Implement logic to compare expenses between months
            // Instructions:
            // - Use the transactions to calculate expenses for the current and previous months.
            // - Filter transactions by type ('expense') and by month/year.
            // - Compare the total expenses of this month with last month.
            const expensesMonthActual = transactions.filter((transaction) => {
                return new Date(transaction.date).getMonth() === new Date().getMonth() && transaction.type === 'expense';
            })// Implement logic to filter and extract expenses
            const expensesLastMonth = transactions.filter((transaction) => {
                return new Date(transaction.date).getMonth() === ((new Date().getMonth() - 1 + 12) % 12) && transaction.type === 'expense';
            })
            const TotalexpenseThisMonth = (expensesMonthActual.map((transaction) => parseFloat(transaction.amount))).reduce((acumulator,currentValue) => {
                return acumulator + currentValue;
            },0); // Calculate total expenses for the current month
            const TotalexpenseLastMonth = (expensesLastMonth.map((transaction) => parseFloat(transaction.amount))).reduce((acumulator,currentValue) => {
                return acumulator + currentValue;
            },0); // Calculate total expenses for the last month

            // Generate a message based on the comparison between months
            // Instructions:
            // - If there are no expenses for last month, display a message encouraging the user to keep recording.
            if(!TotalexpenseLastMonth){
                setMessage('Keep Recording');
            }
            // - If expenses have increased, calculate the percentage increase and suggest reviewing expenses.
            else if(TotalexpenseLastMonth < TotalexpenseThisMonth){
                const porcentage = (100 * (TotalexpenseThisMonth - TotalexpenseLastMonth))/(TotalexpenseThisMonth + TotalexpenseLastMonth);
                setMessage(`Expenses percentage increase a ${porcentage.toFixed(2)}%, suggest reviewing expenses`);
            }
            // - If expenses have decreased, congratulate the user and show the percentage decrease.
            else if(TotalexpenseLastMonth > TotalexpenseThisMonth){
                const porcentage = (100 * (TotalexpenseLastMonth - TotalexpenseThisMonth))/(TotalexpenseThisMonth + TotalexpenseLastMonth);
                setMessage(`Congratulate! Your expenses have decreased (${porcentage.toFixed(2)}%)`);
            }
            // - If expenses are the same, notify the user that their spending hasn't changed.
            else if(TotalexpenseLastMonth === TotalexpenseThisMonth){
                setMessage("Their spending hasn't changed");
            }}
    },[loading,transactions])

    if (loading) {
        // Show a loading indicator while data is being fetched
        return <CircularProgress />;
    }

    if (error) {
        // Display an error message if something goes wrong
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Paper sx={{ padding:2, mt: 2, mb: 4 }}>
            <Box>
                <Typography variant="h5">Recommendations</Typography>
                {/* Display the recommendation message according to the change in expenditure */}
                <Typography>{message}</Typography>
            </Box>
        </Paper>
    );
}
export default Recommendations;
