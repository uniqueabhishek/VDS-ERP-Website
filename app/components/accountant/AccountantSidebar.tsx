'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AccountantSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark sticky top-0 h-screen overflow-y-auto">
      <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <Image
                src="/images/AOL logo.png"
                alt="VDS ERP Logo"
                width={24}
                height={24}
                className="object-contain w-6 h-6"
                priority
              />
          </div>
          <span className="text-lg font-bold tracking-tight">VDS ERP</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
          <Link href="/accountant/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/accountant/dashboard') ? 'text-primary bg-primary/10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
              <span className="material-symbols-outlined" style={isActive('/accountant/dashboard') ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
              <span className={`text-sm ${isActive('/accountant/dashboard') ? 'font-semibold' : 'font-medium'}`}>Dashboard</span>
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
              <span className="material-symbols-outlined">checklist</span>
              <span className="text-sm font-medium">Tasks</span>
          </a>
          <Link href="/accountant/expenses" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/accountant/expenses') ? 'text-primary bg-primary/10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
              <span className="material-symbols-outlined" style={isActive('/accountant/expenses') ? { fontVariationSettings: "'FILL' 1" } : {}}>receipt_long</span>
              <span className={`text-sm ${isActive('/accountant/expenses') ? 'font-semibold' : 'font-medium'}`}>Vouchers</span>
          </Link>
          <Link href="/accountant/vendors" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/accountant/vendors') ? 'text-primary bg-primary/10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
              <span className="material-symbols-outlined" style={isActive('/accountant/vendors') ? { fontVariationSettings: "'FILL' 1" } : {}}>group</span>
              <span className={`text-sm ${isActive('/accountant/vendors') ? 'font-semibold' : 'font-medium'}`}>Vendors</span>
          </Link>
          <Link href="/accountant/history" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/accountant/history') ? 'text-primary bg-primary/10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
              <span className="material-symbols-outlined" style={isActive('/accountant/history') ? { fontVariationSettings: "'FILL' 1" } : {}}>history</span>
              <span className={`text-sm ${isActive('/accountant/history') ? 'font-semibold' : 'font-medium'}`}>History</span>
          </Link>
          <Link href="/accountant/expense-types" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/accountant/expense-types') ? 'text-primary bg-primary/10' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
              <span className="material-symbols-outlined" style={isActive('/accountant/expense-types') ? { fontVariationSettings: "'FILL' 1" } : {}}>category</span>
              <span className={`text-sm ${isActive('/accountant/expense-types') ? 'font-semibold' : 'font-medium'}`}>Expense Types</span>
          </Link>
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm font-medium">Settings</span>
          </a>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
           <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors text-left">
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-medium">Sign Out</span>
          </button>
      </div>
    </aside>
  );
}
