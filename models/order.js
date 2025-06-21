import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  total: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', OrderSchema);
