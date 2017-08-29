var express=require('express');
var router=express.Router();

var checkNotLogin=require(`../middleware/check`).checkNotLogin;

//GET 注销
router.get(`/`,checkNotLogin,function(req,res,next){
    console.log('1');
    req.session.user=null;
    req.flash('success','已退出登录');
    res.redirect('/welcome');
});

module.exports=router;