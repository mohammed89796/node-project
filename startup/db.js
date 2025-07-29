const mongoose=require('mongoose');
module.exports=function(){
  mongoose
 .connect('mongodb://localhost/posts')
 .then(()=>{console.log('connected to mongodb')})
 .catch(()=>{console.error('couldnt connect to mongodb')});
}