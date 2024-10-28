import React, { Suspense } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    CircularProgress,
} from '@mui/material';

function RecentTransactions({ transactions = JSON.parse(localStorage.getItem('transactions')) || [] }) {
    // Recent transactions
    // Instructions:
    // - Sort the transactions by date, showing the most recent first.
    // - Extract only the last 5 transactions for display.
    const recentTransactions = transactions
        .sort((a,b) => new Date(b.date) - new Date(a.date)) // Implement logic to get the last 5 transactions
        .slice(0,5);
    return (
        <div>
            <h3>Recent Transactions</h3>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount (€)</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Instructions:
                            - Map over the recentTransactions array and render each transaction in a table row.
                            - For each row, display the transaction's description, amount, type (income/expense), category, and date.
                            - Ensure that the amount is formatted to two decimal places. */}
                        {recentTransactions.map((transacion) => {
                            return <TableRow>
                                <TableCell>{transacion.description}</TableCell>
                                <TableCell>{parseFloat(transacion.amount).toFixed(2)}</TableCell>
                                <TableCell>{transacion.type}</TableCell>
                                <TableCell>{transacion.category}</TableCell>
                                <TableCell>{transacion.date}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default RecentTransactions;
