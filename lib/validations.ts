import { z } from 'zod'

// Expense Validation Schemas
export const createExpenseSchema = z.object({
  expenseType: z.string().min(1, 'Expense type is required'),
  amount: z.union([
    z.number().positive('Amount must be positive'),
    z.string().transform((val) => {
      const num = parseFloat(val)
      if (isNaN(num) || num <= 0) {
        throw new Error('Amount must be a positive number')
      }
      return num
    }),
  ]),
  expenseDate: z.union([
    z.string().datetime().or(z.string().date()),
    z.date(),
  ]).transform((val) => new Date(val)),
  vendorName: z.string().min(1, 'Vendor name is required'),
  paymentMethod: z.enum(['Cash', 'UPI', 'Bank Transfer', 'Cheque']),
  billNumber: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  receiptPath: z.string().optional().nullable(),
  vendorId: z.string().optional().nullable(),
})

export const updateExpenseSchema = createExpenseSchema.partial()

// Vendor Validation Schemas
export const createVendorSchema = z.object({
  name: z.string().min(1, 'Vendor name is required').trim(),
  contactPerson: z.string().trim().optional().nullable(),
  phone: z.string().trim().optional().nullable(),
  email: z.string().email('Invalid email format').trim().optional().or(z.literal('')).nullable(),
  address: z.string().trim().optional().nullable(),
  gstNumber: z.string().trim().max(15, 'GST number too long').optional().nullable(),
  notes: z.string().trim().optional().nullable(),
})

export const updateVendorSchema = createVendorSchema.partial()

// Fixed Asset Validation Schemas
export const createFixedAssetSchema = z.object({
  assetName: z.string().min(1, 'Asset name is required'),
  description: z.string().optional().nullable(),
  location: z.string().min(1, 'Location is required'),
  purchaseDate: z.union([
    z.string().datetime().or(z.string().date()),
    z.date(),
  ]).transform((val) => new Date(val)),
  purchaseValue: z.union([
    z.number().positive('Purchase value must be positive'),
    z.string().transform((val) => {
      const num = parseFloat(val)
      if (isNaN(num) || num <= 0) {
        throw new Error('Purchase value must be a positive number')
      }
      return num
    }),
  ]),
  currentValue: z.union([
    z.number().nonnegative('Current value cannot be negative'),
    z.string().transform((val) => {
      if (!val) return null
      const num = parseFloat(val)
      if (isNaN(num) || num < 0) {
        throw new Error('Current value must be a non-negative number')
      }
      return num
    }),
  ]).optional().nullable(),
  status: z.enum(['active', 'under maintenance', 'disposed']).default('active'),
  notes: z.string().optional().nullable(),
})

export const updateFixedAssetSchema = createFixedAssetSchema.partial()

// Expense Type Validation Schemas
export const createExpenseTypeSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  description: z.string().trim().optional().nullable(),
})

export const updateExpenseTypeSchema = createExpenseTypeSchema.partial()

// Helper function to validate and return errors
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data)

  if (!result.success) {
    const errors = result.error.issues.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }))
    return { success: false as const, errors }
  }

  return { success: true as const, data: result.data }
}
