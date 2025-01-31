import { Schema, model, Document } from 'mongoose';

interface IUrl extends Document {
  longUrl: string;
  shortCode: string;
  customShortCode?: string; 
  userID:string;
  createdAt: Date;
  clicks: number;
}

const urlSchema = new Schema<IUrl>({
  longUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  customShortCode: { type: String, unique: true, sparse: true }, // Optional and unique
  userID: {type: String},
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
});

export default model<IUrl>('Url', urlSchema);