'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Types for our mock data
type LogType = 'invoice' | 'vendor' | 'system' | 'payment';

interface HistoryLog {
    id: number;
    type: LogType;
    action: string;
    description: string;
    user: {
        name: string;
        avatar: string;
        role: string;
    };
    amount?: string;
    status: 'success' | 'pending' | 'failed' | 'warning';
    timestamp: string; // ISO string for sorting
    displayTime: string; // "2:30 PM"
    dateCategory: 'Today' | 'Yesterday' | 'Last Week';
}

const mockHistory: HistoryLog[] = [
    {
        id: 1,
        type: 'invoice',
        action: 'Invoice Approved',
        description: 'Approved invoice #INV-2024-001 from Tech Solutions Inc.',
        amount: '$2,450.00',
        user: {
            name: 'Sarah Jenkins',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            role: 'Accountant'
        },
        status: 'success',
        timestamp: '2024-01-20T14:30:00',
        displayTime: '2:30 PM',
        dateCategory: 'Today'
    },
    {
        id: 2,
        type: 'vendor',
        action: 'Vendor Updated',
        description: 'Updated banking details for Office Supplies Co.',
        user: {
            name: 'James Wilson',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            role: 'Finance Director'
        },
        status: 'warning',
        timestamp: '2024-01-20T11:15:00',
        displayTime: '11:15 AM',
        dateCategory: 'Today'
    },
    {
        id: 3,
        type: 'payment',
        action: 'Payment Processed',
        description: 'Batch payment processed for 12 approved invoices.',
        amount: '$15,840.50',
        user: {
            name: 'System Automation',
            avatar: '/images/AOL logo.png',
            role: 'System'
        },
        status: 'success',
        timestamp: '2024-01-19T16:45:00',
        displayTime: '4:45 PM',
        dateCategory: 'Yesterday'
    },
    {
        id: 4,
        type: 'invoice',
        action: 'Invoice Rejected',
        description: 'Rejected invoice #INV-992 due to missing tax ID.',
        user: {
            name: 'Sarah Jenkins',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            role: 'Accountant'
        },
        status: 'failed',
        timestamp: '2024-01-19T09:20:00',
        displayTime: '9:20 AM',
        dateCategory: 'Yesterday'
    },
    {
        id: 5,
        type: 'system',
        action: 'Backup Completed',
        description: 'Daily database backup completed successfully.',
        user: {
            name: 'System',
            avatar: '/images/AOL logo.png',
            role: 'SystemBot'
        },
        status: 'success',
        timestamp: '2024-01-15T02:00:00',
        displayTime: '02:00 AM',
        dateCategory: 'Last Week'
    }
];

const getTypeIcon = (type: LogType) => {
    switch (type) {
        case 'invoice': return 'receipt_long';
        case 'vendor': return 'storefront';
        case 'payment': return 'payments';
        case 'system': return 'dns';
        default: return 'info';
    }
};

const getTypeColor = (type: LogType) => {
    switch (type) {
        case 'invoice': return 'text-blue-500 bg-blue-50 dark:bg-blue-500/10';
        case 'vendor': return 'text-purple-500 bg-purple-50 dark:bg-purple-500/10';
        case 'payment': return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10';
        case 'system': return 'text-slate-500 bg-slate-50 dark:bg-slate-500/10';
        default: return 'text-gray-500 bg-gray-50';
    }
};

export default function HistoryPage() {
    const [filter, setFilter] = useState<'all' | LogType>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLogs = mockHistory.filter(log => {
        const matchesFilter = filter === 'all' || log.type === filter;
        const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.action.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Group by Date Category
    const groupedLogs = filteredLogs.reduce((acc, log) => {
        if (!acc[log.dateCategory]) acc[log.dateCategory] = [];
        acc[log.dateCategory].push(log);
        return acc;
    }, {} as Record<string, HistoryLog[]>);

    const categories = ['Today', 'Yesterday', 'Last Week']; // To maintain order

    return (
        <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Audit Log</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track all system activities and financial records.</p>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-2 p-1 bg-white dark:bg-card-dark border border-gray-200 dark:border-border-dark rounded-lg overflow-x-auto no-scrollbar">
                        {(['all', 'invoice', 'payment', 'vendor', 'system'] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize whitespace-nowrap transition-all ${
                                    filter === type
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
                    <input
                        type="text"
                        placeholder="Search by user, action, or details..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-card-dark border border-gray-200 dark:border-border-dark rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400 hover:border-gray-300 dark:hover:border-gray-700"
                    />
                </div>

                {/* Timeline Content */}
                <div className="space-y-8">
                    {categories.map((category) => {
                        const logs = groupedLogs[category];
                        if (!logs || logs.length === 0) return null;

                        return (
                            <section key={category} className="animate-fade-in-up">
                                <div className="flex items-center gap-4 mb-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{category}</h3>
                                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
                                </div>

                                <div className="space-y-4 relative">
                                    {/* Vertical connecting line */}
                                    <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gray-200 dark:bg-gray-800 -z-10"></div>

                                    {logs.map((log) => (
                                        <div key={log.id} className="relative group">
                                            <div className="flex gap-4">
                                                {/* Icon Column */}
                                                <div className={`relative shrink-0 size-14 rounded-2xl border-4 border-background-light dark:border-background-dark flex items-center justify-center ${getTypeColor(log.type)}`}>
                                                    <span className="material-symbols-outlined text-xl">{getTypeIcon(log.type)}</span>
                                                </div>

                                                {/* Content Card */}
                                                <div className="flex-1 bg-white dark:bg-card-dark border border-gray-200 dark:border-border-dark rounded-xl p-4 shadow-sm hover:shadow-md transition-all group-hover:border-primary/30">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex gap-3 items-center">
                                                            <div className="size-8 rounded-full overflow-hidden border border-gray-100 dark:border-gray-700 shrink-0">
                                                                <Image
                                                                    src={log.user.avatar}
                                                                    alt={log.user.name}
                                                                    width={32}
                                                                    height={32}
                                                                    className="object-cover size-full"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{log.action}</h4>
                                                                <p className="text-xs text-slate-500">by <span className="font-medium text-slate-700 dark:text-slate-300">{log.user.name}</span></p>
                                                            </div>
                                                        </div>
                                                        <span className="text-xs font-medium text-slate-400 tabular-nums">{log.displayTime}</span>
                                                    </div>

                                                    <div className="mt-3 pl-11">
                                                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{log.description}</p>

                                                        {log.amount && (
                                                            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                                                                <span className="material-symbols-outlined text-base text-slate-500">attach_money</span>
                                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{log.amount}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}

                    {Object.keys(groupedLogs).length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="size-16 bg-gray-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-3xl text-gray-400">history_toggle_off</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No history found</h3>
                            <p className="text-slate-500 max-w-sm mx-auto mt-2">Try adjusting your search or filters to see more results.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
