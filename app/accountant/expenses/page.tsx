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


export default function AccountantExpenseBooking() {
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
    } catch (error) {
      console.error('Error submitting expense:', error);
      addToast('Failed to submit expense. Please try again.', 'error');
    }
  };

  const handleCancel = () => {
    // Handle cancel action if needed
  };

  return (
    <div className="flex-1 h-full flex flex-col">
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-8 p-4 md:p-8">
            <div className="max-w-5xl mx-auto w-full space-y-6">
                <ExpenseForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
            </div>
        </main>
    </div>
  );
}
