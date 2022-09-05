import { createContext, useEffect, useState } from 'react';

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

  const loadTransactions = async () => {
    const response = await fetch('http://localhost:3000/transactions');
    const data = await response.json();
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
