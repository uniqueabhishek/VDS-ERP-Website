"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const ROLE_DEFINITIONS = {
  accountant: {
    label: "Accountant (Level 1)",
    description: "Basic financial entry and read-only access to relevant modules."
  },
  administrator: {
    label: "Administrator (Level 2)",
    description: "System configuration and user management capabilities."
  },
  apex: {
    label: "Apex Member (Level 3)",
    description: "Strategic oversight and reporting access across departments."
  },
  coordinator: {
    label: "Trust Office Coordinator (Level 4)",
    description: "Coordination of inter-departmental activities and approvals."
  },
  trustee: {
    label: "Trustee (Level 5)",
    description: "Full unrestricted access to all modules including financial approvals and system settings."
  }
};

type RoleKey = keyof typeof ROLE_DEFINITIONS;

export default function CreateUserPage() {
  const [selectedRole, setSelectedRole] = useState<RoleKey>('trustee');

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex font-display">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark sticky top-0 h-screen overflow-y-auto">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover size-6"
                  data-alt="Art of Living corporate logo"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBS_YmUpDTogeQbYZ4tcqwbTO3LWWv036Ras0Dq5EgNbI4XS_15ktFsmd4rJTzEYDEneRt2265KMIueL6bUZ0LLVbkGnQfyofSNf8pSkO71YDRuYCPktTmwV2v_iFW6Up9iuj3Sk5YKgVlXPrUkouDsEDZ_h7YTVV8-8MakC4blZoFgKw1qklG6JW2GdqrOOAc8oSZ1JRKYgttELJTf1p-2bf7oCZOdt9uEA21INmmJvJdkD5j6ZVnlrUHn4zZjY9J6QcLuuFTWcRGw")' }}
                ></div>
            </div>
            <span className="text-lg font-bold tracking-tight">VDS ERP</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
            <Link href="/accountant/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="text-sm font-medium">Dashboard</span>
            </Link>
             <Link href="/users" className="flex items-center gap-3 px-3 py-2 text-primary bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
                <span className="text-sm font-semibold">Users</span>
            </Link>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                <span className="material-symbols-outlined">inventory_2</span>
                <span className="text-sm font-medium">Inventory</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                <span className="material-symbols-outlined">settings</span>
                <span className="text-sm font-medium">System</span>
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
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center p-4 justify-between max-w-3xl mx-auto w-full md:px-8">
            <Link href="/users" className="flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">arrow_back_ios</span>
              <span className="text-sm font-bold">Back</span>
            </Link>
            <h1 className="text-lg md:text-xl font-bold leading-tight tracking-tight flex-1 text-center pr-8 md:pr-0">Create New User</h1>
             {/* Spacer for desktop alignment if needed, or actions */}
             <div className="hidden md:block w-8"></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-32">
            <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">

                {/* Section 1: Basic Information */}
                <section className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Basic Information</h2>
                <div className="bg-white dark:bg-card-dark rounded-xl p-4 shadow-sm space-y-4 border border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary focus:ring-0 transition-all font-medium" placeholder="Ex. John Doe" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary focus:ring-0 transition-all font-medium" placeholder="Ex. john.doe@vds.org" />
                        </div>
                    </div>
                </div>
                </section>

                {/* Section 2: Role & Permissions */}
                <section className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Role & Access</h2>
                <div className="bg-white dark:bg-card-dark rounded-xl p-4 shadow-sm space-y-6 border border-slate-100 dark:border-slate-800">

                    <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Assign Role</label>
                    <div className="relative">
                        <select
                        className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary focus:ring-0 transition-all font-medium appearance-none"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as RoleKey)}
                        >
                        {Object.entries(ROLE_DEFINITIONS).map(([key, { label }]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">expand_more</span>
                    </div>
                    </div>

                    {/* Dynamic Permission Preview Card */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary mt-1">admin_panel_settings</span>
                        <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Permission Preview</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {ROLE_DEFINITIONS[selectedRole].description}
                        </p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase rounded">Active</span>
                            {selectedRole === 'trustee' && <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] font-bold uppercase rounded">Full Access</span>}
                            {selectedRole === 'accountant' && <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase rounded">Financial Read</span>}
                        </div>
                        </div>
                    </div>
                    </div>

                </div>
                </section>

                {/* Section 3: Security */}
                <section className="space-y-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Security</h2>
                <div className="bg-white dark:bg-card-dark rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Require Password Change</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">User must reset password upon first login.</p>
                    </div>
                    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ios-toggle"/>
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer ios-toggle-label"></label>
                    </div>
                </div>
                </section>
            </div>
        </main>

        {/* Sticky Bottom Actions */}
        <footer className="fixed bottom-0 left-0 right-0 md:left-64 p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-50">
            <div className="max-w-3xl mx-auto flex gap-4 w-full md:px-8">
            <Link href="/users" className="flex-1 px-6 py-4 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-300 active:scale-95 transition-transform flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800">
                Cancel
            </Link>
            <button className="flex-[2] bg-primary text-white px-6 py-4 rounded-xl font-bold active:scale-95 transition-transform shadow-lg shadow-primary/20 hover:bg-primary/90">
                Create User
            </button>
            </div>
        </footer>
      </div>
    </div>
  );
}
