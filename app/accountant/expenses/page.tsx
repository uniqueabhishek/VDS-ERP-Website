import React from 'react';
import Link from 'next/link';

export default function AccountantExpenseBooking() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#141515] dark:text-white min-h-screen flex">

      {/* Desktop Sidebar (Consistent with Dashboard) */}
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
            <Link href="/accountant/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                <span className="material-symbols-outlined">checklist</span>
                <span className="text-sm font-medium">Tasks</span>
            </a>
            <Link href="/accountant/expenses" className="flex items-center gap-3 px-3 py-2 text-primary bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
                <span className="text-sm font-semibold">Vouchers</span>
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center bg-white/80 dark:bg-background-dark/90 backdrop-blur-md p-4 md:px-8 border-b border-[#dfe2e1] dark:border-white/10 justify-between h-16">
          <div className="flex items-center gap-3">
             {/* Mobile Only Back Button/Logo */}
             <div className="md:hidden flex items-center gap-2">
                <Link href="/accountant/dashboard" className="flex items-center justify-center p-1 -ml-2 rounded-full text-slate-500 hover:text-black dark:hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
                </Link>
                <div className="bg-primary/10 rounded-full p-1 border border-primary/20">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNI47XRhT5A-zXWPUa6t3PvxqCPFbmVV4aESMvjpOPLq5iO1NkF9zboeSBXtkEAJrHJhJVJ_9iiyOm1khOg65wRiR63i_-UlZutgXI96DcTN2YzPh65MB_vyK2a_Kl1HEQjKfxpEu08a1X63Wz2Vi6xHDlIJIhwSguF0NzrtyTBkFOiSGLbvCHPpU4pc6UIQfKwkp6awpWdseZbPioduEzoEtoLcemqGwNhJ7EMIMgJ-FdQcpnE49ONXOcYKWeq-pngHd1JX_qEOk9")' }}></div>
                </div>
             </div>

            <div>
              <h1 className="text-[#141515] dark:text-white text-lg md:text-xl font-bold leading-tight tracking-tight">Expense Booking</h1>
              <p className="text-[10px] md:text-xs text-primary font-bold uppercase tracking-widest hidden md:block">Accountant Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-4">
             {/* Desktop Navigation Tabs */}
             <div className="hidden md:flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg mr-4">
                <button className="px-4 py-1.5 text-sm font-bold rounded-md bg-white dark:bg-primary shadow-sm text-primary dark:text-white transition-all">
                  Book Expense
                </button>
                <button className="px-4 py-1.5 text-sm font-semibold text-[#717a76] dark:text-white/60 hover:text-primary transition-all">
                  History
                </button>
             </div>

            <div className="flex items-center gap-2">
                <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-primary">notifications</span>
                </button>
                <div className="hidden md:flex size-10 bg-purple-100 rounded-full items-center justify-center text-purple-700 font-bold">
                    A
                </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Tabs (Shown only on small screens) */}
        <nav className="md:hidden bg-white dark:bg-background-dark px-4 pt-4 pb-2">
          <div className="flex bg-background-light dark:bg-white/5 p-1 rounded-xl">
            <button className="flex-1 py-2 text-sm font-bold rounded-lg bg-white dark:bg-primary shadow-sm text-primary dark:text-white transition-all">
              Book Expense
            </button>
            <button className="flex-1 py-2 text-sm font-semibold text-[#717a76] dark:text-white/60 transition-all">
              History
            </button>
          </div>
        </nav>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-32 md:pb-8 p-4 md:p-8">
            <div className="max-w-5xl mx-auto w-full space-y-6">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

                    {/* Left Column: Transaction Details */}
                    <div className="space-y-6">
                        {/* Form Group: Core Details */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                            <span className="material-symbols-outlined text-primary size-5 text-lg">receipt_long</span>
                            <h3 className="text-sm font-bold text-[#141515] dark:text-white/80 uppercase tracking-wider">Transaction Details</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-4 bg-white dark:bg-white/5 p-5 md:p-6 rounded-xl ios-shadow border border-[#dfe2e1] dark:border-white/10 shadow-sm">
                            {/* Expense Type */}
                            <label className="flex flex-col w-full">
                                <p className="text-[#141515] dark:text-white/70 text-sm font-semibold pb-2">Expense Type</p>
                                <select className="select-chevron form-input w-full rounded-lg text-[#141515] dark:text-white focus:ring-2 focus:ring-primary/20 border border-[#dfe2e1] dark:border-white/10 bg-white dark:bg-transparent h-12 md:h-14 p-[15px] text-sm md:text-base font-medium">
                                <option value="" className="text-gray-900 dark:text-white dark:bg-zinc-800">Select Category</option>
                                <option value="light" className="text-gray-900 dark:text-white dark:bg-zinc-800">Light Bill</option>
                                <option value="pani" className="text-gray-900 dark:text-white dark:bg-zinc-800">Pani Bill</option>
                                <option value="wages" className="text-gray-900 dark:text-white dark:bg-zinc-800">Wages</option>
                                <option value="maintenance" className="text-gray-900 dark:text-white dark:bg-zinc-800">Maintenance</option>
                                <option value="travel" className="text-gray-900 dark:text-white dark:bg-zinc-800">Travel Expense</option>
                                </select>
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Amount */}
                                <label className="flex flex-col">
                                <p className="text-[#141515] dark:text-white/70 text-sm font-semibold pb-2">Amount (₹)</p>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717a76] font-bold">₹</span>
                                    <input className="form-input w-full rounded-lg text-[#141515] dark:text-white focus:ring-2 focus:ring-primary/20 border border-[#dfe2e1] dark:border-white/10 bg-white dark:bg-transparent h-12 md:h-14 pl-8 pr-4 text-sm md:text-base font-bold" placeholder="0.00" type="number" />
                                </div>
                                </label>
                                {/* Date */}
                                <label className="flex flex-col">
                                <p className="text-[#141515] dark:text-white/70 text-sm font-semibold pb-2">Expense Date</p>
                                <input className="form-input w-full rounded-lg text-[#141515] dark:text-white focus:ring-2 focus:ring-primary/20 border border-[#dfe2e1] dark:border-white/10 bg-white dark:bg-transparent h-12 md:h-14 p-[15px] text-sm md:text-base font-medium" type="date" defaultValue="2023-10-24" />
                                </label>
                            </div>
                            </div>
                        </section>

                        {/* Notes Section (Moved to left col on desktop) */}
                         <section className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                                <span className="material-symbols-outlined text-primary size-5 text-lg">description</span>
                                <h3 className="text-sm font-bold text-[#141515] dark:text-white/80 uppercase tracking-wider">Notes</h3>
                            </div>
                            <label className="flex flex-col">
                                <textarea className="form-input w-full rounded-xl text-[#141515] dark:text-white focus:ring-2 focus:ring-primary/20 border border-[#dfe2e1] dark:border-white/10 bg-white dark:bg-white/5 min-h-[120px] p-4 text-base font-normal leading-relaxed shadow-sm" placeholder="Add additional details about this expense..."></textarea>
                            </label>
                        </section>
                    </div>

                    {/* Right Column: Vendor & Actions */}
                    <div className="space-y-6">
                         {/* Form Group: Payee & Receipt */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                            <span className="material-symbols-outlined text-primary size-5 text-lg">person</span>
                            <h3 className="text-sm font-bold text-[#141515] dark:text-white/80 uppercase tracking-wider">Vendor & Payment</h3>
                            </div>
                            <div className="bg-white dark:bg-white/5 p-5 md:p-6 rounded-xl ios-shadow border border-[#dfe2e1] dark:border-white/10 space-y-4 shadow-sm">
                            <label className="flex flex-col">
                                <p className="text-[#141515] dark:text-white/70 text-sm font-semibold pb-2">Vendor / Payee</p>
                                <input className="form-input w-full rounded-lg text-[#141515] dark:text-white focus:ring-2 focus:ring-primary/20 border border-[#dfe2e1] dark:border-white/10 bg-white dark:bg-transparent h-12 md:h-14 p-[15px] text-sm md:text-base font-medium" placeholder="Enter name" />
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex flex-col">
                                <p className="text-[#141515] dark:text-white/70 text-sm font-semibold pb-2">Method</p>
                                <select className="select-chevron form-input w-full rounded-lg text-[#141515] dark:text-white border border-[#dfe2e1] dark:border-white/10 bg-white dark:bg-transparent h-12 md:h-14 p-[15px] text-sm">
                                    <option className="text-gray-900 dark:text-white dark:bg-zinc-800">Cash</option>
                                    <option className="text-gray-900 dark:text-white dark:bg-zinc-800">Bank Transfer</option>
                                    <option className="text-gray-900 dark:text-white dark:bg-zinc-800">Cheque</option>
                                </select>
                                </label>
                                <label className="flex flex-col">
                                <p className="text-[#141515] dark:text-white/70 text-sm font-semibold pb-2">Bill No.</p>
                                <input className="form-input w-full rounded-lg text-[#141515] dark:text-white border border-[#dfe2e1] dark:border-white/10 bg-white dark:bg-transparent h-12 md:h-14 p-[15px] text-sm" placeholder="#0000" />
                                </label>
                            </div>
                             {/* File Upload Placeholder */}
                             <div className="pt-2">
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                    <span className="material-symbols-outlined text-gray-400 text-3xl mb-2">cloud_upload</span>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Click to upload receipt</p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG up to 5MB</p>
                                </div>
                             </div>
                            </div>
                        </section>

                        {/* Desktop Actions (Hidden on Mobile) */}
                        <div className="hidden md:flex flex-col gap-3 pt-4">
                             <div className="flex gap-4">
                                <button className="flex-1 h-12 bg-white dark:bg-transparent text-slate-600 dark:text-slate-300 border border-gray-300 dark:border-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    Cancel
                                </button>
                                <button className="flex-[2] h-12 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                                    Submit Expense
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {/* Mobile Fixed Action Footer */}
        <footer className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-[#dfe2e1] dark:border-white/10 p-4 pb-8 z-40">
          <div className="flex flex-col gap-3">
            <button className="w-full h-14 bg-primary text-white rounded-xl font-bold text-base shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              Submit & Close
            </button>
            <button className="w-full h-14 bg-primary/10 text-primary dark:text-primary-light rounded-xl font-bold text-base active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-primary/20">
              <span className="material-symbols-outlined text-xl">add</span>
              Submit & Add Another
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
