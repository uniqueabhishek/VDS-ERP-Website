// API Response Types
export interface ApiError {
  error: string
  details?: string
  statusCode?: number
}

export interface ApiSuccess<T = unknown> {
  data?: T
  message?: string
}

// Expense Types
export interface ExpenseFormData {
  expenseType: string
  amount: string | number
  expenseDate: string | Date
  vendorName: string
  paymentMethod: string
  billNumber?: string | null
  description?: string | null
  receiptPath?: string | null
  vendorId?: string | null
}

export interface ExpenseWhereInput {
  expenseDate?: {
    gte: Date
    lte: Date
  }
  expenseType?: string
}

// Vendor Types
export interface VendorFormData {
  name: string
  contactPerson?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  gstNumber?: string | null
  notes?: string | null
}

export interface VendorWithCount {
  id: string
  name: string
  contactPerson: string | null
  phone: string | null
  email: string | null
  address: string | null
  gstNumber: string | null
  notes: string | null
  createdAt: Date
  updatedAt: Date
  _count: {
    expenses: number
  }
}

// Fixed Asset Types
export interface FixedAssetFormData {
  assetName: string
  description?: string | null
  location: string
  purchaseDate: string | Date
  purchaseValue: string | number
  currentValue?: string | number | null
  status: string
  notes?: string | null
}

export interface FixedAssetWhereInput {
  status?: string
  location?: string
}

// Expense Type
export interface ExpenseTypeFormData {
  name: string
  description?: string | null
}

// Upload Types
export interface UploadResponse {
  path: string
  filename: string
  size: number
  mimetype: string
}
