module.exports=function(req,res,next){
  if(!req.user.isEditor&&!req.user.isAdmin) return res.status(403).send('Access denied');
  next();
}

