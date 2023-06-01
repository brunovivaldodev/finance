import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../config/api";

export type TypeTransaction = "INCOME" | "OUTCOME"


interface Transaction {
  id: string;
  date: string;
  description: string;
  type: string;
  value: number;
  category_id: string;
}

interface Categories {
  id: string;
  name: string;
  user_id: string;
}

interface CreateTransaction {
  date: string;
  description: string;
  value: number;
  category_id: string;
  type: TypeTransaction;
}

interface DeleteTransaction {
  transaction_id: string;
}

interface CreateCategory {
  name: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  createTransaction: (data: CreateTransaction) => Promise<void>;
  categories: Categories[];
  createCategory: (data: CreateCategory) => Promise<AxiosResponse<any, any>>;
  getTransactionsHandler: () => Promise<void>;
  getCategories: () => Promise<void>;
  deleteTransaction: (data: DeleteTransaction) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransaction] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);

  async function getTransactionsHandler() {
    let user = await AsyncStorage.getItem("user");

    if (user) {
      let userToken = JSON.parse(user);
      const response = await api.get(`transactions/${userToken.id}`);
      setTransaction(response.data);
      return response;
    }
  }

  async function getCategories() {
    let user = await AsyncStorage.getItem("user");

    if (user) {
      let userToken = JSON.parse(user);
      const response = await api.get(`categories/${userToken.id}`);
      setCategories(response.data);
      return response;
    }
  }



  async function createTransaction(data: CreateTransaction) {
    const { date, description, value, category_id, type } = data;

    console.log("entrei aqui")

    let user = await AsyncStorage.getItem("user");

    if (user) {
      let userToken = JSON.parse(user);


      const response = await api.post(`transactions/${userToken.id}`, {
        date,
        description,
        value,
        category_id,
        type,
      });

      console.log(response)
      setTransaction((state) => [response.data, ...state]);
    }
  }

  async function deleteTransaction(data: DeleteTransaction) {
    const { transaction_id } = data;

    let user = await AsyncStorage.getItem("user");

    if (user) {
      let userToken = JSON.parse(user);

      const response = await api.delete(
        `transactions/${transaction_id}/${userToken.id}`
      );

      transactions.setTransaction([response.data]);
    }
  }

  async function createCategory(data: CreateCategory) {
    const { name } = data;

    let user = await AsyncStorage.getItem("user");

    if (user) {
      let userToken = JSON.parse(user);

      const response = await api.post(`categories/${userToken.id}`, {
        name,
      });
      setCategories((state) => [response.data, ...state]);
      return response;
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        createTransaction,
        categories,
        createCategory,
        getTransactionsHandler,
        getCategories,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
