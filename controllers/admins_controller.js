const Admin = require('../models/admins')

const bcrypt = require('bcryptjs')
const _ = require('lodash')
const Joi = require("joi");


//Auth Api functions.

const admin_create = async (req, res) => {
    const {error} = create_adminValidation(req.body);   
    if(error) return res.status(404).send(error.details[0].message)
    
    try{
       bcrypt.hash(req.body.password, 10,async(err,hash) => {
        if (err){
            return res.status(500).send({ err });
        }
        else{    
             const admin = await Admin.findOne({email: req.body.email })
             if (admin) return res.status(409).send({msg:'user is already created.'})    

             const newAdmin = await new Admin(_.pick(req.body, ['name', 'email','address','phone','gender','password','password_confirm']));
                          
             const token = await newAdmin.generateToken();
             res.cookie('auth',token);//sending token via cookies.             
            
             if(req.body.password != req.body.password_confirm)       
               return res.status(400).send({errMsg: 'confirm must match password'})   

             newAdmin.password = hash
             newAdmin.password_confirm = newAdmin.password;
            
             await newAdmin.save()
             res.status(201).send(_.pick(newAdmin, ['name', 'email','address','phone','gender','status']));
        }
       });
    }catch(err){
      for (field in err.occur) res.status(400).json(err.occur[field].message);
    }
}

const admin_login = async (req, res) => {
    const {error} = adminLogin_validation(req.body); 
    if(error) return res.status(400).send(error.details[0].message); // test tostring function.
  try{
    res.clearCookie('auth');
    const admin = await Admin.checkPassword(req.body.email, req.body.password);
    if(admin.status !== 'active') return res.status(401).send('Please authenticate.')
   
    if (!admin) return res.status(401).send('invalid email or password')

    const token = await admin.generateToken();
    res.cookie('auth',token);

    await admin.save();
    res.status(200).send(_.pick(admin, ['name', 'email','address','phone','gender','status']))
  }catch(err){
    for (field in err.occur) res.status(400).json(err.occur[field].message);
  }
}

const admin_profile = async (req, res) => {   
  try{
      return res.status(200).send(_.pick(req.admin, ['name', 'email','address','phone','gender','status']))
  }catch(err){
    for (field in err.occur) res.status(400).json(err.occur[field].message);
  }  
}

const logout_accout = async (req, res) => {
    try{
      req.admin.tokens = req.admin.tokens.filter((token) => {
        return token.token !== req.token
      })
      await req.admin.save()
      res.clearCookie('auth');
      res.status(200).send('logout seccesfully')
    }catch(err){
      for (field in err.occur) res.status(400).json(err.occur[field].message);
    }
}

const logout_allaccounts = async (req, res) =>{
  try{
    req.admin.tokens = []
    await req.admin.save();

    res.clearCookie('auth');    
    res.status(200).send('Loged out for all devices')
  }catch(err){
    for (field in err.occur) res.status(400).json(err.occur[field].message);
  }
}

const delete_myProfile = async (req, res) => {
  try{
    req.admin.status = 'inactive';
    await req.admin.save()
    res.status(200).send('Account has been deleted.')

  }catch(err){
    for (field in err.occur) res.status(400).json(err.occur[field].message);
  }
}

const update_myProfile = async (req, res) => {

  const {error} = create_adminValidation(req.body);   
  if(error) return res.status(404).send(error.details[0].message)
  
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email','address','phone','gender','type'];
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
  
  if(!isValidUpdate) return res.status(400).send({Error:'Invalid updates.!'})

  try{
    updates.forEach((update) => req.admin[update] = req.body[update])
    await req.admin.save()
    res.status(200).send(req.admin)
  }catch(err){
    for (field in err.occur) res.status(400).json(err.occur[field].message);
  }


}

//!feature API'S. 

//*reset password API
//*Change password API


 







//validation functions.

function create_adminValidation(admin) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "so"] } }).required(),
      address: Joi.string().min(4).required(),
      phone: Joi.number().integer().min(7).required(),
      gender: Joi.string().min(4).max(6).required(),
      type: Joi.string(),
      tokens: Joi.array().items(Joi.string().required()), //this is how to validate arrays
      password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
      password_confirm: Joi.any().valid(Joi.ref('password')).required(),
      status: Joi.string().min(4)
    });
    return schema.validate(admin);
  }

function adminLogin_validation(admin){
    const schema = Joi.object({     
        email: Joi.string().min(4).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
     });
     return schema.validate(admin);
};


module.exports ={
    //we but inside function name to export.
    admin_create,
    admin_login,
    admin_profile,
    logout_accout,
    logout_allaccounts,
    delete_myProfile,
    update_myProfile
}