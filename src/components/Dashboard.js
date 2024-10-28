import React, { Profiler, Suspense } from 'react';
import { useStore } from '@nanostores/react';
import { Box, Typography, Grid, Paper, Alert, CircularProgress } from '@mui/material';
import ExportButton from './ExportButton';
import DownloadProfilerData from './DownloadProfilerData';
import { onRenderCallback } from '../utils/onRenderCallback';
import { transactionsStore } from '../stores/transactionStore';
import { userSettingsStore } from '../stores/userSettingsStore';

// Lazy load components for performance optimization
const AnalysisGraph = React.lazy(() => import('./AnalysisGraph'));
const BalanceOverTime = React.lazy(() => import('./BalanceOverTime'));
const Statistics = React.lazy(() => import('./Statistics'));
const Recommendations = React.lazy(() => import('./Recommendations'));
const RecentTransactions = React.lazy(() => import('./RecentTransactions'));

function Dashboard() {
    const transactions = useStore(transactionsStore);
    // Replace the placeholder values with calculations for total income, total expenses, and balance.
    const totalIncome = transactions.filter(transaction => transaction.type === 'income')
    .reduce((acumulator,transaction) => acumulator + parseFloat(transaction.amount),0); // Calculate total income from transactions
    const totalExpense = transactions.filter(transaction => transaction.type === 'expense')
    .reduce((acumulator,transaction) => acumulator + parseFloat(transaction.amount),0);; // Calculate total expenses from transactions
    const balance = totalIncome - totalExpense; // Calculate balance based on total income and expenses
    const userSettings = useStore(userSettingsStore);
    const bulletLimit =  userSettings.totalBudgetLimit;
    return (
        <Profiler id="Dashboard" onRender={onRenderCallback}>
            <Box sx={{ p: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Dashboard
                </Typography>

                {/* Action Buttons Section */}
                {/* Instructions:
                    - Add a section with ExportButton and DownloadProfilerData components.
                    - The ExportButton should export the transaction data as a CSV file.
                    - The DownloadProfilerData button should export profiler data in JSON format.
                */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <ExportButton data={transactions} headers={['id', 'description', 'amount', 'type', 'category', 'date']} filename="transactions.csv" />
                    <DownloadProfilerData />
                </Box>
                {/* Totals Section */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Income
                            </Typography>
                            <Typography variant="h5" data-testid="total-income">
                                {/* Show total income */}
                                {`${totalIncome.toFixed(2)}€`}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Expenses
                            </Typography>
                            <Typography variant="h5" data-testid="total-expenses">
                                {/* Show total expenses */}
                                {`${totalExpense.toFixed(2)}€`}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Balance
                            </Typography>
                            <Typography variant="h5" data-testid="balance">
                                {/* Show the balance */}
                                {`${balance.toFixed(2)}€`}
                            </Typography>
                            {/* Instructions:
                                - If the balance is negative, show a warning message.
                                - Display a message or alert if the budget limit has been exceeded.
                            */}
                            {
                                balance < 0 && (
                                    <Alert severity="warning" sx={{ mt: 2 }}>
                                        <strong>The balance is negative</strong>
                                    </Alert>
                                )
                            }
                            {
                                totalExpense > bulletLimit && (
                                    <Alert severity="error" sx={{ mt: 2 }}>
                                        <strong>The budget limit has been exceeded</strong>
                                    </Alert>
                                )
                            }
                        </Paper>
                    </Grid>
                </Grid>

                {/* Statistics and Recommendations Section */}
                {/* Instructions:
                    - Use the `Statistics` component to show key financial metrics.
                    - Use the `Recommendations` component to display financial advice.
                */}
                <Typography variant="h4" gutterBottom>
                    Recommendations
                </Typography>
                <Suspense fallback={<CircularProgress />}>
                    <Statistics />
                    <Recommendations />
                </Suspense>
                {/* Charts Section */}
                {/* Instructions:
                    - Use the `AnalysisGraph` component to show a breakdown of income and expenses by category.
                    - Use the `BalanceOverTime` component to show the user's balance over time.
                */}
                <Typography variant="h4" gutterBottom>
                    Charts
                </Typography>
                <Suspense fallback={<CircularProgress />}>
                    <AnalysisGraph />
                    <BalanceOverTime />
                </Suspense>
                {/* Recent Transactions Section */}
                {/* Instructions:
                    - Display a list or table of recent transactions using the `RecentTransactions` component.
                    - Ensure that each transaction shows key details such as description, amount, type, and date.
                */}
                <Typography variant="h4" gutterBottom>
                    Recent Transactions
                </Typography>
                <Suspense fallback={<CircularProgress />}>
                    <RecentTransactions />
                </Suspense>
            </Box>
        </Profiler>
    );
}

export default Dashboard;
