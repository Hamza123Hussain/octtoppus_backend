import { ProductModel } from '../../Model/Product.js'

export const GetAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const allProducts = await ProductModel.find()

    if (allProducts.length === 0) {
      return res.status(404).json({ message: 'No products found' })
    }

    res.status(200).json(allProducts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
