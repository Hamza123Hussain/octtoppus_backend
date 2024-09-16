import { Router } from 'express'
import { CreateProduct } from '../Controllers/Product/CreateANewProduct.js'
import { upload } from '../Middleware/Multer.js'
import { FindUserProducts } from '../Controllers/Product/FindingProductsOFUser.js'
import { GetAllProducts } from '../Controllers/Product/GettingAllProducts.js'
const ProductRouter = Router()
ProductRouter.post('/AddProduct', upload.single('image'), CreateProduct)
ProductRouter.get('/GetUserProducts', FindUserProducts)
/**sending sellerID as query */
ProductRouter.get('/ALLPRODUCTS', GetAllProducts)
export default ProductRouter
