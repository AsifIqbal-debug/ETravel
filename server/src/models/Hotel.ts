import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  image: { type: String, required: true },
  amenities: [{ type: String }]
});

hotelSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export const Hotel = mongoose.model('Hotel', hotelSchema);
