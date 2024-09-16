import { normalizePath } from '../../../normalizefunction.js'
import { ProductModel } from '../../Model/Product.js'
import { User } from '../../Model/User.js'
import { v4 as uuid } from 'uuid'
export const CreateProduct = async (req, res) => {
  const { productName, price, status, sellerId, auctionEndDate } = req.body

  // Validate sellerId
  try {
    const user = await User.findById(sellerId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const image = req.file ? req.file.path : null // Get the image path

    const newProduct = new ProductModel({
      _id: uuid(),
      productName,
      price,
      auctionEndDate,
      status,
      image,
      sellerId, // Reference to the User's ObjectId
    })

    await newProduct.save()

    res.status(201).json({
      productName,
      price,
      auctionEndDate,
      status,
      image: normalizePath(image),
      sellerId,
      user,
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
