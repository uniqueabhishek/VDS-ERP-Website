'use client';

import React from 'react';
import Link from 'next/link';

export default function AccountantDashboard() {
  return (
    <div className="flex-1 h-full flex flex-col">
      <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto w-full space-y-8 p-4 md:p-8">

          {/* Welcome Hero Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-indigo-600 p-6 md:p-8 text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"></div>
            <div className="relative z-10">
              <p className="text-primary-100/80 text-sm font-medium mb-1">Good afternoon,</p>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Accountant! 👋</h1>
              <p className="text-white/70 text-sm md:text-base max-w-xl">Here's an overview of your financial activities. Stay on top of your tasks and keep the organization running smoothly.</p>
            </div>

            {/* Quick Stats in Hero */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Today's Expenses</p>
                <p className="text-2xl font-bold mt-1">₹12,450</p>
                <p className="text-xs text-green-300 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  +8.2% from yesterday
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Pending Tasks</p>
                <p className="text-2xl font-bold mt-1">8</p>
                <p className="text-xs text-orange-300 mt-1">3 urgent items</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hidden md:block">
                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Monthly Budget</p>
                <p className="text-2xl font-bold mt-1">₹5.2L</p>
                <p className="text-xs text-white/60 mt-1">₹3.1L utilized (60%)</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hidden md:block">
                <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Active Vendors</p>
                <p className="text-2xl font-bold mt-1">24</p>
                <p className="text-xs text-white/60 mt-1">5 new this month</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:max-w-md">
            <div className="flex items-center rounded-xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 h-12 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary/30">
              <div className="text-gray-400 dark:text-gray-500 flex items-center justify-center pl-4">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-gray-900 dark:text-white focus:outline-none border-none bg-transparent h-full placeholder:text-gray-400 dark:placeholder:text-gray-500 px-3 text-sm font-normal"
                placeholder="Search voucher, vendor, or transaction..."
              />
              <div className="text-gray-400 dark:text-gray-500 pr-4 hidden md:flex items-center gap-1">
                <kbd className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">⌘</kbd>
                <kbd className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">K</kbd>
              </div>
            </div>
          </div>

          {/* Quick Actions Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Quick Actions</h3>
              <Link href="/accountant/expenses" className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors flex items-center gap-1">
                View all
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="group flex flex-col items-start gap-3 p-5 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/50 shadow-sm active:scale-[0.98] transition-all hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30">
                <div className="bg-primary/10 dark:bg-primary/20 p-2.5 rounded-lg text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">add_card</span>
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-gray-900 dark:text-white text-left">Add New</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Income entry</p>
                </div>
              </button>

              <Link href="/accountant/expenses" className="group flex flex-col items-start gap-3 p-5 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 text-white active:scale-[0.98] transition-all hover:shadow-xl hover:shadow-primary/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="bg-white/20 p-2.5 rounded-lg group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-white">payments</span>
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-left">Record</p>
                  <p className="text-white/70 text-xs">New expense</p>
                </div>
              </Link>

              <Link href="/accountant/vendors" className="group flex flex-col items-start gap-3 p-5 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/50 shadow-sm active:scale-[0.98] transition-all hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30">
                <div className="bg-emerald-500/10 dark:bg-emerald-500/20 p-2.5 rounded-lg text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-gray-900 dark:text-white text-left">Vendors</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Manage list</p>
                </div>
              </Link>

              <button className="group flex flex-col items-start gap-3 p-5 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/50 shadow-sm active:scale-[0.98] transition-all hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30">
                <div className="bg-orange-500/10 dark:bg-orange-500/20 p-2.5 rounded-lg text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">summarize</span>
                </div>
                <div>
                  <p className="text-sm font-bold leading-tight text-gray-900 dark:text-white text-left">Reports</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Generate PDF</p>
                </div>
              </button>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Task List Section (Takes up 2 cols on Desktop) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Operational Tasks</h3>
                  <span className="flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/20 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                    8 Pending
                  </span>
                </div>
                <button className="text-primary text-sm font-semibold hover:text-primary/80 transition-colors flex items-center gap-1">
                  View all
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>

              <div className="space-y-3">
                {/* Task Item 1 */}
                <div className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-all cursor-pointer">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">receipt</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Verify Course Receipts</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">12 receipts from Yoga Intensive • Due today</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/20 px-2 py-1 rounded">High</span>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all">chevron_right</span>
                  </div>
                </div>

                {/* Task Item 2 */}
                <div className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-all cursor-pointer">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-red-600 dark:text-red-400">upload_file</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Upload Pani Bill</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">Due by EOD today • Water utility</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/20 px-2 py-1 rounded">Urgent</span>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all">chevron_right</span>
                  </div>
                </div>

                {/* Task Item 3 */}
                <div className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-all cursor-pointer">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">account_balance</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Reconcile Goshala Petty Cash</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">Maintenance funds for August</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/20 px-2 py-1 rounded">Review</span>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all">chevron_right</span>
                  </div>
                </div>

                {/* Task Item 4 */}
                <div className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-all cursor-pointer">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400">fact_check</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">Approve Seva Request</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">Kitchen supplies for next week</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 px-2 py-1 rounded">Approve</span>
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all">chevron_right</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Health Section (Side Column on Desktop) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Budget Health</h3>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">This Month</span>
              </div>
              <div className="bg-white dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50 space-y-5">
                {/* Progress Item 1 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Wages & Salaries</p>
                    </div>
                    <p className="text-xs font-bold text-orange-600 dark:text-orange-400">80%</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-full rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">₹80,000 of ₹1,00,000</p>
                </div>

                {/* Progress Item 2 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Utilities (Water/Elec)</p>
                    </div>
                    <p className="text-xs font-bold text-primary">45%</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/80 to-primary h-full rounded-full transition-all duration-500" style={{ width: '45%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">₹22,500 of ₹50,000</p>
                </div>

                {/* Progress Item 3 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Goshala Maintenance</p>
                    </div>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">60%</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">₹30,000 of ₹50,000</p>
                </div>

                {/* Progress Item 4 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Office Supplies</p>
                    </div>
                    <p className="text-xs font-bold text-violet-600 dark:text-violet-400">25%</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-400 to-violet-500 h-full rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">₹5,000 of ₹20,000</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800/80 p-5 rounded-xl border border-gray-200 dark:border-gray-700/50">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-lg">check_circle</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">Electricity bill paid</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">2 hours ago</p>
                    </div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">₹3,450</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-lg">receipt_long</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">New expense recorded</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">5 hours ago</p>
                    </div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">₹1,200</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-lg">person_add</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">New vendor added</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">Yesterday</p>
                    </div>
                    <span className="text-xs text-gray-500">—</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
