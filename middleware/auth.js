const config=require('config');
const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){
  const token=req.header('x-auth-token');
  if(!token) return res.status(401).send('Access denied');
  try{
    const decoded=jwt.verify(token,config.get('jwtPrivateKey'));
    req.user=decoded;
    next();
  }
  catch(ex){
    res.status(400).send('Invalid token');
  }

}