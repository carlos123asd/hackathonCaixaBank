import React, { useState, useMemo, useCallback } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    Typography,
    Modal
} from '@mui/material';
import TransactionForm from './TransactionForm';

function TransactionList() {
    const transactions = useStore(transactionsStore);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterType, setFilterType] = useState('');
    const [sortField, setSortField] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [editTransaction, setEditTransaction] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Implement delete functionality
    const deleteTransaction = useCallback((id) => {
        transactionsStore.set(transactions.filter(transaction => transaction.id !== id));
    }, [transactions]);

    // Filter transactions based on selected filters
    const filteredTransactions = useMemo(() => {
        return transactions.filter(transaction => {
            const categoryMatch = filterCategory ? transaction.category === filterCategory : true;
            const typeMatch = filterType ? transaction.type === filterType : true;
            return categoryMatch && typeMatch;
        }).sort((a, b) => {
            if (sortField === 'amount') return a.amount - b.amount;
            if (sortField === 'date') return new Date(a.date) - new Date(b.date);
            return 0;
        });
    }, [transactions, filterCategory, filterType, sortField]);

    // Open form for adding or editing transaction
    const handleForm = (transaction = null) => {
        setEditTransaction(transaction); // null if adding new, or a transaction object if editing
        setOpenModal(true);
    };

    // Close form
    const handleCloseForm = () => {
        setEditTransaction(null);
        setOpenModal(false);
    };

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Transaction List
            </Typography>

            {/* Add transaction */}
            <Button variant="contained" color="primary" onClick={() => handleForm()}>
                Add Transaction
            </Button>

            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-category-label">Category</InputLabel>
                    <Select
                        labelId="filter-category-label"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {/* Add additional categories dynamically */}
                        {/* Example categories, replace with actual categories */}
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Transport">Transport</MenuItem>
                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="filter-type-label">Type</InputLabel>
                    <Select
                        labelId="filter-type-label"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="sort-field-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-field-label"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="amount">Amount</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Table of transactions */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount (€)</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(transaction => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>{transaction.amount}</TableCell>
                                <TableCell>{transaction.type}</TableCell>
                                <TableCell>{transaction.category}</TableCell>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={() => handleForm(transaction)}>Edit</Button>
                                    <Button variant="outlined" color="error" onClick={() => deleteTransaction(transaction.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Transaction Form Modal */}
            <Modal open={openModal} onClose={handleCloseForm}>
                <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
                    <TransactionForm
                        transactionToEdit={editTransaction}
                        onClose={handleCloseForm}
                    />
                </Box>
            </Modal>
        </Box>
    );
}

export default TransactionList;
