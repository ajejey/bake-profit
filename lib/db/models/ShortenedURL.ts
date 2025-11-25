import mongoose, { Schema, Document } from 'mongoose'

export interface IShortenedURL extends Document {
  shortCode: string
  originalUrl: string
  clicks: number
  createdAt: Date
}

const ShortenedURLSchema = new Schema<IShortenedURL>({
  shortCode: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const ShortenedURL = mongoose.models.ShortenedURL || mongoose.model<IShortenedURL>('ShortenedURL', ShortenedURLSchema)

export default ShortenedURL
