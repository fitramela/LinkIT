const {User, ProductImage, Product} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


 class Controller {

    static async Login(req,res,next){
        try {
            const {username, password} = req.body   

            const user = await User.findOne({ where: { username } });


            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }


            if (!user.password) {
                return res.status(500).json({ message: 'Password is undefined' });
            }


            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
            res.json({token})
            console.log(token, 'ini token')


        } catch (error) {
            console.log(error, 'ini error');
        }
    }


    static async Register (req,res,next){
        try {
            const {username, password} = req.body;


            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

           
            const hashedPassword = await bcrypt.hash(password, 10); 

            
            const newUser = await User.create({ username, password: hashedPassword });

            return res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            console.log(error, 'error register')
            
        }
    }

    // merchantt
    static async AddProduct(req,res,next){
        try {
           const { title, sku, quantity, imageUrl , description} = req.body
           console.log(req.body , 'ini req body')
           if (!title || !sku || !quantity || !imageUrl) {
               return res.status(400).json({ message: 'Title, SKU, Quantity, and Image URL are required' });
           }
           const merchantId = req.user.id
           const product = await Product.create({ title, sku, quantity, merchantId , description})
            await ProductImage.create({ productId: product.id, imageUrl })
           return res.status(201).json({ message: 'Product added successfully', product })
        } catch (error) {
            console.log(error)
        }
    }
 }
module.exports = Controller
