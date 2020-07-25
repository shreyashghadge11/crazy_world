const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    cart:[
        {
            productid:{
                type:String,
                required:true
            },
            quantity:{
                type: Number,
                required:true
            },
            productprice:{
                type:Number,
                required:true
            }
        }
    ],
    ordered:[
        {
            productid:{
                type:String,
                required:true
            },
            quantity:{
                type: Number,
                required:true
            },
            productprice:{
                type:Number,
                required:true
            }
        }
    ]
});

module.exports = mongoose.model('User',userSchema);