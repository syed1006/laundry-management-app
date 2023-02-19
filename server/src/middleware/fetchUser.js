const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();
const jwt_secret = process.env.JWT_SECRET;

const fetchUser = (req, res, next)=>{

    const token = req.headers.authorization
    if(!token){
        return res.status(401).json({
            status: 'Failure',
            message: 'Acess denied'
        })
    }
    try{
        // console.log(jwt_secret)
        const user = jwt.verify(token, jwt_secret)
        // console.log(user);
        req.user = user.data
        next();
    }catch(e){
        return res.status(500).json({
            status: 'Failure',
            message: e.message
        })
    }
}

module.exports = fetchUser;