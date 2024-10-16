const { User, ProductImage, Product, Cart } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmailNotification } = require("../midllware/nodemailer");


class Controller {

    static async Login(req, res, next) {
        try {
            const { username, password } = req.body

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

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
            res.json({ token })
            console.log(token, 'ini token')


        } catch (error) {
            console.log(error, 'ini error');

        }
    }


    static async Register(req, res, next) {
        try {
            const { username, password } = req.body;


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
    static async AddProduct(req, res, next) {
        try {
            const { title, sku, quantity, imageUrl, description } = req.body
            console.log(req.body, 'ini req body')
            if (!title || !sku || !quantity || !imageUrl) {
                return res.status(400).json({ message: 'Title, SKU, Quantity, and Image URL are required' });
            }
            const merchantId = req.user.id
            const product = await Product.create({ title, sku, quantity, merchantId, description })
            if (product) {
                await ProductImage.create({ productId: product.id, imageUrl })
                return res.status(201).json({ message: 'Product added successfully', product })
            } else {
                return res.status(500).json({ message: 'Failed to create product' })
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async GetProductMerchant(req, res, next) {
        try {
            const UserId = req.user
            const products = await Product.findAll({
                where: {
                    merchantId: UserId.id
                },
                include: [{
                    model: ProductImage,
                    as: 'ProductImages'
                }]
            });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static async GetProductsUser(req, res, next) {
        try {

            const products = await Product.findAll({
                include: [{
                    model: ProductImage,
                    as: 'ProductImages'
                }]
            });
            res.json(products);
        } catch (error) {
            console.log(error, 'error fecth list')
        }
    }

    static async DeleteProduct(req, res, next) {
        try {
            const { id } = req.params
            const product = await Product.findByPk(id)
            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }
            await product.destroy()
            res.json({ message: 'Product deleted successfully' })
        } catch (error) {
            console.log(error)
        }
    }

    static async EditQuantity(req, res, next) {
        try {
            const id = req.params
            await Product.update({ quantity: req.body.quantity }, { where: { id } })
            res.status(200).json({ message: `product with id ${id} edited` })
        } catch (error) {
            console.log(error)
        }
    }

    static async CreateCart(req, res, next) {
        try {
            console.log(req.body, '<-------cart')
            const userId = req.user.id
            const { productId, productName, quantity } = req.body
            await Cart.create({ productId, productName, quantity, userId })
            res.status(201).json({ message: 'Cart created successfully' })
        } catch (error) {
            console.log(error)
        }
    }


    static async GetCartList(req, res, next) {
        try {
            const userId = req.user.id
            const cart = await Cart.findAll({ where: { userId } })
            res.status(201).json(cart)
        } catch (error) {
            console.log(error)
        }
    }

    static async Emailer(req, res, next) {
        try {
            const  {email}   = req.body;
            console.log(email,'<--email')
            const subject = 'Checkout Notification';
            const text = 'Thank you for your order! Your checkout has been processed.';
            await sendEmailNotification(email, subject, text);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending email' });
        }
    }

}
module.exports = Controller
