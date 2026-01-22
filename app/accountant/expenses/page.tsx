'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useToast } from '@/app/components/ui/Toast';

// Dynamic imports with loading states for code splitting
const ExpenseForm = dynamic(
  () => import('@/app/components/accountant/ExpenseForm'),
  {
    loading: () => (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        <div className="space-y-6">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    ),
  }
);

const ExpenseHistory = dynamic(
  () => import('@/app/components/accountant/ExpenseHistory'),
  {
    loading: () => (
      <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    ),
  }
);

export default function AccountantExpenseBooking() {
  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'history'
  const { addToast } = useToast();

  const handleFormSubmit = async (data: any, file: File | null) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          expenseType: data.expenseType,
          amount: data.amount,
          expenseDate: data.date,
          vendorName: data.vendor,
          paymentMethod: data.paymentMethod,
          billNumber: data.billNumber,
          description: data.notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create expense');
      }

      addToast('Expense submitted successfully!', 'success');
      setActiveTab('history');
    } catch (error) {
      console.error('Error submitting expense:', error);
      addToast('Failed to submit expense. Please try again.', 'error');
    }
  };

  const handleCancel = () => {
    setActiveTab('history');
  };

  return (
    <div className="flex-1 h-full flex flex-col">
        {/* Desktop Navigation Tabs */}
         <div className="hidden md:flex absolute top-4 right-32 z-40 bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
            <button
                onClick={() => setActiveTab('book')}
                className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${activeTab === 'book' ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white' : 'text-[#717a76] dark:text-white/60 hover:text-primary'}`}
            >
                Book Expense
            </button>
            <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${activeTab === 'history' ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white' : 'text-[#717a76] dark:text-white/60 hover:text-primary'}`}
            >
                History
            </button>
         </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden bg-white dark:bg-background-dark px-4 pt-4 pb-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex bg-background-light dark:bg-white/5 p-1 rounded-xl">
            <button
                onClick={() => setActiveTab('book')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'book' ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white' : 'text-[#717a76] dark:text-white/60'}`}
            >
              Book Expense
            </button>
            <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'history' ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white' : 'text-[#717a76] dark:text-white/60'}`}
            >
              History
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-8 p-4 md:p-8">
            <div className="max-w-5xl mx-auto w-full space-y-6">
                {activeTab === 'book' ? (
                  <ExpenseForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
                ) : (
                  <ExpenseHistory />
                )}
            </div>
        </main>
    </div>
  );
}
