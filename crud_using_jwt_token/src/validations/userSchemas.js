const Joi = require('joi');

const userSchema= Joi.object({
    name: Joi.string().required(),
    caste:Joi.string().required(),
    city:Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    mobile_no:Joi.string().required(),
    password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),  
 
});

const loginSchema= Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),  
});

module.exports={
  loginSchema,
  userSchema
};