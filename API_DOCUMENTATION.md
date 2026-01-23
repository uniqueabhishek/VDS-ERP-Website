# API Documentation

Complete reference for all VDS ERP REST API endpoints.

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL](#base-url)
4. [Common Response Formats](#common-response-formats)
5. [Error Handling](#error-handling)
6. [Endpoints](#endpoints)
   - [Authentication](#authentication-endpoints)
   - [Expenses](#expenses-endpoints)
   - [Vendors](#vendors-endpoints)
   - [Fixed Assets](#fixed-assets-endpoints)
   - [Expense Types](#expense-types-endpoints)
   - [File Upload](#file-upload-endpoints)

---

## Overview

The VDS ERP API is a RESTful API built with Next.js Route Handlers. All endpoints:

- Accept and return JSON (except file uploads)
- Require authentication (except `/api/auth/*`)
- Use standard HTTP methods (GET, POST, PUT, DELETE)
- Return appropriate HTTP status codes
- Support pagination and filtering where applicable

## Authentication

All API endpoints (except authentication endpoints) require a valid session cookie.

### Authentication Method

The API uses **JWT-based session cookies** managed by NextAuth.js.

**Cookie Name:** `next-auth.session-token` (HTTP-only, secure in production)

### Obtaining a Session

1. Call `POST /api/auth/signin` with credentials
2. Server responds with `Set-Cookie` header
3. Browser automatically includes cookie in subsequent requests

### Session Validation

All protected routes validate the session:

```typescript
const session = await getServerSession(authOptions);
if (!session) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

---

## Base URL

### Development
```
http://localhost:3000
```

### Production
```
https://your-domain.com
```

---

## Common Response Formats

### Success Response

```json
{
  "expense": {
    "id": "clx123abc456",
    "expenseType": "Utilities",
    "amount": 5000,
    "expenseDate": "2025-01-15T00:00:00.000Z",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

### List Response

```json
{
  "expenses": [
    { "id": "1", "amount": 5000, ... },
    { "id": "2", "amount": 3000, ... }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "pageSize": 20,
    "totalPages": 3
  }
}
```

*Note: Pagination is planned for future implementation. Currently, all endpoints return full lists.*

---

## Error Handling

### Error Response Format

```json
{
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET request |
| 201 | Created | Successful POST request |
| 400 | Bad Request | Validation error, malformed input |
| 401 | Unauthorized | Missing or invalid session |
| 403 | Forbidden | Valid session but insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate entry (e.g., unique constraint) |
| 500 | Internal Server Error | Unexpected server error |

### Validation Errors

When input validation fails (Zod schema), the response includes details:

```json
{
  "error": [
    {
      "path": ["amount"],
      "message": "Amount must be positive"
    },
    {
      "path": ["expenseType"],
      "message": "Expense type is required"
    }
  ]
}
```

---

## Endpoints

---

## Authentication Endpoints

### Sign In

Authenticate a user and create a session.

**Endpoint:** `POST /api/auth/signin`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "admin@vds.com",
  "password": "admin123"
}
```

**Success Response (200):**
```json
{
  "url": "/accountant/dashboard"
}
```

**Headers:**
```
Set-Cookie: next-auth.session-token=eyJhbGciOiJIUzI1NiJ9...; Path=/; HttpOnly; Secure
```

**Error Responses:**

- **401 Unauthorized:** Invalid credentials
  ```json
  { "error": "Invalid email or password" }
  ```

**Example (cURL):**
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@vds.com", "password": "admin123"}' \
  -c cookies.txt
```

**Example (JavaScript):**
```javascript
const response = await fetch('/api/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@vds.com',
    password: 'admin123'
  }),
  credentials: 'include' // Important: include cookies
});

if (response.ok) {
  window.location.href = '/accountant/dashboard';
}
```

---

### Sign Out

End the user's session.

**Endpoint:** `POST /api/auth/signout`

**Authentication:** Required

**Success Response (200):**
```json
{
  "url": "/login"
}
```

---

### Get Session

Retrieve the current user's session information.

**Endpoint:** `GET /api/auth/session`

**Authentication:** Required

**Success Response (200):**
```json
{
  "user": {
    "id": "clx123abc456",
    "email": "admin@vds.com",
    "fullName": "Admin User",
    "role": "accountant"
  },
  "expires": "2025-02-01T00:00:00.000Z"
}
```

**Error Response (401):**
```json
{}
```

---

## Expenses Endpoints

### List Expenses

Retrieve all expenses with optional filtering.

**Endpoint:** `GET /api/expenses`

**Authentication:** Required

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| startDate | ISO 8601 date | No | Filter expenses from this date (inclusive) |
| endDate | ISO 8601 date | No | Filter expenses until this date (inclusive) |
| type | string | No | Filter by expense type |
| vendorId | string | No | Filter by vendor ID |

**Example Request:**
```
GET /api/expenses?startDate=2025-01-01&endDate=2025-01-31&type=Utilities
```

**Success Response (200):**
```json
{
  "expenses": [
    {
      "id": "clx123abc456",
      "expenseType": "Utilities",
      "amount": 5000,
      "expenseDate": "2025-01-15T00:00:00.000Z",
      "vendorName": "Power Company",
      "paymentMethod": "Bank Transfer",
      "billNumber": "BILL-001",
      "description": "Electricity bill for January",
      "receiptPath": "/uploads/receipt-123.pdf",
      "createdBy": "clx789def012",
      "vendorId": "clx456ghi789",
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z",
      "user": {
        "id": "clx789def012",
        "fullName": "Admin User",
        "email": "admin@vds.com"
      },
      "vendor": {
        "id": "clx456ghi789",
        "name": "Power Company",
        "contactPerson": "John Doe",
        "phone": "+91-9876543210",
        "gstNumber": "27AABCU9603R1Z5"
      }
    }
  ]
}
```

**Example (cURL):**
```bash
curl -X GET "http://localhost:3000/api/expenses?startDate=2025-01-01" \
  -H "Cookie: next-auth.session-token=..."
```

**Example (JavaScript):**
```javascript
const response = await fetch('/api/expenses?startDate=2025-01-01', {
  credentials: 'include'
});
const data = await response.json();
console.log(data.expenses);
```

---

### Get Single Expense

Retrieve a specific expense by ID.

**Endpoint:** `GET /api/expenses/[id]`

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): The expense ID

**Success Response (200):**
```json
{
  "expense": {
    "id": "clx123abc456",
    "expenseType": "Utilities",
    "amount": 5000,
    "expenseDate": "2025-01-15T00:00:00.000Z",
    "vendorName": "Power Company",
    "paymentMethod": "Bank Transfer",
    "billNumber": "BILL-001",
    "description": "Electricity bill for January",
    "receiptPath": "/uploads/receipt-123.pdf",
    "createdBy": "clx789def012",
    "vendorId": "clx456ghi789",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z",
    "user": {
      "id": "clx789def012",
      "fullName": "Admin User"
    },
    "vendor": {
      "id": "clx456ghi789",
      "name": "Power Company"
    }
  }
}
```

**Error Response (404):**
```json
{
  "error": "Expense not found"
}
```

---

### Create Expense

Create a new expense record.

**Endpoint:** `POST /api/expenses`

**Authentication:** Required

**Request Body:**
```json
{
  "expenseType": "Utilities",
  "amount": 5000,
  "expenseDate": "2025-01-15",
  "vendorName": "Power Company",
  "paymentMethod": "Bank Transfer",
  "billNumber": "BILL-001",
  "description": "Electricity bill for January",
  "receiptPath": "/uploads/receipt-123.pdf",
  "vendorId": "clx456ghi789"
}
```

**Field Validation:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| expenseType | string | Yes | Min 1 character |
| amount | number | Yes | Must be positive |
| expenseDate | ISO date | Yes | Valid date |
| vendorName | string | Yes | Min 1 character |
| paymentMethod | enum | Yes | "Cash", "UPI", "Bank Transfer", "Cheque" |
| billNumber | string | No | - |
| description | string | No | - |
| receiptPath | string | No | - |
| vendorId | string | No | Must be valid vendor ID if provided |

**Success Response (201):**
```json
{
  "expense": {
    "id": "clx123abc456",
    "expenseType": "Utilities",
    "amount": 5000,
    "expenseDate": "2025-01-15T00:00:00.000Z",
    "vendorName": "Power Company",
    "paymentMethod": "Bank Transfer",
    "billNumber": "BILL-001",
    "description": "Electricity bill for January",
    "receiptPath": "/uploads/receipt-123.pdf",
    "createdBy": "clx789def012",
    "vendorId": "clx456ghi789",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": [
    {
      "path": ["amount"],
      "message": "Amount must be positive"
    }
  ]
}
```

**Example (JavaScript):**
```javascript
const response = await fetch('/api/expenses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    expenseType: 'Utilities',
    amount: 5000,
    expenseDate: '2025-01-15',
    vendorName: 'Power Company',
    paymentMethod: 'Bank Transfer'
  })
});

if (response.ok) {
  const data = await response.json();
  console.log('Created expense:', data.expense);
}
```

---

### Update Expense

Update an existing expense.

**Endpoint:** `PUT /api/expenses/[id]`

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): The expense ID

**Request Body:**
```json
{
  "amount": 5500,
  "description": "Updated description"
}
```

*Note: Only include fields you want to update. All fields are optional.*

**Success Response (200):**
```json
{
  "expense": {
    "id": "clx123abc456",
    "expenseType": "Utilities",
    "amount": 5500,
    "description": "Updated description",
    "updatedAt": "2025-01-16T14:20:00.000Z",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "error": "Expense not found"
}
```

---

### Delete Expense

Permanently delete an expense.

**Endpoint:** `DELETE /api/expenses/[id]`

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): The expense ID

**Success Response (200):**
```json
{
  "message": "Expense deleted successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Expense not found"
}
```

**Example (JavaScript):**
```javascript
const response = await fetch(`/api/expenses/${expenseId}`, {
  method: 'DELETE',
  credentials: 'include'
});

if (response.ok) {
  console.log('Expense deleted');
}
```

---

## Vendors Endpoints

### List Vendors

Retrieve all vendors.

**Endpoint:** `GET /api/vendors`

**Authentication:** Required

**Success Response (200):**
```json
{
  "vendors": [
    {
      "id": "clx456ghi789",
      "name": "Power Company",
      "contactPerson": "John Doe",
      "phone": "+91-9876543210",
      "email": "contact@powerco.com",
      "address": "123 Main St, Mumbai, MH 400001",
      "gstNumber": "27AABCU9603R1Z5",
      "notes": "Main electricity provider",
      "createdBy": "clx789def012",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-10T00:00:00.000Z",
      "expenses": [
        {
          "id": "clx123abc456",
          "amount": 5000,
          "expenseDate": "2025-01-15T00:00:00.000Z"
        }
      ],
      "_count": {
        "expenses": 12
      }
    }
  ]
}
```

---

### Get Single Vendor

Retrieve a specific vendor by ID.

**Endpoint:** `GET /api/vendors/[id]`

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): The vendor ID

**Success Response (200):**
```json
{
  "vendor": {
    "id": "clx456ghi789",
    "name": "Power Company",
    "contactPerson": "John Doe",
    "phone": "+91-9876543210",
    "email": "contact@powerco.com",
    "address": "123 Main St, Mumbai, MH 400001",
    "gstNumber": "27AABCU9603R1Z5",
    "notes": "Main electricity provider",
    "createdBy": "clx789def012",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-10T00:00:00.000Z",
    "expenses": []
  }
}
```

**Error Response (404):**
```json
{
  "error": "Vendor not found"
}
```

---

### Create Vendor

Create a new vendor.

**Endpoint:** `POST /api/vendors`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Power Company",
  "contactPerson": "John Doe",
  "phone": "+91-9876543210",
  "email": "contact@powerco.com",
  "address": "123 Main St, Mumbai, MH 400001",
  "gstNumber": "27AABCU9603R1Z5",
  "notes": "Main electricity provider"
}
```

**Field Validation:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | Yes | Min 1 character, unique |
| contactPerson | string | No | - |
| phone | string | No | - |
| email | string | No | Valid email format |
| address | string | No | - |
| gstNumber | string | No | Max 15 characters, format: XXXXXXXXXXXX |
| notes | string | No | - |

**Success Response (201):**
```json
{
  "vendor": {
    "id": "clx456ghi789",
    "name": "Power Company",
    "contactPerson": "John Doe",
    "phone": "+91-9876543210",
    "email": "contact@powerco.com",
    "address": "123 Main St, Mumbai, MH 400001",
    "gstNumber": "27AABCU9603R1Z5",
    "notes": "Main electricity provider",
    "createdBy": "clx789def012",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Error Response (409):**
```json
{
  "error": "Vendor with this name already exists"
}
```

---

### Update Vendor

Update an existing vendor.

**Endpoint:** `PUT /api/vendors/[id]`

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): The vendor ID

**Request Body:**
```json
{
  "phone": "+91-9876543211",
  "notes": "Updated contact information"
}
```

**Success Response (200):**
```json
{
  "vendor": {
    "id": "clx456ghi789",
    "name": "Power Company",
    "phone": "+91-9876543211",
    "notes": "Updated contact information",
    "updatedAt": "2025-01-16T14:20:00.000Z",
    ...
  }
}
```

---

### Delete Vendor

Permanently delete a vendor.

**Endpoint:** `DELETE /api/vendors/[id]`

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): The vendor ID

**Success Response (200):**
```json
{
  "message": "Vendor deleted successfully"
}
```

**Error Response (409):**
```json
{
  "error": "Cannot delete vendor with existing expenses"
}
```

*Note: If vendor has associated expenses, those expenses' `vendorId` will be set to null (due to `onDelete: SetNull` in schema).*

---

## Fixed Assets Endpoints

### List Fixed Assets

Retrieve all fixed assets.

**Endpoint:** `GET /api/fixed-assets`

**Authentication:** Required

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | enum | No | Filter by status: "active", "under maintenance", "disposed" |

**Success Response (200):**
```json
{
  "assets": [
    {
      "id": "clx789jkl012",
      "assetName": "Dell Laptop",
      "description": "Workstation for accountant",
      "location": "Main Office",
      "purchaseDate": "2024-06-01T00:00:00.000Z",
      "purchaseValue": 75000,
      "currentValue": 60000,
      "status": "active",
      "notes": "Good condition",
      "createdBy": "clx789def012",
      "createdAt": "2024-06-01T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z",
      "user": {
        "id": "clx789def012",
        "fullName": "Admin User"
      }
    }
  ]
}
```

---

### Get Single Fixed Asset

Retrieve a specific fixed asset by ID.

**Endpoint:** `GET /api/fixed-assets/[id]`

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): The asset ID

**Success Response (200):**
```json
{
  "asset": {
    "id": "clx789jkl012",
    "assetName": "Dell Laptop",
    "description": "Workstation for accountant",
    "location": "Main Office",
    "purchaseDate": "2024-06-01T00:00:00.000Z",
    "purchaseValue": 75000,
    "currentValue": 60000,
    "status": "active",
    "notes": "Good condition",
    "createdBy": "clx789def012",
    "createdAt": "2024-06-01T10:00:00.000Z",
    "updatedAt": "2025-01-15T10:00:00.000Z",
    "user": {
      "id": "clx789def012",
      "fullName": "Admin User"
    }
  }
}
```

---

### Create Fixed Asset

Create a new fixed asset.

**Endpoint:** `POST /api/fixed-assets`

**Authentication:** Required

**Request Body:**
```json
{
  "assetName": "Dell Laptop",
  "description": "Workstation for accountant",
  "location": "Main Office",
  "purchaseDate": "2024-06-01",
  "purchaseValue": 75000,
  "currentValue": 60000,
  "status": "active",
  "notes": "Good condition"
}
```

**Field Validation:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| assetName | string | Yes | Min 1 character |
| description | string | No | - |
| location | string | Yes | Min 1 character |
| purchaseDate | ISO date | Yes | Valid date |
| purchaseValue | number | Yes | Must be positive |
| currentValue | number | No | Must be positive if provided |
| status | enum | Yes | "active", "under maintenance", "disposed" |
| notes | string | No | - |

**Success Response (201):**
```json
{
  "asset": {
    "id": "clx789jkl012",
    "assetName": "Dell Laptop",
    "description": "Workstation for accountant",
    "location": "Main Office",
    "purchaseDate": "2024-06-01T00:00:00.000Z",
    "purchaseValue": 75000,
    "currentValue": 60000,
    "status": "active",
    "notes": "Good condition",
    "createdBy": "clx789def012",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

---

### Update Fixed Asset

Update an existing fixed asset.

**Endpoint:** `PUT /api/fixed-assets/[id]`

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): The asset ID

**Request Body:**
```json
{
  "currentValue": 55000,
  "status": "under maintenance",
  "notes": "Sent for repairs"
}
```

**Success Response (200):**
```json
{
  "asset": {
    "id": "clx789jkl012",
    "currentValue": 55000,
    "status": "under maintenance",
    "notes": "Sent for repairs",
    "updatedAt": "2025-01-16T14:20:00.000Z",
    ...
  }
}
```

---

### Delete Fixed Asset

Permanently delete a fixed asset.

**Endpoint:** `DELETE /api/fixed-assets/[id]`

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): The asset ID

**Success Response (200):**
```json
{
  "message": "Fixed asset deleted successfully"
}
```

---

## Expense Types Endpoints

### List Expense Types

Retrieve all expense types.

**Endpoint:** `GET /api/expense-types`

**Authentication:** Required

**Success Response (200):**
```json
{
  "expenseTypes": [
    {
      "id": "clx111aaa111",
      "name": "Utilities",
      "description": "Electricity, water, gas bills",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    },
    {
      "id": "clx222bbb222",
      "name": "Wages",
      "description": "Employee salaries and wages",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Create Expense Type

Create a new expense type.

**Endpoint:** `POST /api/expense-types`

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Office Supplies",
  "description": "Stationery, printer ink, etc."
}
```

**Field Validation:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | Yes | Min 1 character, unique |
| description | string | No | - |

**Success Response (201):**
```json
{
  "expenseType": {
    "id": "clx333ccc333",
    "name": "Office Supplies",
    "description": "Stationery, printer ink, etc.",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Error Response (409):**
```json
{
  "error": "Expense type with this name already exists"
}
```

---

### Update Expense Type

Update an existing expense type.

**Endpoint:** `PUT /api/expense-types/[id]`

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): The expense type ID

**Request Body:**
```json
{
  "description": "Updated description"
}
```

**Success Response (200):**
```json
{
  "expenseType": {
    "id": "clx333ccc333",
    "name": "Office Supplies",
    "description": "Updated description",
    "updatedAt": "2025-01-16T14:20:00.000Z",
    ...
  }
}
```

---

### Delete Expense Type

Permanently delete an expense type.

**Endpoint:** `DELETE /api/expense-types/[id]`

**Authentication:** Required

**URL Parameters:**
- `id` (string, required): The expense type ID

**Success Response (200):**
```json
{
  "message": "Expense type deleted successfully"
}
```

---

## File Upload Endpoints

### Upload File

Upload a file (e.g., receipt image/PDF).

**Endpoint:** `POST /api/upload`

**Authentication:** Required

**Content-Type:** `multipart/form-data`

**Request Body:**
- `file` (binary): The file to upload

**Accepted File Types:**
- Images: `.jpg`, `.jpeg`, `.png`, `.gif`
- Documents: `.pdf`

**Max File Size:** 5 MB

**Success Response (201):**
```json
{
  "filePath": "/uploads/receipt-1706178600000-abc123.pdf",
  "fileName": "receipt-1706178600000-abc123.pdf",
  "fileSize": 245632,
  "mimeType": "application/pdf"
}
```

**Error Response (400):**
```json
{
  "error": "File type not allowed. Allowed: jpg, jpeg, png, gif, pdf"
}
```

**Example (JavaScript with FormData):**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
  credentials: 'include'
});

if (response.ok) {
  const data = await response.json();
  console.log('File uploaded:', data.filePath);
  // Use data.filePath when creating expense
}
```

**Example (cURL):**
```bash
curl -X POST http://localhost:3000/api/upload \
  -H "Cookie: next-auth.session-token=..." \
  -F "file=@/path/to/receipt.pdf"
```

---

## Rate Limiting

**Current Status:** Not implemented

**Planned for Phase 2:**
- 100 requests per minute per user
- 1000 requests per hour per user
- 429 Too Many Requests response when exceeded

---

## Webhooks

**Current Status:** Not implemented

**Planned for Phase 2:**
- Expense created/updated/deleted events
- Vendor created/updated/deleted events
- Asset status changed events

---

## API Versioning

**Current Version:** v1 (implicit, no version in URL)

**Future Versioning Strategy:**
- URL-based: `/api/v2/expenses`
- Header-based: `Accept: application/vnd.vds-erp.v2+json`

---

## Postman Collection

A Postman collection is available for testing:

**Import URL:** (To be added)

**Pre-configured:**
- All endpoints with example requests
- Environment variables (base URL, session token)
- Authentication flow

---

## OpenAPI/Swagger Specification

**Status:** Planned for Phase 2

**When Available:**
- Interactive API documentation
- Auto-generated client SDKs
- Request/response examples

---

## Best Practices

### 1. Always Handle Errors

```javascript
try {
  const response = await fetch('/api/expenses');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly message
}
```

### 2. Include Credentials

```javascript
fetch('/api/expenses', {
  credentials: 'include' // Critical for session cookie
});
```

### 3. Validate Before Sending

```javascript
// Use same Zod schemas on client
import { expenseSchema } from '@/lib/validations';

const result = expenseSchema.safeParse(formData);
if (!result.success) {
  showErrors(result.error.errors);
  return;
}

// Send only if valid
await fetch('/api/expenses', {
  method: 'POST',
  body: JSON.stringify(result.data)
});
```

### 4. Revalidate After Mutations

```javascript
// After POST/PUT/DELETE, refresh data
await fetch('/api/expenses', { method: 'POST', ... });

// Refetch list to show updated data
const updatedExpenses = await fetch('/api/expenses').then(r => r.json());
```

---

## Support

For API issues or questions:

1. Check this documentation first
2. Review [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
3. Open a GitHub issue with:
   - Endpoint URL
   - Request body/headers
   - Expected vs. actual response
   - Error messages

---

## Changelog

### Version 1.0.0 (MVP Phase 1)

**Initial Release:**
- Authentication endpoints (NextAuth.js)
- Expenses CRUD
- Vendors CRUD
- Fixed Assets CRUD
- Expense Types CRUD
- File upload support

**Known Limitations:**
- No pagination
- No rate limiting
- No webhooks
- No API versioning

---

**Last Updated:** January 2025