const {User} = require("../models");
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

            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"})
            res.json({token})
            console.log(token, 'ini token')


        } catch (error) {
            console.log(error, 'ini error');
        }
    }


    static async Register (req,res,next){
        try {
            const {username, password} = req.body
            const hashedPassword = await bcrypt.hash(password, 8)
            const newUser = await user.create({username, password: hashedPassword,})
            res.status(201).json({
                message : `Success make an account with ${username}`
            })
        } catch (error) {
            console.log(error, 'error register')
            
        }
    }
 }
module.exports = Controller
