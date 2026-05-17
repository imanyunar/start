export type TransactionType = 'income' | 'expense' | 'debt';
export type PaymentMethod = 'cash' | 'qris' | 'transfer' | 'e-wallet';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  productName?: string;
  customerId?: string;
  customerName?: string;
  paymentMethod: PaymentMethod;
  paid: boolean;
  timestamp: Date;
  attachments?: {
    qrisProof?: string;
    transferProof?: string;
    invoice?: string;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  dailyUsage: number;
  movement: { date: string; in: number; out: number }[];
}

export interface Customer {
  id: string;
  name: string;
  segment: 'Startup' | 'Retail' | 'Online Shop' | 'Cafe';
  notes: string;
  totalSpending: number;
  repeatOrders: number;
  lastOrderAt: Date;
}

export interface PackagePlan {
  id: 'basic' | 'pro' | 'platinum';
  name: string;
  setupPrice: number;
  monthlyPrice: number;
  features: string[];
}

export interface ParsedInput {
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  paymentMethod: PaymentMethod;
  paid: boolean;
  productName?: string;
  customerName?: string;
}

