'use client';

import React, { useState, useRef } from 'react';

interface ExpenseFormData {
  expenseType: string;
  amount: string;
  date: string;
  notes: string;
  vendor: string;
  paymentMethod: string;
  billNumber: string;
}

interface ExpenseFormProps {
  onSubmit?: (data: ExpenseFormData, file: File | null) => void;
  onCancel?: () => void;
}

export default function ExpenseForm({ onSubmit, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    expenseType: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    vendor: '',
    paymentMethod: 'Cash',
    billNumber: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ExpenseFormData, string>>>({});
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof ExpenseFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size (5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, billNumber: 'File size exceeds 5MB' }));
        return;
      }
      setFile(selectedFile);
      // Create preview for images
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ExpenseFormData, string>> = {};

    if (!formData.expenseType) {
      newErrors.expenseType = 'Please select an expense type';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    if (!formData.vendor.trim()) {
      newErrors.vendor = 'Please enter vendor name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (addAnother: boolean = false) => {
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit(formData, file);
    }

    if (addAnother) {
      // Reset form but keep date
      setFormData({
        expenseType: '',
        amount: '',
        date: formData.date,
        notes: '',
        vendor: '',
        paymentMethod: 'Cash',
        billNumber: '',
      });
      setFile(null);
      setFilePreview(null);
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start animate-fade-in-up">

          {/* Left Column: Transaction Details */}
          <div className="space-y-6">
              {/* Form Group: Core Details */}
              <section className="space-y-4">
                  <div className="flex items-center gap-2 px-1">
                  <span className="material-symbols-outlined text-primary size-5 text-lg">receipt_long</span>
                  <h3 className="text-sm font-bold text-[#141515] dark:text-white/80 uppercase tracking-wider">Transaction Details</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4 bg-white dark:bg-white/5 p-5 md:p-6 rounded-xl ios-shadow border border-[#dfe2e1] dark:border-white/10 shadow-sm transition-all hover:shadow-md">
                  {/* Expense Type */}
                  <label className="flex flex-col w-full group">
                      <p className="text-[#141515] dark:text-white/70 text-sm font-semibold pb-2 group-focus-within:text-primary transition-colors">
                        Expense Type <span className="text-red-500">*</span>
                      </p>
                      <select
                        value={formData.expenseType}
                        onChange={(e) => handleInputChange('expenseType', e.target.value)}
                        className={`select-chevron form-input w-full rounded-lg text-[#141515] dark:text-white focus:ring-2 focus:ring-primary/20 border ${errors.expenseType ? 'border-red-500' : 'border-[#dfe2e1] dark:border-white/10'} bg-white dark:bg-transparent h-12 md:h-14 p-[15px] text-sm md:text-base font-medium transition-colors hover:border-gray-400 dark:hover:border-white/20`}
                      >
                        <option value="" className="text-gray-900 dark:text-white dark:bg-zinc-800">Select Category</option>
                        <option value="light" className="text-gray-900 dark:text-white dark:bg-zinc-800">Light Bill</option>
                        <option value="pani" className="text-gray-900 dark:text-white dark:bg-zinc-800">Pani Bill</option>
                        <option value="wages" className="text-gray-900 dark:text-white dark:bg-zinc-800">Wages</option>
                        <option value="maintenance" className="text-gray-900 dark:text-white dark:bg-zinc-800">Maintenance</option>
                        <option value="travel" className="text-gray-900 dark:text-white dark:bg-zinc-800">Travel Expense</option>
                      </select>
                      {errors.expenseType && <p className="text-red-500 text-xs mt-1">{errors.expenseType}</p>}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                      {/* Amount */}
                      <label className="flex flex-col group">
                      <p className="text-[#141515] dark:text-white/70 text-sm font-semibold pb-2 group-focus-within:text-primary transition-colors">
                        Amount (₹) <span className="text-red-500">*</span>
                      </p>
                      <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717a76] font-bold">₹</span>
                          <input
                            value={formData.amount}
                            onChange={(e) => handleInputChange('amount', e.target.value)}
                            className={`form-input w-full rounded-lg text-[#141515] dark:text-white focus:ring-2 focus:ring-primary/20 border ${errors.amount ? 'border-red-500' : 'border-[#dfe2e1] dark:border-white/10'} bg-white dark:bg-transparent h-12 md:h-14 pl-8 pr-4 text-sm md:text-base font-bold transition-colors hover:border-gray-400 dark:hover:border-white/20`}
                            placeholder="0.00"
                            type="number"
                            min="0"
                            step="0.01"
                          />
                      </div>
                      {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                      </label>
                      {/* Date */}
                      <label className="flex flex-col group">
                      <p className="text-[#141515] dark:text-white/70 text-sm font-semibold pb-2 group-focus-within:text-primary transition-colors">
                        Expense Date <span className="text-red-500">*</span>
                      </p>
                      <input
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className={`form-input w-full rounded-lg text-[#141515] dark:text-white focus:ring-2 focus:ring-primary/20 border ${errors.date ? 'border-red-500' : 'border-[#dfe2e1] dark:border-white/10'} bg-white dark:bg-transparent h-12 md:h-14 p-[15px] text-sm md:text-base font-medium transition-colors hover:border-gray-400 dark:hover:border-white/20`}
                        type="date"
                      />
                      {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                      </label>
                  </div>
                  </div>
              </section>

              {/* Notes Section */}
               <section className="space-y-4">
                  <div className="flex items-center gap-2 px-1">
                      <span className="material-symbols-outlined text-primary size-5 text-lg">description</span>
                      <h3 className="text-sm font-bold text-[#141515] dark:text-white/80 uppercase tracking-wider">Notes</h3>
                  </div>
                  <label className="flex flex-col group">
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        className="form-input w-full rounded-xl text-[#141515] dark:text-white focus:ring-2 focus:ring-primary/20 border border-[#dfe2e1] dark:border-white/10 bg-white dark:bg-white/5 min-h-[120px] p-4 text-base font-normal leading-relaxed shadow-sm transition-colors hover:border-gray-400 dark:hover:border-white/20 resize-none"
                        placeholder="Add additional details about this expense..."
                      ></textarea>
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
                  <div className="bg-white dark:bg-white/5 p-5 md:p-6 rounded-xl ios-shadow border border-[#dfe2e1] dark:border-white/10 space-y-4 shadow-sm transition-all hover:shadow-md">
                  <label className="flex flex-col group">
                      <p className="text-[#141515] dark:text-white/70 text-sm font-semibold pb-2 group-focus-within:text-primary transition-colors">
                        Vendor / Payee <span className="text-red-500">*</span>
                      </p>
                      <input
                        value={formData.vendor}
                        onChange={(e) => handleInputChange('vendor', e.target.value)}
                        className={`form-input w-full rounded-lg text-[#141515] dark:text-white focus:ring-2 focus:ring-primary/20 border ${errors.vendor ? 'border-red-500' : 'border-[#dfe2e1] dark:border-white/10'} bg-white dark:bg-transparent h-12 md:h-14 p-[15px] text-sm md:text-base font-medium transition-colors hover:border-gray-400 dark:hover:border-white/20`}
                        placeholder="Enter name"
                      />
                      {errors.vendor && <p className="text-red-500 text-xs mt-1">{errors.vendor}</p>}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                      <label className="flex flex-col group">
                      <p className="text-[#141515] dark:text-white/70 text-sm font-semibold pb-2 group-focus-within:text-primary transition-colors">Method</p>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="select-chevron form-input w-full rounded-lg text-[#141515] dark:text-white border border-[#dfe2e1] dark:border-white/10 bg-white dark:bg-transparent h-12 md:h-14 p-[15px] text-sm transition-colors hover:border-gray-400 dark:hover:border-white/20 focus:ring-2 focus:ring-primary/20"
                      >
                          <option className="text-gray-900 dark:text-white dark:bg-zinc-800">Cash</option>
                          <option className="text-gray-900 dark:text-white dark:bg-zinc-800">UPI</option>
                          <option className="text-gray-900 dark:text-white dark:bg-zinc-800">Bank Transfer</option>
                          <option className="text-gray-900 dark:text-white dark:bg-zinc-800">Cheque</option>
                      </select>
                      </label>
                      <label className="flex flex-col group">
                      <p className="text-[#141515] dark:text-white/70 text-sm font-semibold pb-2 group-focus-within:text-primary transition-colors">Bill No.</p>
                      <input
                        value={formData.billNumber}
                        onChange={(e) => handleInputChange('billNumber', e.target.value)}
                        className="form-input w-full rounded-lg text-[#141515] dark:text-white border border-[#dfe2e1] dark:border-white/10 bg-white dark:bg-transparent h-12 md:h-14 p-[15px] text-sm transition-colors hover:border-gray-400 dark:hover:border-white/20 focus:ring-2 focus:ring-primary/20"
                        placeholder="#0000"
                      />
                      </label>
                  </div>
                   {/* File Upload */}
                   <div className="pt-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                        id="receipt-upload"
                      />
                      {!file ? (
                        <label
                          htmlFor="receipt-upload"
                          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform origin-center rounded-lg"></div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary text-3xl mb-2 z-10 transition-colors">cloud_upload</span>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 z-10">Click to upload receipt</p>
                            <p className="text-xs text-gray-400 mt-1 z-10">PDF, PNG, JPG up to 5MB</p>
                        </label>
                      ) : (
                        <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 flex items-center gap-4">
                          {filePreview ? (
                            <img src={filePreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
                          ) : (
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                              <span className="material-symbols-outlined text-gray-400 text-2xl">description</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                          </div>
                          <button
                            onClick={removeFile}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            <span className="material-symbols-outlined text-gray-500">close</span>
                          </button>
                        </div>
                      )}
                   </div>
                  </div>
              </section>

              {/* Desktop Actions (Hidden on Mobile) */}
              <div className="hidden md:flex flex-col gap-3 pt-4">
                   <div className="flex gap-4">
                      <button
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="flex-1 h-12 bg-white dark:bg-transparent text-slate-600 dark:text-slate-300 border border-gray-300 dark:border-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
                      >
                          Cancel
                      </button>
                      <button
                        onClick={() => handleSubmit(false)}
                        disabled={isSubmitting}
                        className="flex-[2] h-12 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                          {isSubmitting ? (
                            <>
                              <span className="material-symbols-outlined animate-spin">progress_activity</span>
                              Submitting...
                            </>
                          ) : (
                            'Submit Expense'
                          )}
                      </button>
                   </div>
              </div>
          </div>
      </div>

      {/* Mobile Fixed Action Footer */}
      <footer className="md:hidden fixed bottom-16 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-[#dfe2e1] dark:border-white/10 p-4 z-40">
          <div className="flex flex-col gap-3">
              <button
                onClick={() => handleSubmit(false)}
                disabled={isSubmitting}
                className="w-full h-12 bg-primary text-white rounded-xl font-bold text-base shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Submitting...
                  </>
                ) : (
                  'Submit Expense'
                )}
              </button>
              <button
                onClick={() => handleSubmit(true)}
                disabled={isSubmitting}
                className="w-full h-12 bg-primary/10 text-primary dark:text-primary-light rounded-xl font-bold text-base active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-primary/20 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-xl">add</span>
                Submit & Add Another
              </button>
          </div>
      </footer>
    </>
  );
}
