import React from 'react';
import { useStore } from '@nanostores/react';
import { transactionsStore } from '../stores/transactionStore';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

function BalanceOverTime() {
    const transactions = useStore(transactionsStore);

    // Instructions:
    // - Sort the transactions by date to display the balance over time.
    // - Calculate the cumulative balance as you iterate through the sorted transactions.
    // - Each object in the 'data' array should be of the form: { date, Balance }, where 'date' is the transaction date and 'Balance' is the cumulative balance at that date.
    let acumulate = 0;
    const data = transactions.sort((a,b) => new Date(a.date) - new Date(b.date))
    .map((transaction) => {
         acumulate += (transaction.type === "expense" ? -1 * parseFloat(transaction.amount) :  parseFloat(transaction.amount));
        return {
            "date": transaction.date,
            "Balance": acumulate.toFixed(3)
        } 
    }); // Replace with logic to calculate cumulative balance for each date.
    return (
        <ResponsiveContainer width="100%" height={300} style={{marginTop:'3em', marginBottom:'3em'}}>
            <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Balance" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default React.memo(BalanceOverTime);
