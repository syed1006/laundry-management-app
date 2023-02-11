const mongoose = require('mongoose');
const {Schema} = mongoose;

const addressSchema = new Schema({
    name:{
        type: String,
        default: 'others'
    },
    doorNo:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    landmark:{
        type: String
    },
    area:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    pinCode:{
        type: Number,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    }
}, {timestamps:true});

const Address = mongoose.model('addresses', addressSchema);
module.exports= Address;