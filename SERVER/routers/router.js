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
// merchannnt
router.use(authenticate)
router.post('/product' , Controller.AddProduct)




module.exports = router