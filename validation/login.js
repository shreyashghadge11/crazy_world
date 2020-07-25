const Validator = require("validator");
const isEmpty= require("is-empty");

module.exports = validateLoginInput = data =>{
    let errors={};

    let {email,password} = data;
    email = !isEmpty(email)?email:"";
    password = !isEmpty(password)?password:"";

    if(Validator.isEmpty(email)){
        errors.email= 'Email is required';
    }else if(!Validator.isEmail(email))
     {   errors.email='Enter a valid email';
     }

    if(Validator.isEmpty(password)){
        errors.password= 'Password is required';
    }else if(!Validator.isLength(password,{min:6,max:20}))
    {
        errors.password='Password must be atleast 6 characters';
    }

    return{
        errors,isValid:isEmpty(errors)
    };
};