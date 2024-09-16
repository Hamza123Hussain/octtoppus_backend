import { ProductModel } from '../../Model/Product.js'

export const FindUserProducts = async (req, res) => {
  const { sellerID } = req.query // Use query parameters for GET requests

  if (!sellerID) {
    return res.status(400).json({ error: 'Seller ID is required' })
  }

  try {
    const userProducts = await ProductModel.find({ sellerId: sellerID })

    if (userProducts.length === 0) {
      return res.json([])
    }

    res.status(200).json(userProducts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
