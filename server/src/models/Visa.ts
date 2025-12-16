import mongoose from 'mongoose';

const visaSchema = new mongoose.Schema({
  country: { type: String, required: true },
  type: { type: String, required: true },
  processingTime: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  image: { type: String, required: true },
  requiredDocuments: [{ type: String }]
});

export const Visa = mongoose.model('Visa', visaSchema);
