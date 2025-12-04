import mongoose, { Schema, Model } from 'mongoose';

export interface IRecipeSettings {
    _id: string;
    userId: string;
    defaultServings: string;
    laborCostPerHour: string;
    overheadCost: string;
    showCostBreakdown: boolean;
    created_at: Date;
    updated_at: Date;
}

const RecipeSettingsSchema = new Schema<IRecipeSettings>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        defaultServings: {
            type: String,
            default: '12',
        },
        laborCostPerHour: {
            type: String,
            default: '15',
        },
        overheadCost: {
            type: String,
            default: '10',
        },
        showCostBreakdown: {
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

const RecipeSettingsModel: Model<IRecipeSettings> = mongoose.models.RecipeSettings || mongoose.model<IRecipeSettings>('RecipeSettings', RecipeSettingsSchema);

export default RecipeSettingsModel;
