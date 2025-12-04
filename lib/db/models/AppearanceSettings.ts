import mongoose, { Schema, Model } from 'mongoose';

export interface IAppearanceSettings {
    _id: string;
    userId: string;
    theme: 'light' | 'dark' | 'auto';
    displayDensity: 'compact' | 'comfortable' | 'spacious';
    created_at: Date;
    updated_at: Date;
}

const AppearanceSettingsSchema = new Schema<IAppearanceSettings>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        theme: {
            type: String,
            enum: ['light', 'dark', 'auto'],
            default: 'light',
        },
        displayDensity: {
            type: String,
            enum: ['compact', 'comfortable', 'spacious'],
            default: 'comfortable',
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const AppearanceSettingsModel: Model<IAppearanceSettings> = mongoose.models.AppearanceSettings || mongoose.model<IAppearanceSettings>('AppearanceSettings', AppearanceSettingsSchema);

export default AppearanceSettingsModel;
