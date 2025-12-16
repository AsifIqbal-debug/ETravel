import mongoose from 'mongoose';

const holidaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  image: { type: String, required: true },
  inclusions: [{ type: String }]
});

export const Holiday = mongoose.model('Holiday', holidaySchema);
