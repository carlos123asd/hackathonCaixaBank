import React, { useState, useEffect } from 'react'; 
import { useStore } from '@nanostores/react';
import { editTransaction, addTransaction, transactionsStore } from '../stores/transactionStore';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid, Box, Alert, CircularProgress } from '@mui/material';
import { categoryKeywords } from '../constants/categoryKeywords';
import { expenseCategories, incomeCategories } from '../constants/categories';

function TransactionForm({ transactionToEdit, onClose}) {
    const transactions = useStore(transactionsStore);
    const [description, setDescription] = useState(transactionToEdit ? transactionToEdit.description : '');
    const [amount, setAmount] = useState(transactionToEdit ? transactionToEdit.amount : '');
    const [type, setType] = useState(transactionToEdit ? transactionToEdit.type : 'expense');
    const [category, setCategory] = useState(transactionToEdit ? transactionToEdit.category : '');
    const [date, setDate] = useState(transactionToEdit ? transactionToEdit.date : new Date().toISOString().split('T')[0]);
    const [oper, setOpen] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const assignCategory = (desc, transactionType) => {
        const lowerDesc = desc.toLowerCase();
        for (const category in categoryKeywords) {
            for (const keyword of categoryKeywords[category]) {
                if(lowerDesc.includes(keyword)){
                    return category;
                }
            }
        }
        return transactionType === 'expense' ? 'Other Expenses' : 'Other Income';
    };

    useEffect(() => {
        if (!transactionToEdit) {
            const autoCategory = assignCategory(description, type);
            setCategory(autoCategory);
        }
    }, [description, type, transactionToEdit]);

    const updateError = (message) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, 2300);
    };

    const updateMessage = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage('');
        }, 2300);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description || !amount) {
            updateError('Todos los campos son necesarios');
            return;
        }

        const transaction = {
            id: transactionToEdit ? transactionToEdit.id : generateUniqueId(), 
            description: description, 
            amount: parseFloat(amount), 
            type: type === 'income' ? 'income' : 'expense', 
            category: category, 
            date: date
        };

        setLoading(true);
        if (transactionToEdit) {
            editTransaction(transaction);
            setTimeout(() => {
                setLoading(false);
                updateMessage('Transacción editada correctamente');
                onClose();
            }, 2000);
        } else {
            addTransaction(transaction);
            setTimeout(() => {
                setLoading(false);
                updateMessage('Transacción añadida correctamente');
                onClose();
            }, 2000);
        }
    };

    const generateUniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    return (
        <Dialog open={oper} onClose={onClose}>
            <DialogTitle>{transactionToEdit ? 'Editar Transacción' : 'Añadir Transacción'}</DialogTitle>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            )}
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Descripción"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                fullWidth
                                margin="normal"
                                name="description"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Cantidad (€)"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                fullWidth
                                margin="normal"
                                inputProps={{ min: 0, step: '0.01' }}
                                name="amount"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="type-label">Tipo</InputLabel>
                                <Select
                                    labelId="type-label"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    label="Tipo"
                                    name="type"
                                >
                                    <MenuItem value="income">Ingreso</MenuItem>
                                    <MenuItem value="expense">Gasto</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="category-label">Categoría</InputLabel>
                                <Select
                                    labelId="category-label"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    label="Categoría"
                                    name="category"
                                >
                                    {type === 'expense' ? 
                                        expenseCategories.map((category,index) => <MenuItem key={index} value={category}>{category}</MenuItem>) : 
                                        incomeCategories.map((category,index) => <MenuItem key={index} value={category}>{category}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        {error && (
                            <Alert severity="error" sx={{ mt: 2 }} style={{ marginLeft: '1em' }}>
                                <strong>Error: {error}</strong>
                            </Alert>
                        )}
                        {message && (
                            <Alert severity="success" sx={{ mt: 2 }} style={{ marginLeft: '1em' }}>
                                <strong>Info: {message}</strong>
                            </Alert>
                        )}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', p: 2 }}>
                        <Button onClick={onClose} color="secondary">
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {transactionToEdit ? 'Actualizar' : 'Añadir'}
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default React.memo(TransactionForm);
