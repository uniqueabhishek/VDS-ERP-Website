'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/app/components/ui/Toast';

interface ExpenseType {
  id: string;
  name: string;
  description?: string;
}

export default function ExpenseTypesPage() {
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const { addToast } = useToast();

  const fetchExpenseTypes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/expense-types');
      if (res.ok) {
        const data = await res.json();
        setExpenseTypes(data);
      }
    } catch (error) {
      addToast('Failed to load expense types', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      const url = isEditing
        ? `/api/expense-types/${isEditing}`
        : '/api/expense-types';

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save');

      addToast(isEditing ? 'Updated successfully' : 'Created successfully', 'success');
      setFormData({ name: '', description: '' });
      setIsEditing(null);
      fetchExpenseTypes();
    } catch (error) {
      addToast('Operation failed', 'error');
    }
  };

  const handleEdit = (type: ExpenseType) => {
    setFormData({ name: type.name, description: type.description || '' });
    setIsEditing(type.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense type?')) return;

    try {
      const res = await fetch(`/api/expense-types/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      addToast('Deleted successfully', 'success');
      fetchExpenseTypes();
    } catch (error) {
       addToast('Failed to delete', 'error');
    }
  };

  const handleCancel = () => {
      setFormData({ name: '', description: '' });
      setIsEditing(null);
  }

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Expense Types</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage categories for your expenses</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Form Section */}
            <div className="md:col-span-1">
                <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm sticky top-6">
                    <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                        {isEditing ? 'Edit Type' : 'Add New Type'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name <span className="text-red-500">*</span></label>
                            <input
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-gray-900 dark:text-white text-sm p-2.5 focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="e.g. Utility"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent text-gray-900 dark:text-white text-sm p-2.5 focus:ring-2 focus:ring-primary focus:border-primary resize-none h-24"
                                placeholder="Optional description..."
                            />
                        </div>
                        <div className="flex gap-2 pt-2">
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-transparent dark:text-gray-300 dark:border-gray-600 dark:hover:bg-white/5"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary/90 shadow-lg shadow-primary/20"
                            >
                                {isEditing ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* List Section */}
            <div className="md:col-span-2">
                <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                    {loading ? (
                       <div className="p-8 space-y-4 animate-pulse">
                           <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                           <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                           <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                       </div>
                    ) : expenseTypes.length > 0 ? (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {expenseTypes.map((type) => (
                                <div key={type.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">{type.name}</h3>
                                        {type.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{type.description}</p>}
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(type)}
                                            className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(type.id)}
                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-gray-500">
                            <span className="material-symbols-outlined text-4xl mb-2 text-gray-300">category</span>
                            <p>No expense types found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
