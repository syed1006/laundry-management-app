const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchUser')

//Route-1: get all orders of a particular user
router.get('/', async (req, res)=>{
    try {
        const orders = await Order.find({'user': req.user});
        return res.status(200).json({
            status: 'success',
            orders
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            message: 'Something went wrong'
        })
    }
} )

//Route-1: to create new order
router.post('/', async(req, res)=>{
    try {
        const user = await User.findOne({'_id' : req.user})
        if(!user){
            return res.status(401).json({
                status: 'failure',
                message: 'User is unauthorized'
            })
        }
        const order = await Order.create({...req.body, user: req.user});
        return res.status(201).json({
            status: 'success',
            message: 'Order is created',
            order
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            message: 'Something went wrong'
        })
    }
})

//Route-3: Update existing order --> used to update the status
router.patch('/:_id', async(req, res)=>{
    try {
        const {_id} = req.params;
        let order = await Order.findOne({_id});
        if(order.user.toString() === req.user || order.shop.toString() === req.user){
            order = await Order.updateOne({_id}, {
                $set: req.body
            })
            return res.status(201).json({
                status: 'success',
                message: 'Order is updated',
                order
            })
        }else{
            return res.status(401).json({
                status: 'failure',
                message: 'You cannot edit this order'
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            status: 'failure',
            message: 'Something went wrong'
        })
    }
})

module.exports = router;