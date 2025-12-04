import mongoose, { Schema, Model } from 'mongoose';

export interface IOrderSettings {
    _id: string;
    userId: string;
    defaultStatus: 'new' | 'in-progress' | 'ready' | 'delivered' | 'cancelled';
    autoIncrement: boolean;
    orderPrefix: string;
    leadTime: string;
    requirePhone: boolean;
    autoSaveCustomers: boolean;
    created_at: Date;
    updated_at: Date;
}

const OrderSettingsSchema = new Schema<IOrderSettings>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        defaultStatus: {
            type: String,
            enum: ['new', 'in-progress', 'ready', 'delivered', 'cancelled'],
            default: 'new',
        },
        autoIncrement: {
            type: Boolean,
            default: true,
        },
        orderPrefix: {
            type: String,
            default: 'ORD-',
        },
        leadTime: {
            type: String,
            default: '2',
        },
        requirePhone: {
            type: Boolean,
            default: false,
        },
        autoSaveCustomers: {
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

const OrderSettingsModel: Model<IOrderSettings> = mongoose.models.OrderSettings || mongoose.model<IOrderSettings>('OrderSettings', OrderSettingsSchema);

export default OrderSettingsModel;
