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

holidaySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export const Holiday = mongoose.model('Holiday', holidaySchema);
