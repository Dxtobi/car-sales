import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  model: String,
  year: Number,
  salePrice: Number,
  mileage: Number,
  category: String,
  image: String,
  transmission:String,
  badge:String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Car', carSchema);