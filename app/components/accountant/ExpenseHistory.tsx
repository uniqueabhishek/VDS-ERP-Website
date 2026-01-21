'use client';

import React from 'react';

// Mock Data for History
const RECENT_EXPENSES = [
  { id: 1, type: 'Maintenance', vendor: 'ABC Services', date: '2023-10-24', amount: '2,500.00', status: 'Approved' },
  { id: 2, type: 'Utility', vendor: 'Electricity Board', date: '2023-10-22', amount: '1,200.00', status: 'Pending' },
  { id: 3, type: 'Travel', vendor: 'Uber', date: '2023-10-20', amount: '450.00', status: 'Approved' },
];

export default function ExpenseHistory() {
  return (
    <div className="space-y-6 animate-fade-in-up">
         {/* History View */}
         <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
             <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-white/5 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                     <tr>
                         <th scope="col" className="px-6 py-3">Type</th>
                         <th scope="col" className="px-6 py-3">Vendor</th>
                         <th scope="col" className="px-6 py-3">Date</th>
                         <th scope="col" className="px-6 py-3 text-right">Amount</th>
                         <th scope="col" className="px-6 py-3">Status</th>
                     </tr>
                 </thead>
                 <tbody>
                     {RECENT_EXPENSES.map((expense) => (
                         <tr key={expense.id} className="bg-white dark:bg-transparent border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                             <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{expense.type}</td>
                             <td className="px-6 py-4">{expense.vendor}</td>
                             <td className="px-6 py-4">{expense.date}</td>
                             <td className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">₹{expense.amount}</td>
                             <td className="px-6 py-4">
                                 <span className={`px-2 py-1 text-xs font-bold rounded-md ${
                                     expense.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                                     'bg-orange-100 text-orange-700 dark:bg-orange-900/30'
                                 }`}>
                                     {expense.status}
                                 </span>
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
             {RECENT_EXPENSES.length === 0 && (
                 <div className="p-8 text-center text-gray-500">
                     No recent expenses found.
                 </div>
             )}
         </div>
    </div>
  );
}
