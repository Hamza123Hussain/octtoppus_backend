import mongoose from 'mongoose'

const AuctionSchema = new mongoose.Schema({
  product: { type: String, ref: 'Product', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  currentBid: { type: Number, default: 0 },
  highestBidder: { type: String, ref: 'User', default: null },
})

export const AuctionModel = mongoose.model('Auction', AuctionSchema)
