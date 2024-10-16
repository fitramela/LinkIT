const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const authenticate = require('../midllware/authen')

router.get('/test', (req,res)=>{
    res.send('Hello World!')
})
// auth
router.post('/login' , Controller.Login)
router.post('/register' , Controller.Register)

// userr
router.get('/productsPublic', Controller.GetProductsUser)

// merchannnt
router.use(authenticate)
router.post('/product' , Controller.AddProduct)
router.get('/products' , Controller.GetProductMerchant)
router.delete('/product/:id' , Controller.DeleteProduct)
router.patch('/product/:id' , Controller.EditQuantity)
router.post('/cart' , Controller.CreateCart)
router.get('/cart', Controller.GetCartList)
router.post('/checkout', Controller.Emailer)





module.exports = router