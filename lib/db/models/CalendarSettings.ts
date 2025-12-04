import mongoose, { Schema, Model } from 'mongoose';

export interface ICalendarSettings {
    _id: string;
    userId: string;
    weekStartsOn: 0 | 1; // 0 = Sunday, 1 = Monday
    defaultProductionLeadTime: number; // Days before delivery to bake
    dailyCapacityHours: number; // Maximum production hours per day
    blockedDates: string[]; // ISO date strings of unavailable dates
    showProductionDates: boolean; // Whether to show production dates in calendar
    enableCapacityWarnings: boolean; // Show warnings when approaching capacity
    created_at: Date;
    updated_at: Date;
}

const CalendarSettingsSchema = new Schema<ICalendarSettings>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        weekStartsOn: {
            type: Number,
            enum: [0, 1],
            default: 0,
        },
        defaultProductionLeadTime: {
            type: Number,
            default: 1,
        },
        dailyCapacityHours: {
            type: Number,
            default: 8,
        },
        blockedDates: {
            type: [String],
            default: [],
        },
        showProductionDates: {
            type: Boolean,
            default: true,
        },
        enableCapacityWarnings: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const CalendarSettingsModel: Model<ICalendarSettings> = mongoose.models.CalendarSettings || mongoose.model<ICalendarSettings>('CalendarSettings', CalendarSettingsSchema);

export default CalendarSettingsModel;
