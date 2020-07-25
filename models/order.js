const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    delivery:{
        type:Boolean,
        required:true
    },
    
    orderStatus:[
        {
            productid:{
                type:String,
                required:true
            },
            quantity:{
                type: Number,
                required:true
            },
            
            orderDate:{
                type:Date,
                required:true
            }
        }
    ],
    address:{
        type:String,
        required:true
    },
    mobileno:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Order',orderSchema);