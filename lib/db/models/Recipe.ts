import mongoose, { Schema, Model } from 'mongoose';

export interface IRecipeIngredient {
  id: string;
  ingredientId: string;
  quantity: number;
  unit: string;
  cost: number;
}

export interface IRecipe {
  _id: string;
  id?: string; // Optional: Preserves original ID for sample data compatibility
  userId: string;
  name: string;
  description?: string;
  category?: string;
  ingredients: IRecipeIngredient[];
  instructions: string[];
  servings: number;

  // Timing (all in minutes)
  prepTime?: number;
  cookTime?: number;
  coolTime?: number;
  laborTime: number;

  // Costs
  laborCost: number;
  overheadCost: number;
  totalCost: number;
  costPerServing: number;

  // Additional details
  temperature?: string;
  notes: string;
  image?: string;

  // Metadata
  created_at: Date;
  updated_at: Date;
}

const RecipeIngredientSchema = new Schema<IRecipeIngredient>(
  {
    id: {
      type: String,
      required: true,
    },
    ingredientId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const RecipeSchema = new Schema<IRecipe>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    id: {
      type: String,
      required: false, // Optional: Preserves original ID for sample data
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    ingredients: {
      type: [RecipeIngredientSchema],
      default: [],
    },
    instructions: {
      type: [String],
      default: [],
    },
    servings: {
      type: Number,
      required: true,
    },
    prepTime: {
      type: Number,
      required: false,
    },
    cookTime: {
      type: Number,
      required: false,
    },
    coolTime: {
      type: Number,
      required: false,
    },
    laborTime: {
      type: Number,
      required: true,
    },
    laborCost: {
      type: Number,
      required: true,
    },
    overheadCost: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    costPerServing: {
      type: Number,
      required: true,
    },
    temperature: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    _id: true,
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// Index for faster queries
RecipeSchema.index({ userId: 1, name: 1 });
RecipeSchema.index({ userId: 1, category: 1 });

const RecipeModel: Model<IRecipe> = mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default RecipeModel;
