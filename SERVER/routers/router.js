const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get('/test', (req,res)=>{
    res.send('Hello World!')
})

router.post('/login' , Controller.Login)
router.post('/register' , Controller.Register)





module.exports = router