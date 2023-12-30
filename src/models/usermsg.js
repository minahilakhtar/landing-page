const { error } = require("jquery");
const mongoose = require("mongoose");
const validator = require("validator")

const userScheme = mongoose.Schema({
    name:{
        type: String,
        require: true,
        minLength: 3
    },
    email:{
        type: String,
        require:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    phone:{
        type: Number,
        require:true,
        min: 10
    },
    message:{
        type: String,
        require:true,
        minLength: 3
    },
    
})

//create a collection

const User = mongoose.model("User", userScheme);

module.exports= User;