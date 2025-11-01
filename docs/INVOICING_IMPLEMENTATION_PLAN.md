# Professional Invoicing Feature - Implementation Plan

## 📋 **Order Confirmation vs Invoice - Understanding the Difference**

### **Order Confirmation** 📄
- **Purpose:** Acknowledge order received
- **Timing:** Sent immediately when order is placed
- **Payment:** Before or when payment is made
- **Legal Status:** Informal acknowledgment
- **Contains:** Order details, delivery date, total amount, "Thank you!"
- **Use Case:** "We got your order, here's what you ordered"

### **Invoice** 💰
- **Purpose:** Legal request for payment (bill)
- **Timing:** Sent when payment is due
- **Payment:** Includes payment terms (Net 7, Net 30, etc.)
- **Legal Status:** Legal document for accounting/taxes
- **Contains:** Invoice number, due date, payment terms, tax calculations, "Amount Due"
- **Use Case:** "You owe us $200, please pay by Jan 27th"

### **Key Differences:**

| Feature | Order Confirmation | Invoice |
|---------|-------------------|---------|
| Purpose | Acknowledge order | Request payment |
| Legal | Informal | Legal document |
| Timing | When order placed | When payment due |
| Tax Info | Optional | Required |
| Payment Terms | No | Yes (Net 7, Net 30) |
| Due Date | No | Yes |
| Accounting | Not used | Used for bookkeeping |

### **Typical Flow:**
1. Customer places order → Send **Order Confirmation** ✅
2. You deliver the order → Send **Invoice** (if not paid yet) 💰
3. Customer pays → Send **Receipt** (proof of payment) ✅

---

## ✅ **What's Been Implemented**

### **1. Invoice Data Model** (`types/index.ts`)

**New Types Added:**
```typescript
interface Invoice {
  id: string
  invoiceNumber: string    // "INV-2025-001"
  orderId?: string         // Optional link to order
  
  // Customer info
  customerId?: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  customerAddress?: string
  
  // Invoice details
  invoiceDate: string
  dueDate: string
  paymentTerms: 'due-on-receipt' | 'net-7' | 'net-15' | 'net-30' | 'net-60' | 'custom'
  customPaymentTerms?: string
  
  // Items
  items: InvoiceItem[]
  
  // Calculations
  subtotal: number
  taxRate: number
  taxAmount: number
  discount: number
  discountPercentage?: number
  total: number
  
  // Payment
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'overdue'
  amountPaid: number
  amountDue: number
  paymentMethod?: string
  paymentDate?: string
  
  // Additional
  notes?: string
  terms?: string
  footer?: string
  
  // Metadata
  createdAt: string
  updatedAt: string
  sentAt?: string
  emailedTo?: string[]
}

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  taxable: boolean
}

interface PDFCustomization {
  // Business Information
  businessName: string
  businessAddress?: string
  businessPhone?: string
  businessEmail?: string
  businessWebsite?: string
  taxId?: string
  
  // Branding
  logoUrl?: string
  primaryColor?: string
  accentColor?: string
  
  // Layout
  showLogo: boolean
  showBusinessInfo: boolean
  footerText?: string
  
  // Invoice defaults
  invoicePrefix: string
  defaultPaymentTerms: Invoice['paymentTerms']
  defaultTaxRate: number
  defaultNotes?: string
  defaultTerms?: string
}
```

**Constants:**
- `PAYMENT_TERMS` - Payment term options
- `INVOICE_STATUSES` - Status options with colors

---

### **2. Invoice PDF Generator** (`lib/pdfGenerators/invoicePDF.ts`)

**Features:**
✅ **Professional invoice layout** - Legal-compliant format  
✅ **Status badges** - Color-coded (Unpaid/Paid/Overdue/Partial)  
✅ **Business information** - From/Bill To sections  
✅ **Invoice details** - Date, due date, payment terms  
✅ **Itemized table** - Description, quantity, price, taxable  
✅ **Calculations** - Subtotal, tax, discount, total, amount due  
✅ **Payment status** - Shows payment info if paid  
✅ **Payment instructions** - Methods accepted  
✅ **Notes & terms** - Custom notes and T&C  
✅ **Customization support** - Business info, colors, branding  

**Functions:**
```typescript
generateInvoicePDF(invoice, options)
getInvoicePDFFilename(invoice)
createInvoiceFromOrder(order, invoiceNumber, paymentTerms, taxRate)
```

**PDF Structure:**
```
┌─────────────────────────────────────┐
│ INVOICE           #INV-2025-001     │ ← Rose header
├─────────────────────────────────────┤
│ [UNPAID] badge                      │
│                                     │
│ From                                │
│ ├─ Business Name                    │
│ ├─ Address                          │
│ ├─ Phone / Email                    │
│ └─ Tax ID                           │
│                                     │
│ Bill To                             │
│ ├─ Customer Name                    │
│ ├─ Address                          │
│ └─ Phone / Email                    │
│                                     │
│ Invoice Details                     │
│ ├─ Invoice Date: Jan 20, 2025      │
│ ├─ Due Date: Jan 27, 2025          │
│ └─ Payment Terms: Net 7 days        │
│                                     │
│ Items                               │
│ ┌───────────────────────────────┐  │
│ │ Description  Qty  Price  Tax  │  │
│ ├───────────────────────────────┤  │
│ │ Cake         2    $45    Yes  │  │
│ │ Cookies      3    $30    Yes  │  │
│ └───────────────────────────────┘  │
│                                     │
│ ┌─────────────────────┐            │
│ │ Subtotal:   $180.00 │            │
│ │ Tax (8%):    $14.40 │            │
│ │ Total:      $194.40 │            │
│ │ Amount Due: $194.40 │            │
│ └─────────────────────┘            │
│                                     │
│ Payment Instructions                │
│ [Payment methods and details]       │
│                                     │
│ Notes                               │
│ [Custom notes]                      │
│                                     │
│ Terms & Conditions                  │
│ [Terms text]                        │
│                                     │
│ Thank you for your business!        │
│ Phone | Email | Website             │
│ Generated by BakeProfit    Page 1   │
└─────────────────────────────────────┘
```

---

### **3. Invoice Email Templates** (`lib/email/templates.ts`)

**Three New Templates:**

**A. Invoice Email** (`getInvoiceEmailTemplate`)
- Professional invoice notification
- Invoice details summary (number, due date, amount)
- Attachment notice
- Payment methods listed
- Business branding

**B. Invoice Plain Text** (`getInvoiceEmailPlainText`)
- Text-only version for email clients
- Same information as HTML version

**C. Payment Received** (`getPaymentReceivedTemplate`)
- Confirmation email when payment received
- Payment details (amount, method, date)
- Receipt attached
- Thank you message

**Email Features:**
✅ **Professional design** - Matches BakeProfit branding  
✅ **Responsive** - Works on all devices  
✅ **Clear CTAs** - Payment instructions prominent  
✅ **Attachment notice** - Highlights PDF attachment  
✅ **Business info** - Customizable business details  

---

### **4. Email System** (Already Configured)

**Location:** `lib/email/transporter.ts`

**Setup:**
- ✅ Nodemailer configured with Gmail
- ✅ Environment variables: `NEXT_PUBLIC_GMAIL_EMAIL`, `GMAIL_APP_PASSWORD`
- ✅ `sendEmail()` function ready to use
- ✅ Supports HTML and plain text
- ✅ Error handling included

**Usage:**
```typescript
import { sendEmail } from '@/lib/email/transporter'

await sendEmail({
  to: 'customer@example.com',
  subject: 'Invoice INV-2025-001',
  html: invoiceEmailHTML,
  text: invoiceEmailPlainText
})
```

---

## 🚧 **What Needs to Be Built**

### **5. Invoice Management Component** (TODO)

**File:** `components/InvoiceManager.tsx`

**Features Needed:**
- [ ] List all invoices with filters (unpaid, paid, overdue)
- [ ] Create new invoice (from scratch or from order)
- [ ] Edit existing invoice
- [ ] Mark invoice as paid/partial/unpaid
- [ ] Send invoice via email with PDF attachment
- [ ] View invoice details
- [ ] Export invoice as PDF
- [ ] Track invoice history
- [ ] Search and sort invoices
- [ ] Overdue invoice alerts

**UI Components:**
- Invoice list with cards/table
- Create/Edit invoice dialog
- Payment recording dialog
- Email sending dialog
- Invoice preview

---

### **6. Email Sending with PDF Attachment** (TODO)

**File:** `lib/email/sendInvoiceEmail.ts`

**Function Needed:**
```typescript
async function sendInvoiceEmail(
  invoice: Invoice,
  customization: PDFCustomization,
  recipientEmail: string
): Promise<{ success: boolean; messageId?: string; error?: string }>
```

**Steps:**
1. Generate invoice PDF using `generateInvoicePDF()`
2. Convert PDF to buffer/attachment
3. Generate email HTML using `getInvoiceEmailTemplate()`
4. Generate plain text using `getInvoiceEmailPlainText()`
5. Send email with PDF attachment using `sendEmail()`
6. Update invoice `sentAt` and `emailedTo` fields
7. Return success/error

**Nodemailer Attachment:**
```typescript
await transporter.sendMail({
  from: businessEmail,
  to: recipientEmail,
  subject: `Invoice ${invoice.invoiceNumber}`,
  html: emailHTML,
  text: emailPlainText,
  attachments: [{
    filename: `invoice-${invoice.invoiceNumber}.pdf`,
    content: pdfBuffer,
    contentType: 'application/pdf'
  }]
})
```

---

### **7. PDF Customization Settings** (TODO)

**File:** `components/PDFCustomizationSettings.tsx`

**Features Needed:**
- [ ] Business information form
  - Business name, address, phone, email, website
  - Tax ID / EIN / VAT number
- [ ] Branding settings
  - Logo upload (convert to base64 for PDF)
  - Primary color picker
  - Accent color picker
- [ ] Invoice defaults
  - Invoice prefix (INV-, INVOICE-, etc.)
  - Default payment terms
  - Default tax rate
  - Default notes
  - Default terms & conditions
- [ ] Layout preferences
  - Show/hide logo
  - Show/hide business info
  - Custom footer text
- [ ] Preview button - Generate sample PDF
- [ ] Save settings to IndexedDB

**Integration:**
- Add "PDF Customization" tab to Settings component
- Store settings in IndexedDB (`pdf-customization` key)
- Pass customization to all PDF generators

---

### **8. Integrate Customization into PDF Generators** (TODO)

**Files to Update:**
- `lib/pdfGenerators/orderPDF.ts`
- `lib/pdfGenerators/recipePDF.ts`
- `lib/pdfGenerators/invoicePDF.ts`

**Changes:**
- Accept `customization` parameter
- Use custom business info instead of hardcoded
- Apply custom colors to headers/badges
- Show logo if provided
- Use custom footer text

---

### **9. Invoice Hooks** (TODO)

**File:** `hooks/useInvoices.ts`

**Functions Needed:**
```typescript
useInvoices() {
  invoices: Invoice[]
  addInvoice(invoice)
  updateInvoice(id, updates)
  deleteInvoice(id)
  getNextInvoiceNumber()
  markAsPaid(id, paymentMethod, paymentDate)
  markAsPartiallyPaid(id, amount, paymentMethod)
  getOverdueInvoices()
  getUnpaidInvoices()
}
```

**Storage:**
- Store in IndexedDB (`invoices` key)
- Auto-generate invoice numbers
- Calculate overdue status based on due date
- Update payment status automatically

---

### **10. Create Invoice from Order** (TODO)

**Integration Point:** OrderTracker component

**Feature:**
- Add "Create Invoice" button to order cards
- Pre-fill invoice with order data
- Auto-calculate tax
- Set payment terms
- Generate invoice number
- Save to IndexedDB
- Option to send immediately

---

## 📊 **Implementation Timeline**

### **Phase 1: Core Invoicing** (Week 1)
- [x] Invoice data model and types
- [x] Invoice PDF generator
- [x] Invoice email templates
- [ ] Invoice hooks (useInvoices)
- [ ] Basic invoice management component

### **Phase 2: Email Integration** (Week 2)
- [ ] Email sending with PDF attachment
- [ ] Send invoice from UI
- [ ] Email delivery tracking
- [ ] Error handling and retry logic

### **Phase 3: PDF Customization** (Week 3)
- [ ] PDF customization settings UI
- [ ] Logo upload and storage
- [ ] Color picker integration
- [ ] Apply customization to all PDFs
- [ ] Preview functionality

### **Phase 4: Advanced Features** (Week 4)
- [ ] Create invoice from order
- [ ] Recurring invoices
- [ ] Invoice templates
- [ ] Bulk invoice sending
- [ ] Invoice analytics

---

## 🎯 **Key Features Summary**

### **Invoice Management:**
✅ Create invoices from scratch or from orders  
✅ Edit invoice details  
✅ Track payment status (unpaid/partial/paid/overdue)  
✅ Record payments  
✅ View invoice history  

### **PDF Generation:**
✅ Professional, legal-compliant invoices  
✅ Customizable branding  
✅ Tax calculations  
✅ Discount support  
✅ Payment terms  

### **Email Integration:**
✅ Send invoices via email  
✅ PDF attachment  
✅ Professional email templates  
✅ Payment confirmation emails  
✅ Delivery tracking  

### **Customization:**
✅ Business information  
✅ Logo and colors  
✅ Invoice defaults  
✅ Terms and conditions  
✅ Footer text  

---

## 💡 **Business Value**

### **For Bakery Owners:**
✅ **Professional appearance** - Branded, legal invoices  
✅ **Time savings** - Auto-generate from orders  
✅ **Better cash flow** - Track unpaid invoices  
✅ **Legal compliance** - Proper tax documentation  
✅ **Customer satisfaction** - Clear, professional billing  

### **For Customers:**
✅ **Clear billing** - Understand what they're paying for  
✅ **Payment options** - Multiple methods listed  
✅ **Email delivery** - Instant invoice receipt  
✅ **Professional service** - Builds trust  

---

## 🔧 **Technical Architecture**

### **Data Flow:**
```
Order → Create Invoice → Generate PDF → Send Email → Track Status
  ↓           ↓              ↓             ↓            ↓
Store in   IndexedDB      jsPDF      Nodemailer   Update DB
```

### **Components:**
```
InvoiceManager (Main UI)
  ├─ InvoiceList (Display invoices)
  ├─ CreateInvoiceDialog (Create/Edit)
  ├─ PaymentDialog (Record payments)
  ├─ SendInvoiceDialog (Email sending)
  └─ InvoicePreview (PDF preview)

Settings
  └─ PDFCustomizationSettings (Branding)

OrderTracker
  └─ "Create Invoice" button (Integration)
```

### **Libraries:**
- **jsPDF** - PDF generation
- **nodemailer** - Email sending
- **React Hook Form** - Form handling
- **Zod** - Validation
- **IndexedDB** - Data storage

---

## 📝 **Next Steps**

### **Immediate (This Session):**
1. ✅ Understand Order Confirmation vs Invoice
2. ✅ Create Invoice data model
3. ✅ Build Invoice PDF generator
4. ✅ Create Invoice email templates
5. ✅ Document implementation plan

### **Next Session:**
1. Build Invoice Management Component
2. Implement email sending with PDF attachment
3. Create Invoice hooks (useInvoices)
4. Add "Create Invoice from Order" feature
5. Test end-to-end invoice workflow

### **Future Sessions:**
1. PDF Customization Settings UI
2. Apply customization to all PDFs
3. Advanced invoice features (recurring, templates)
4. Invoice analytics and reporting

---

## 🎉 **Conclusion**

**Foundation Complete:**
- ✅ Invoice data model designed
- ✅ Professional PDF generator built
- ✅ Beautiful email templates created
- ✅ Email system already configured

**Ready to Build:**
- Invoice management UI
- Email sending with attachments
- PDF customization settings
- Order-to-invoice conversion

The invoicing system will transform BakeProfit into a **complete business management solution** with professional billing capabilities!
