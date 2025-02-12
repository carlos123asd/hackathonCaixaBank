import { atom } from 'nanostores';

const initialTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

export const transactionsStore = atom(initialTransactions);

export const setTransactions = (transactions) => {
    transactionsStore.set(transactions);
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

export const addTransaction = (transaction) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = [...currentTransactions, transaction];
    setTransactions(updatedTransactions); 
};

export const editTransaction = (transaction) => {
    const currentTransactions = transactionsStore.get();
    const updateTransactions = currentTransactions.map((currentTransaction) => {
        return currentTransaction.id === transaction.id ? transaction : currentTransaction
    });
    setTransactions(updateTransactions);
}

export const deleteTransaction = (id) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = currentTransactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions); 
};
