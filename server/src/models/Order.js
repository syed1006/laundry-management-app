const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    status:{
        type: String,
        default: 'pending',
        enum: ['picked-up', 'washed', 'ironed', 'delivered', 'pending', 'cancelled', 'rejected']
    },
    clothes:{
        shirts:{
            type: Number,
            default: 0
        },
        t_shirts:{
            type: Number,
            default: 0
        },
        trousers:{
            type: Number,
            default: 0
        },
        jeans:{
            type: Number,
            default: 0
        },
        boxers:{
            type: Number,
            default: 0
        },
        joggers:{
            type: Number,
            default: 0
        },
        jackets:{
            type: Number,
            default: 0
        },
        blankets:{
            type: Number,
            default: 0
        },
        suits:{
            type: Number,
            default: 0
        },
        sarees:{
            type: Number,
            default: 0
        }
    },
    address:{
        type: Schema.Types.ObjectId,
        ref: 'addresses'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {timestamps: true});

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;