import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { budgetAlertStore, updateBudgetAlert } from '../stores/budgetAlertStore'; // Importar el store de alertas
import {
    Box,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Grid,
    Paper,
    Alert,
} from '@mui/material';
import { expenseCategories } from '../constants/categories';
import { transactionsStore } from '../stores/transactionStore';

function Settings() {
    const userSettings = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);

    const [budgetExceeded, setBudgetExceeded] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [totalBudgetLimit, setTotalBudgetLimit] = useState(userSettings.totalBudgetLimit);
    const [categoryLimits, setCategoryLimits] = useState({});

    useEffect(() => {
        const initialLimits = {};
        expenseCategories.forEach(category => {
            initialLimits[category] = userSettings.categoryLimits[category] || 0;
        });
        setCategoryLimits(initialLimits);
    }, [userSettings.categoryLimits]);

    const handleCategoryLimitChange = (category) => (e) => {
        const value = parseFloat(e.target.value) || 0;
        setCategoryLimits({
            ...categoryLimits,
            [category]: value,
        });
    };

    const handleSave = () => {
        const totalCategoryLimit = Object.values(categoryLimits).reduce((acc, limit) => acc + limit, 0);
        
        if (totalCategoryLimit > totalBudgetLimit) {
            setError('Los límites de las categorías superan el límite total del presupuesto.');
            return;
        } else {
            setError('');
        }

        const totalSpent = transactions.reduce((acc, transaction) => {
            return acc + (transaction.type === 'expense' ? parseFloat(transaction.amount) : 0);
        }, 0);

        if (totalSpent > totalBudgetLimit) {
            setBudgetExceeded(true);
            updateBudgetAlert(true);
        } else {
            setBudgetExceeded(false);
            updateBudgetAlert(false);
        }

        userSettingsStore.set({
            ...userSettings,
            totalBudgetLimit,
            categoryBudgetLimits: categoryLimits,
        });

        setSuccessMessage('Configuraciones guardadas correctamente.');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
            <Typography variant="h4" gutterBottom color="primary">
                Configuraciones
            </Typography>

            <FormControlLabel
                control={<Switch color="primary" />}
                label="Activar Alertas"
                checked={userSettings.alertsEnabled}
                onChange={(e) => {
                    userSettingsStore.set({
                        ...userSettings,
                        alertsEnabled: e.target.checked,
                    });
                }}
            />

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Límite Total del Presupuesto (€)</Typography>
                <TextField
                    type="number"
                    name="totalBudgetLimit"
                    fullWidth
                    margin="normal"
                    inputProps={{ min: 0, step: '0.01' }}
                    sx={{ mt: 1 }}
                    value={totalBudgetLimit}
                    onChange={(e) => setTotalBudgetLimit(parseFloat(e.target.value) || 0)}
                />
            </Paper>

            <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">Límites de Presupuesto por Categoría (€)</Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {expenseCategories.map((category) => (
                        <Grid item xs={12} sm={6} md={4} key={category}>
                            <TextField
                                label={category}
                                type="number"
                                fullWidth
                                margin="normal"
                                inputProps={{ min: 0, step: '0.01' }}
                                value={categoryLimits[category] || 0}
                                onChange={handleCategoryLimitChange(category)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ boxShadow: 2 }}
                    onClick={handleSave}
                >
                    Guardar Configuraciones
                </Button>
            </Box>

            {budgetExceeded && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    ¡Has excedido tu límite de presupuesto de {totalBudgetLimit} €!
                </Alert>
            )}

            {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
}

export default React.memo(Settings);
