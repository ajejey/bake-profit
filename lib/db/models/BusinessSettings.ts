import mongoose, { Schema, Model } from 'mongoose';

export interface IBusinessSettings {
  _id: string;
  userId: string;
  businessName?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessEmail?: string;
  businessWebsite?: string;
  taxId?: string;
  logoUrl?: string;
  primaryColor?: string;
  accentColor?: string;
  showLogo: boolean;
  showBusinessInfo: boolean;
  footerText?: string;
  invoicePrefix: string;
  defaultPaymentTerms: 'due-on-receipt' | 'net-7' | 'net-15' | 'net-30' | 'net-60' | 'custom';
  defaultTaxRate: number;
  defaultNotes?: string;
  defaultTerms?: string;
  laborCostPerHour: number;
  overheadPercentage: number;
  created_at: Date;
  updated_at: Date;
}

const BusinessSettingsSchema = new Schema<IBusinessSettings>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    businessName: {
      type: String,
      required: false,
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
      lowercase: true,
      trim: true,
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
    primaryColor: {
      type: String,
      required: false,
    },
    accentColor: {
      type: String,
      required: false,
    },
    showLogo: {
      type: Boolean,
      default: true,
    },
    showBusinessInfo: {
      type: Boolean,
      default: true,
    },
    footerText: {
      type: String,
      required: false,
    },
    invoicePrefix: {
      type: String,
      default: 'INV-',
    },
    defaultPaymentTerms: {
      type: String,
      enum: ['due-on-receipt', 'net-7', 'net-15', 'net-30', 'net-60', 'custom'],
      default: 'due-on-receipt',
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
    laborCostPerHour: {
      type: Number,
      default: 15,
    },
    overheadPercentage: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const BusinessSettingsModel: Model<IBusinessSettings> = mongoose.models.BusinessSettings || mongoose.model<IBusinessSettings>('BusinessSettings', BusinessSettingsSchema);

export default BusinessSettingsModel;
