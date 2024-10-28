import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function MonthlyChart({ transactions = JSON.parse(localStorage.getItem('transactions')) || [] }) {
    // Instructions:
    // - Group transactions by month.
    // - For each month, calculate the total income and expense.
    const obtenerMesAnio = (fecha) => {
        const d = new Date(fecha);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    };

    const dataMap = {}; // Implement logic to group transactions by month and calculate totals

    transactions.forEach((t) => {
        // Instructions:
        // - Extract the month and year from each transaction's date.
        // - Check if the month is already in `dataMap`. If not, initialize it.
        // - Accumulate the income and expense amounts based on the transaction type.
        const mesAnio = obtenerMesAnio(t.date);

        if (!dataMap[mesAnio]) {
            dataMap[mesAnio] = {
                month: mesAnio,
                income: 0,
                expense: 0
            };
        }

        if (t.monto > 0) {
            dataMap[mesAnio].income += t.amount;
        } else {
            dataMap[mesAnio].expense += Math.abs(t.amount);
        }
    });

    // Instructions:
    // - Convert the data map into an array and sort it by date.
    // - The array should contain objects with the following structure: { month, income, expense }
    const data = Object.values(dataMap).sort((a, b) => new Date(a.month) - new Date(b.month)); // Implement logic to convert dataMap to a sorted array
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Income" />
                <Line type="monotone" dataKey="expense" stroke="#8884d8" name="Expense" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default MonthlyChart;
