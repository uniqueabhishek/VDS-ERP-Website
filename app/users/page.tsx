'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const users = [
  {
    id: 1,
    name: 'James Wilson',
    role: 'Finance Director',
    empId: '#VDS-882',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'online',
    tags: ['Finance', 'Approver'],
    badgeClass: 'bg-blue-500/10 text-blue-500',
    badgeText: 'Director'
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Accountant',
    empId: '#VDS-402',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: 'offline',
    tags: ['Payroll', 'Audit'],
    badgeClass: 'bg-blue-500/10 text-blue-500',
    badgeText: 'Accountant'
  },
  {
    id: 3,
    name: 'Marcus Thorne',
    role: 'Operations Manager',
    empId: '#VDS-115',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsA8qxX-VNP46tFF7hiBeYDe4kyVNqSam-daBhHYJZHGCcb4ctG_4gkPie3RPHCPCqEaQdkeKQM6Qc-EVdocLJnZLRKGZ20cNBvijcon0ka3XlIdorFrlhJ88MsQqJY0Lh6K8_WH2UzF1maGGF_dEGVEQcFN-9SZq8cH3KEupDYhV-L3UehbmbPwOD6cBUxDGFo1HaD4d7kBg88STFEIueSEXIigl0UqsIMCp9DgrbvaWplCG2gapWNbMR9YqzeKuMXPMTvxVO_YyI',
    status: 'online',
    tags: ['Operations', 'Logistics'],
    badgeClass: 'bg-indigo-500/10 text-indigo-500',
    badgeText: 'Manager'
  },
  {
    id: 4,
    name: 'Elena Rodriguez',
    role: 'Billing Clerk',
    empId: '#VDS-229',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSgz3ScroFhcsF_sM76MrAr58gqKQJfookWANzgk2q8Rul72xssMPHUhrjW2GdSeKFf1t1bTH12P9h1CI_7tGayh91yunFaLStcGEj5ij6R33J85CUa3sXfVXbPTU37rXoKkJoXKfIzxg5MQsfsJOurDAq7u5PVj4x2bVGw4pIzpTKJl5w_1bxcZRTxMBSYgZ4eGv9uD9NYeb0pJnVzQLsDTp1e4XOQVN5CnnqSgFCfjrGNXi4kOfI4QZGynW5FAN-x8Du4xkgsG',
    status: 'busy',
    tags: ['Billing'],
    badgeClass: 'bg-emerald-500/10 text-emerald-500',
    badgeText: 'Clerk'
  }
];

export default function UserManagementPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen flex">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark sticky top-0 h-screen overflow-y-auto">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                <Image
                  src="/images/AOL logo.png"
                  alt="VDS ERP Logo"
                  className="object-contain w-6 h-6"
                  width={24}
                  height={24}
                />
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-border-dark h-16 flex items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-3 md:hidden">
               <div className="flex size-10 shrink-0 items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">menu</span>
              </div>
               <h2 className="text-lg font-bold leading-tight tracking-tight text-center">User Management</h2>
            </div>

            <div className="hidden md:flex">
                <h1 className="text-xl font-bold">User Management</h1>
            </div>

            <div className="flex items-center justify-end">
                <Link href="/users/create" className="flex items-center gap-2 px-4 h-10 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-xl">person_add</span>
                  <span className="text-sm font-bold">Create New User</span>
                </Link>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto pb-24 md:pb-8">
             <div className="max-w-7xl mx-auto w-full px-4 md:px-8 space-y-6">

                {/* Search Bar Component */}
                <div className="py-3 md:pt-6">
                  <label className="flex flex-col w-full md:max-w-md">
                    <div className="flex w-full items-stretch rounded-xl h-11 bg-white dark:bg-card-dark border border-gray-200 dark:border-border-dark overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                      <div className="text-slate-400 flex items-center justify-center pl-4">
                        <span className="material-symbols-outlined">search</span>
                      </div>
                      <input className="form-input flex w-full border-none bg-transparent focus:outline-0 focus:ring-0 text-base font-normal placeholder:text-slate-400" placeholder="Search by name or ID"  />
                      <div className="flex items-center pr-3 text-slate-400">
                        <span className="material-symbols-outlined text-xl">tune</span>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Hierarchy Section */}
                <section>
                  <div className="flex items-center justify-between pt-4 pb-2 md:pt-0">
                    <h3 className="text-lg font-bold leading-tight tracking-tight">Hierarchy Overview</h3>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full uppercase tracking-wider">Active View</span>
                  </div>
                  <div className="flex overflow-x-auto gap-3 py-4 no-scrollbar">
                    {/* TextGrid cards... kept same but wrapped for horizontal scroll */}
                    <div className="flex shrink-0 gap-3 rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-card-dark p-3 items-center min-w-[140px]">
                      <span className="material-symbols-outlined text-primary">verified_user</span>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Trustees</span>
                        <h2 className="text-base font-bold">2</h2>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-3 rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-card-dark p-3 items-center min-w-[140px]">
                      <span className="material-symbols-outlined text-primary">corporate_fare</span>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Directors</span>
                        <h2 className="text-base font-bold">5</h2>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-3 rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-card-dark p-3 items-center min-w-[140px]">
                      <span className="material-symbols-outlined text-primary">groups</span>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Managers</span>
                        <h2 className="text-base font-bold">12</h2>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-3 rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-card-dark p-3 items-center min-w-[140px]">
                      <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Accountants</span>
                        <h2 className="text-base font-bold">10</h2>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-3 rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-card-dark p-3 items-center min-w-[140px]">
                      <span className="material-symbols-outlined text-primary">description</span>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Clerks</span>
                        <h2 className="text-base font-bold">45</h2>
                      </div>
                    </div>
                  </div>
                </section>

                {/* User Content Section */}
                <section>
                  <h3 className="text-lg font-bold leading-tight tracking-tight pb-4 pt-4 md:pt-0">Staff Members</h3>

                  {viewMode === 'grid' ? (
                    /* GRID VIEW */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {users.map((user) => (
                        <div key={user.id} className="flex flex-col rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-card-dark overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative">
                          <div className="p-5 flex items-start gap-4">
                            <div className="relative shrink-0">
                              <Image
                                className="rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                                alt="Portrait"
                                src={user.image}
                                width={64}
                                height={64}
                              />
                              <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white dark:border-card-dark rounded-full ${user.status === 'online' ? 'bg-green-500' : user.status === 'busy' ? 'bg-amber-500' : 'bg-gray-400'}`}></span>
                            </div>
                            <div className="flex-1 min-w-0 pt-1">
                              <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">{user.name}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{user.role}</p>
                                </div>
                                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full font-bold">{user.empId}</span>
                              </div>

                              <div className="mt-4 flex flex-wrap gap-2">
                                 {user.tags.map((tag, idx) => (
                                     <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                        {tag}
                                     </span>
                                 ))}
                              </div>
                            </div>
                          </div>

                          {/* Action Overlay */}
                          <div className="bg-gray-50 dark:bg-slate-800/50 p-3 flex gap-3 border-t border-gray-100 dark:border-gray-700">
                             <button className="flex-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">lock_reset</span>
                                Reset
                             </button>
                             <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                             <button className="flex-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">edit</span>
                                Edit Profile
                             </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* LIST VIEW */
                    <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-border-dark overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-slate-800/50">
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">User</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Role</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider hidden md:table-cell">Tags</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                 <div className="relative shrink-0">
                                                    <Image
                                                      className="rounded-full object-cover"
                                                      alt=""
                                                      src={user.image}
                                                      width={40}
                                                      height={40}
                                                    />
                                                    <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white dark:border-card-dark rounded-full ${user.status === 'online' ? 'bg-green-500' : user.status === 'busy' ? 'bg-amber-500' : 'bg-gray-400'}`}></span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                                                    <p className="text-xs text-slate-500">{user.empId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${user.badgeClass}`}>
                                                {user.badgeText}
                                            </span>
                                        </td>
                                         <td className="p-4 hidden md:table-cell">
                                            <div className="flex gap-1.5 flex-wrap">
                                                {user.tags.map((tag, idx) => (
                                                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded border border-gray-200 dark:border-slate-700">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-lg">edit</span>
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                    <span className="material-symbols-outlined text-lg">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                  )}

                </section>
             </div>
          </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-white dark:bg-card-dark rounded-full shadow-2xl border border-gray-200 dark:border-border-dark p-1.5 z-50">
        <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${viewMode === 'list' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-primary'}`}
        >
          <span className="material-symbols-outlined text-xl">list</span>
          <span className="text-sm font-semibold">List</span>
        </button>
        <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-primary'}`}
        >
          <span className="material-symbols-outlined text-xl">grid_view</span>
          <span className="text-sm font-semibold">Cards</span>
        </button>
      </div>

      {/* Tab Bar Placeholder (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/80 dark:bg-background-dark/80 backdrop-blur-lg border-t border-gray-200 dark:border-border-dark flex items-start pt-3 justify-around px-6 opacity-80 z-40">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/users" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined">person_outline</span>
          <span className="text-[10px] font-medium">Users</span>
        </Link>
        <a href="#" className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-[10px] font-medium">Inventory</span>
        </a>
        <a href="#" className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-medium">System</span>
        </a>
      </nav>
    </div>
  );
}
