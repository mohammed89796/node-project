const mongoose=require('mongoose');
const Joi=require('joi');
const { User,userschema } = require('./user');


const postschema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  content:{
    type:String,
    required:true
  },
  author:{
    _id:{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:User
  },
  name:{
    type:String
  }
  },
},{timestamps:true});

const Post=mongoose.model('post',postschema);


function validatePost(post){
  const schema=Joi.object({
    title:Joi.string().required().min(5).max(50),
    content:Joi.string().required().min(5).max(1000),
    authorId:Joi.string().required()
  })
  return schema.validate(post)
}

module.exports.validatePost=validatePost;
module.exports.Post=Post;