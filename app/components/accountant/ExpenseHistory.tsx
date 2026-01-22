'use client';

import React, { useState, useEffect } from 'react';

interface Expense {
  id: string;
  expenseType: string;
  amount: number;
  expenseDate: string;
  vendorName: string;
  paymentMethod: string;
  billNumber?: string;
  description?: string;
  user: {
    fullName: string;
    email: string;
  };
  createdAt: string;
}

export default function ExpenseHistory() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/expenses');

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      setError('Failed to load expenses. Please try again.');
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getExpenseTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      light: 'Light Bill',
      pani: 'Water Bill',
      wages: 'Wages',
      maintenance: 'Maintenance',
      travel: 'Travel Expense',
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading expenses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-white/5 rounded-xl border border-red-200 dark:border-red-700 overflow-hidden shadow-sm">
        <div className="p-8 text-center">
          <span className="material-symbols-outlined text-red-500 text-5xl">error</span>
          <p className="mt-4 text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={fetchExpenses}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-white/5 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Vendor</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Payment</th>
                <th scope="col" className="px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="bg-white dark:bg-transparent border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {getExpenseTypeLabel(expense.expenseType)}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{expense.vendorName}</div>
                      {expense.billNumber && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">#{expense.billNumber}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">{formatDate(expense.expenseDate)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {expense.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">
                    {formatAmount(expense.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {expenses.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">receipt_long</span>
            <p className="mt-4 text-lg font-medium">No expenses found</p>
            <p className="mt-1 text-sm">Start by booking your first expense</p>
          </div>
        )}
      </div>
    </div>
  );
}
