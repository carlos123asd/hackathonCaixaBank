// AlertBanner.js
import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import { userSettingsStore } from '../stores/userSettingsStore';
import { Alert, Collapse, Snackbar } from '@mui/material';

function AlertBanner() {
    const transactions = useStore(transactionsStore); // Obtener transacciones del store
    const userSettings = useStore(userSettingsStore); // Obtener configuraciones del usuario
    const [open, setOpen] = useState(false);
    const { totalBudgetLimit, categoryLimits, alertsEnabled } = userSettings; // Extraer configuraciones necesarias

    // Si las alertas están desactivadas en la configuración, devolver null
    if (!alertsEnabled) return null;

    // Calcular el total de gastos
    const totalExpenses = transactions.reduce((acc, transaction) => {
        return transaction.type === 'expense' ? acc + parseFloat(transaction.amount) : acc;
    }, 0);

    // Verificar si el total de gastos excede el límite total del presupuesto
    const overTotalBudget = totalExpenses > totalBudgetLimit;

    // Calcular gastos por categoría
    const categoryExpenses = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'expense') {
            acc[transaction.category] = (acc[transaction.category] || 0) + parseFloat(transaction.amount);
        }
        return acc;
    }, {});

    // Verificar qué categorías han excedido sus límites
    const exceededCategories = Object.keys(categoryExpenses).filter(category => {
        return categoryExpenses[category] > (categoryLimits[category] || 0);
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar open={open} onClose={handleClose} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={handleClose} severity="warning" sx={{ mb: 2 }}>
                {overTotalBudget && (
                    <div>¡Has superado tu límite total de presupuesto de {totalBudgetLimit} €!</div>
                )}
                {exceededCategories.map((category) => (
                    <div key={category}>
                        ¡Has superado tu límite de presupuesto para {category} ({categoryLimits[category]} €)!
                    </div>
                ))}
            </Alert>
        </Snackbar>
    );
}

export default AlertBanner;
