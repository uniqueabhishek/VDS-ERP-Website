'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/app/components/ui/Toast';
import VendorForm from '@/app/components/accountant/VendorForm';

interface Vendor {
  id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  gstNumber?: string;
  _count: {
    expenses: number;
  };
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const { addToast } = useToast();

  const fetchVendors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/vendors');
      if (!response.ok) throw new Error('Failed to fetch vendors');
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      addToast('Failed to load vendors', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const handleAdd = () => {
    setEditingVendor(null);
    setShowForm(true);
  };

  const handleEdit = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setShowForm(true);
  };

  const handleDelete = async (vendor: Vendor) => {
    if (vendor._count.expenses > 0) {
      addToast(`Cannot delete vendor with ${vendor._count.expenses} linked expense(s)`, 'error');
      return;
    }

    if (!confirm(`Are you sure you want to delete "${vendor.name}"?`)) return;

    try {
      const response = await fetch(`/api/vendors/${vendor.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      addToast('Vendor deleted successfully', 'success');
      fetchVendors();
    } catch (error: any) {
      console.error('Error deleting vendor:', error);
      addToast(error.message || 'Failed to delete vendor', 'error');
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const url = editingVendor ? `/api/vendors/${editingVendor.id}` : '/api/vendors';
      const method = editingVendor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error);
      }

      addToast(editingVendor ? 'Vendor updated successfully' : 'Vendor created successfully', 'success');
      setShowForm(false);
      fetchVendors();
    } catch (error: any) {
      console.error('Error saving vendor:', error);
      addToast(error.message || 'Failed to save vendor', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vendor Management</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage your vendor database</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
            Add Vendor
          </button>
        </div>

        {/* Vendor Form Modal */}
        {showForm && (
          <VendorForm
            vendor={editingVendor}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Vendors Table */}
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Vendor Name</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Contact Person</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Phone</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">GST Number</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase text-center">Expenses</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{vendor.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{vendor.contactPerson || '-'}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{vendor.phone || '-'}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{vendor.gstNumber || '-'}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {vendor._count.expenses}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(vendor)}
                          className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(vendor)}
                          className="p-1.5 text-gray-600 dark:text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {vendors.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600">group</span>
              <p className="mt-4 text-lg font-medium">No vendors found</p>
              <p className="mt-1 text-sm">Click &quot;Add Vendor&quot; to create your first vendor</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
