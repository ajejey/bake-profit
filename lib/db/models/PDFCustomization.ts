import mongoose, { Schema, Model } from 'mongoose';

export interface IPDFCustomization {
    _id: string;
    userId: string;
    businessName: string;
    businessAddress?: string;
    businessPhone?: string;
    businessEmail?: string;
    businessWebsite?: string;
    taxId?: string;
    logoUrl?: string;
    showLogo: boolean;
    showBusinessInfo: boolean;
    invoicePrefix: string;
    defaultPaymentTerms: 'due-on-receipt' | 'net-7' | 'net-15' | 'net-30' | 'net-60' | 'custom';
    defaultTaxRate: number;
    defaultNotes?: string;
    defaultTerms?: string;
    footerText?: string;
    created_at: Date;
    updated_at: Date;
}

const PDFCustomizationSchema = new Schema<IPDFCustomization>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        businessName: {
            type: String,
            default: 'BakeProfit Business',
        },
        businessAddress: {
            type: String,
            required: false,
        },
        businessPhone: {
            type: String,
            required: false,
        },
        businessEmail: {
            type: String,
            required: false,
        },
        businessWebsite: {
            type: String,
            required: false,
        },
        taxId: {
            type: String,
            required: false,
        },
        logoUrl: {
            type: String,
            required: false,
        },
        showLogo: {
            type: Boolean,
            default: false,
        },
        showBusinessInfo: {
            type: Boolean,
            default: true,
        },
        invoicePrefix: {
            type: String,
            default: 'INV-',
        },
        defaultPaymentTerms: {
            type: String,
            enum: ['due-on-receipt', 'net-7', 'net-15', 'net-30', 'net-60', 'custom'],
            default: 'net-7',
        },
        defaultTaxRate: {
            type: Number,
            default: 0,
        },
        defaultNotes: {
            type: String,
            required: false,
        },
        defaultTerms: {
            type: String,
            required: false,
        },
        footerText: {
            type: String,
            default: 'Thank you for your business!',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const PDFCustomizationModel: Model<IPDFCustomization> = mongoose.models.PDFCustomization || mongoose.model<IPDFCustomization>('PDFCustomization', PDFCustomizationSchema);

export default PDFCustomizationModel;
