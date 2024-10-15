const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/test', (req,res)=>{
    res.send('Hello World!')
})
// auth
router.post('/login' , Controller.Login)
router.post('/register' , Controller.Register)
// merchannnt
router.post('/product' , Controller.AddProduct)




module.exports = router