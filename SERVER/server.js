require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { default: Controller } = require('./controllers/controller')
const router = require('./routers/router')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(router)




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})