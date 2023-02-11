const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'pending',
        enum: ['pending', 'active']
    },
    roles:{
        type: Number,
        default: 1998,
        enum: [1998, 9546]
    }
}, {timestamps: true});

const User = mongoose.model('users', userSchema);
module.exports = User;