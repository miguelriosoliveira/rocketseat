import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

interface Transaction {
	id: number;
	title: string;
	amount: number;
	type: 'deposit' | 'withdraw';
	category: string;
	createdAt: string;
}

export type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionGetProps {
	transactions: Transaction[];
}

interface TransactionPostProps {
	transaction: Transaction;
}

interface TransactionsProviderProps {
	children: ReactNode;
}

interface TransactionsContextProps {
	transactions: Transaction[];
	createTransaction: (data: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextProps>({} as TransactionsContextProps);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	useEffect(() => {
		api
			.get<TransactionGetProps>('transactions')
			.then(response => setTransactions(response.data.transactions));
	}, []);

	async function createTransaction(transactionData: TransactionInput) {
		try {
			const response = await api.post<TransactionPostProps>('transactions', transactionData);
			setTransactions([...transactions, response.data.transaction]);
		} catch (error) {
			console.error('Error creating transaction', error);
		}
	}

	return (
		<TransactionsContext.Provider value={{ transactions, createTransaction }}>
			{children}
		</TransactionsContext.Provider>
	);
}

export function useTransactions() {
	const context = useContext(TransactionsContext);
	return context;
}
