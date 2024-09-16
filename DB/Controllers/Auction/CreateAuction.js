import { AuctionModel } from '../../Model/Auction.js'
import { ProductModel } from '../../Model/Product.js'
import { User } from '../../Model/User.js'
export const MakeAuction = async (req, res) => {
  const { product, startDate, endDate } = req.body
  const CheckProduct = await ProductModel.findById(product)
  if (!product || !startDate || !endDate) {
    return res.status(400).json({ message: 'Missing required fields' })
  }
  try {
    // Create a new auction
    const auction = new AuctionModel({
      product: product,
      startDate,
      endDate,
    })
    // Save the auction to the database
    await auction.save()
    // Respond with the created auction
    res.status(201).json({
      message: 'Auction created successfully',
      auction,
      CheckProduct,
    })
  } catch (error) {
    // Handle any errors during the save operation
    res.status(500).json({
      message: 'Failed to create auction',
      error: error.message,
    })
  }
}
