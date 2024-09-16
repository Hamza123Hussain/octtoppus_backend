import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  _id: { type: String }, // Use String type for _id or change to ObjectId if needed
  productName: { type: String, required: true }, // Name of the product
  description: { type: String }, // Description of the product
  price: { type: Number, required: true }, // Starting price for the auction
  image: { type: String }, // URL or path to the product image
  auctionEndDate: { type: Date, required: true }, // Date and time when the auction ends

  sellerId: {
    type: String, // Assuming sellerId is stored as a String
    required: true,
  }, // Seller's ID
  status: {
    type: String,
    enum: ['active', 'sold', 'canceled'],
    default: 'active',
  },
})

export const ProductModel = mongoose.model('Product', ProductSchema)
