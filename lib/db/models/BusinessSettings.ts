import mongoose, { Schema, Model } from 'mongoose';

export interface IBusinessSettings {
  _id: string;
  userId: string;
  currency: string;
  currencyPosition: 'before' | 'after';
  defaultMarkup: string;
  taxRate: string;
  dateFormat: string;
  timeFormat: string;
  timezone: string;
  weekStart: 0 | 1; // 0 = Sunday, 1 = Monday
  weightSystem: string;
  volumeSystem: string;
  temperature: string;
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
    currency: {
      type: String,
      default: 'USD',
    },
    currencyPosition: {
      type: String,
      enum: ['before', 'after'],
      default: 'before',
    },
    defaultMarkup: {
      type: String,
      default: '150',
    },
    taxRate: {
      type: String,
      default: '0',
    },
    dateFormat: {
      type: String,
      default: 'MM/DD/YYYY',
    },
    timeFormat: {
      type: String,
      default: '12',
    },
    timezone: {
      type: String,
      default: 'America/New_York',
    },
    weekStart: {
      type: Number,
      enum: [0, 1],
      default: 0, // Sunday
    },
    weightSystem: {
      type: String,
      default: 'imperial',
    },
    volumeSystem: {
      type: String,
      default: 'imperial',
    },
    temperature: {
      type: String,
      default: 'fahrenheit',
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
