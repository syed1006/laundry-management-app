const router = require('express').Router();
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const generateCode = require('../helpers/generateCode')
//creating a transporter to send the verification emails;
const transporter = require('../helpers/transporter')

dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

//Route-1: Creating a new user
router.post('/register', [
    body('name', "Enter a valid name!!").isAlpha('en-IN',{ignore: ' '}),
    body('email', "Enter a valid email!!").isEmail(),
    body('password', "Password length needs to be min 5 characters!!").isLength({min: 5})
], async(req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status:"failure",
            errors: errors.array() 
        });
    }
    const {name, email, password} = req.body;
    try{
        //check whether a user with this email already exist
        let user = await User.findOne({email});
        if(user){
            if(user.status === 'active'){
                return res.status(400).json({
                    status: 'failure',
                    message: 'A user already exists with this email!'
                })
            }
            else{
                const hash = await bcrypt.hash(password, 10);
                await User.updateOne({email}, {$set: {name, password: hash}})
            }
        }else{
            const hash = await bcrypt.hash(password, 10);
            user = await User.create({
                name,
                email,
                password: hash
            })
        }
        //creating a jwt token asynchronously and sending the verification email
        jwt.sign(
            {
                user: user._id
            },
            jwt_secret,
            {
                expiresIn: '1d'
            },
            (err, emailToken)=>{
                console.log('errors', err);
                const url = `${process.env.BACKEND}${process.env.PORT?process.env.PORT:5000}/user/verify/${emailToken}`

                transporter.sendMail({
                    to: email,
                    subject: 'Confirm Your Email',
                    html:`Please  <a href='${url}'>click here </a>to verify your email address.`
                })
            }
        )
        return res.status(200).json({
            status: 'success',
            message: 'verification email sent',
            user
        })

    }catch(e){
        return res.status(500).json({
            status: 'failure',
            message: e.message
        })
    }
})

//Route-2: Verifying the user email address by jwt which we sent 
router.get('/verify/:token', async(req, res)=>{
    const {token} = req.params;
    try{
        let data = jwt.verify(token, jwt_secret)
        console.log(data);
        const user = await User.findOne({'_id': data.user});
        if(user){
            if(user.status === 'pending'){
                await User.updateOne({'_id': data.user}, {$set: {'status': 'active'}})
            }
            return res.json({
                status: 'success',
                message: 'Account is active now.'
            })
        }
        return res.status(400).json({
            status: 'failure',
            message: 'please register again'
        })
    }catch(e){
        return res.status(500).json({
            status: 'failure',
            message: e.message
        })
    }
    
    
})

//Route-3 : loging in the user to access the portal;
router.post('/login',[
    body('email', "Enter a valid email!!").isEmail(),
    body('password', "Password length needs to be min 5 characters!!").isLength({min: 5})
] ,async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
            status:"failure",
            errors: errors.array() 
        });
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                status: 'failure',
                message: "User doesn't exist please signup!!"
            })
        }
        else if(user.status === 'pending'){
            return res.status(401).json({
                status: 'failure',
                message: "Verify your email address!!"
            })
        }
        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.status(401).json({
                status: 'failure',
                message: 'Invalid credentials'
            })
        }
        const token = jwt.sign({
            data: user._id
        }, jwt_secret, {expiresIn: '1d'})
        return res.status(200).json({
            status: "success",
            token,
            roles: user.roles
        })
    }
    catch(e){
        return res.status(500).json({
            status: 'failure',
            message: e.message
        })
    }
})

//Route 4: Sending a verification code to email for forgot password

router.post('/forgot_password',[
    body('email', "Enter a valid email!!").isEmail()
], async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
            status:"failure",
            errors: errors.array() 
        });
    }
    const {email} = req.body
    try{
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({
                status: 'failure',
                message: "User doesn't exist please signup!!"
            })
        }
        const code = generateCode(8);
        const info = await transporter.sendMail({
            to: email,
            subject: 'Verification Code',
            html:`Your One time code is: <b>${code}</b>`
        })
        res.status(200).json({
            status: 'success',
            code,
            message: 'email has been sent'
        })
    }
    catch(e){
        return res.status(500).json({
            status: 'failure',
            message: e.message
        })
    }
})
module.exports = router