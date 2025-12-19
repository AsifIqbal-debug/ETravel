import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  logo: { type: String }, // airline code for logo placeholder
  origin: { type: String, required: true },
  originCode: { type: String, required: true },
  destination: { type: String, required: true },
  destinationCode: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  stops: { type: Number, default: 0 },
  type: { type: String, enum: ['domestic', 'international', 'hajj-umrah'], default: 'domestic' },
  tripType: { type: [String], default: ['one-way', 'round-trip'] }
});

flightSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export const Flight = mongoose.model('Flight', flightSchema);
