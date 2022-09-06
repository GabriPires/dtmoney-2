import { createContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';

export interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextType>(
  {} as TransactionsContextType,
);

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async (query?: string) => {
    const response = await api.get('/transactions', {
      params: {
        q: query,
      },
    });

    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
