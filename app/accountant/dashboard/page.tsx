import React from 'react';
import Link from 'next/link';

export default function AccountantDashboard() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111218] dark:text-white transition-colors duration-200 min-h-screen flex font-display">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark sticky top-0 h-screen overflow-y-auto">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <img
                  src="/images/gemini_logo_transparent.png"
                  alt="VDS ERP Logo"
                  className="size-6 object-contain"
                />
            </div>
            <span className="text-lg font-bold tracking-tight">VDS ERP</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
            <Link href="/accountant/dashboard" className="flex items-center gap-3 px-3 py-2 text-primary bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                <span className="text-sm font-semibold">Dashboard</span>
            </Link>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                <span className="material-symbols-outlined">checklist</span>
                <span className="text-sm font-medium">Tasks</span>
            </a>
            <Link href="/accountant/expenses" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                <span className="material-symbols-outlined">receipt_long</span>
                <span className="text-sm font-medium">Vouchers</span>
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* TopAppBar (Mobile Logo, Desktop Search & Actions) */}
          <header className="sticky top-0 z-40 flex items-center bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 px-4 md:px-8 justify-between h-16">

            {/* Mobile Logo Group */}
            <div className="flex items-center gap-3 md:hidden">
              <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <img
                  src="/images/gemini_logo_transparent.png"
                  alt="VDS ERP Logo"
                  className="size-8 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[#111218] dark:text-white text-base font-bold leading-tight">VDS ERP</h2>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Accountant</span>
              </div>
            </div>

            {/* Desktop Page Title (Hidden on Mobile) */}
            <div className="hidden md:flex flex-col">
                 <h1 className="text-xl font-bold text-[#111218] dark:text-white">Dashboard</h1>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex size-10 items-center justify-center rounded-full bg-transparent text-[#111218] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="flex size-10 items-center justify-center rounded-full bg-transparent text-[#111218] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto w-full">

                {/* Search Bar (Re-styled for desktop width) */}
                <div className="px-4 md:px-8 py-4 bg-white dark:bg-background-dark border-b border-gray-100 dark:border-gray-800 md:bg-transparent md:dark:bg-transparent md:border-none">
                  <label className="flex flex-col h-12 w-full md:max-w-md">
                    <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
                      <div className="text-[#5f668c] dark:text-gray-400 flex border-none bg-gray-100 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-xl">
                        <span className="material-symbols-outlined">search</span>
                      </div>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-[#111218] dark:text-white focus:outline-0 focus:ring-0 border-none bg-gray-100 dark:bg-gray-800 h-full placeholder:text-[#5f668c] dark:placeholder:text-gray-500 px-4 pl-2 text-base font-normal"
                        placeholder="Search Voucher No. or Vendor"
                      />
                    </div>
                  </label>
                </div>

                {/* Quick Actions Section */}
                <div className="px-4 md:px-8 pt-6 md:pt-2">
                  <h3 className="text-[#111218] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="flex flex-col items-start gap-3 p-4 rounded-xl bg-primary shadow-lg shadow-primary/20 text-white active:scale-95 transition-transform hover:bg-primary/90">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <span className="material-symbols-outlined text-white">add_card</span>
                      </div>
                      <p className="text-sm font-bold leading-tight text-left">Add New<br/>Income</p>
                    </button>
                    <Link href="/accountant/expenses" className="flex flex-col items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm active:scale-95 transition-transform hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg text-primary">
                        <span className="material-symbols-outlined">payments</span>
                      </div>
                      <p className="text-sm font-bold leading-tight text-[#111218] dark:text-white text-left">Record New<br/>Expense</p>
                    </Link>

                    {/* Additional Desktop Quick Actions (Placeholder) */}
                    <button className="hidden md:flex flex-col items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm active:scale-95 transition-transform hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="bg-orange-500/10 p-2 rounded-lg text-orange-600">
                        <span className="material-symbols-outlined">summarize</span>
                      </div>
                      <p className="text-sm font-bold leading-tight text-[#111218] dark:text-white text-left">Generate<br/>Report</p>
                    </button>
                  </div>
                </div>

                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-8 pt-8">
                    {/* Task List Section (Takes up 2 cols on Desktop) */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[#111218] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Operational Tasks</h3>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">8 Pending</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        {/* Task Item */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#111218] dark:text-white">Verify Course Receipts</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">12 receipts from Yoga Intensive</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded">High</span>
                            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                          </div>
                        </div>
                        {/* Task Item */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#111218] dark:text-white">Upload Pani Bill</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Due by EOD today</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">Urgent</span>
                            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                          </div>
                        </div>
                        {/* Task Item */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-[#111218] dark:text-white">Reconcile Goshala Petty Cash</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Maintenance funds for August</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">Review</span>
                            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Budget Health Section (Side Column on Desktop) */}
                    <div>
                      <h3 className="text-[#111218] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Budget Health</h3>
                      <div className="space-y-6 bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700">
                        {/* Progress Item */}
                        <div>
                          <div className="flex justify-between items-end mb-2">
                            <p className="text-sm font-bold text-[#111218] dark:text-white">Wages & Salaries</p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">80% Spent</p>
                          </div>
                          <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="bg-orange-500 h-full rounded-full" style={{ width: '80%' }}></div>
                          </div>
                        </div>
                        {/* Progress Item */}
                        <div>
                          <div className="flex justify-between items-end mb-2">
                            <p className="text-sm font-bold text-[#111218] dark:text-white">Utilities (Water/Elec)</p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">45% Spent</p>
                          </div>
                          <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
                          </div>
                        </div>
                        {/* Progress Item */}
                        <div>
                          <div className="flex justify-between items-end mb-2">
                            <p className="text-sm font-bold text-[#111218] dark:text-white">Goshala Maintenance</p>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">60% Spent</p>
                          </div>
                          <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
          </main>
      </div>

      {/* Bottom Navigation Bar (iOS Style - Mobile Only) */}
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
  );
}
