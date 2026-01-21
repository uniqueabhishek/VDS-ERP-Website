'use client';

import React from 'react';
import AccountantSidebar from '@/app/components/accountant/AccountantSidebar';
import AccountantHeader from '@/app/components/accountant/AccountantHeader';
import { ToastProvider } from '@/app/components/ui/Toast';

export default function AccountantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="bg-background-light dark:bg-background-dark font-display text-[#141515] dark:text-white min-h-screen flex">
        {/* Sidebar */}
        <AccountantSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <AccountantHeader />

          {/* Page Content */}
          {children}

           {/* Mobile Bottom Navigation Bar */}
           <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 flex items-center justify-around px-6 pb-2 z-50">
              <button className="flex flex-col items-center gap-1 text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
              <span className="text-[10px] font-bold">Dashboard</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-gray-400">
              <span className="material-symbols-outlined">checklist</span>
              <span className="text-[10px] font-medium">Tasks</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-gray-400">
              <span className="material-symbols-outlined">receipt_long</span>
              <span className="text-[10px] font-medium">Vouchers</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-gray-400">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-[10px] font-medium">Settings</span>
              </button>
          </nav>
        </div>
      </div>
    </ToastProvider>
  );
}
