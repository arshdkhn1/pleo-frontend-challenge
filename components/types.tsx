import { SyntheticEvent, FormEvent } from 'react'

export interface Amount {
  value: string;
  currency: string;
}

export interface User {
  first: string;
  last: string;
  email: string;
}

export interface Receipt {
  id: string;
  url: string;
}

export interface ExpenseProps {
  id: string;
  amount: Amount;
  date: string;
  merchant: string;
  receipts: Receipt[];
  comment: string;
  category: string;
  user: User;
}

export interface ExpensesProps {
  data: ExpenseProps[];
}

export interface FilterProps {}

export interface FilterValuesProps {
  open: boolean;
}

export interface FilterListProps {
  value: string;
  textVal: string;
  isActive: boolean;
  onClick: (e: SyntheticEvent) => void;
}

export interface FilterButtonProps {}

export interface PaginationProps {
  total: number;
  page: number;
  perPage: number;
}
