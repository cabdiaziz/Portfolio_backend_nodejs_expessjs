const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

require('dotenv').config();

const env = process.env;

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "admin",
    },
    tokens:[{
       token:{
            type: String,
            required: true
       }
    }],
    password: {
      type: String,
      required: true,
    },
    password_confirm:{
        type: String,
        required: true,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);



adminSchema.methods.generateToken = async function(){
    const newAdmin = this
    const token = jwt.sign({ _id: newAdmin._id.toString()},env.TOKEN_KEY);
    newAdmin.tokens = newAdmin.tokens.concat({token})
    return token
}

adminSchema.statics.checkPassword = async (email, password) => {
  const admin = await Admin.findOne({email})       
      if(!admin)  return admin

  const checkPassword = await bcrypt.compare(password, admin.password)
  if(!checkPassword) {
    return admin
  }
   return admin  
}
adminSchema.virtual('myskills',{
  ref: 'Skills',
  localField: '_id',
  foreignField: 'person'
});

adminSchema.virtual('myProject',{
  ref: 'Projects',
  localField: '_id',
  foreignField: 'person'
});

adminSchema.virtual('myEducation',{
  ref: 'Educations',
  localField: '_id',
  foreignField: 'person'
});

const Admin = mongoose.model('Admins', adminSchema);

module.exports = Admin;
