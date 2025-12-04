import mongoose, { Schema, Model } from 'mongoose';

export interface INotificationSettings {
    _id: string;
    userId: string;
    lowStockAlerts: boolean;
    upcomingDeliveries: boolean;
    usageLimitWarnings: boolean;
    created_at: Date;
    updated_at: Date;
}

const NotificationSettingsSchema = new Schema<INotificationSettings>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        lowStockAlerts: {
            type: Boolean,
            default: true,
        },
        upcomingDeliveries: {
            type: Boolean,
            default: true,
        },
        usageLimitWarnings: {
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

const NotificationSettingsModel: Model<INotificationSettings> = mongoose.models.NotificationSettings || mongoose.model<INotificationSettings>('NotificationSettings', NotificationSettingsSchema);

export default NotificationSettingsModel;
