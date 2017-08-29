var sha1 = require('sha1');
var express=require('express');
var router=express.Router();
var UserModel=require('../models/user');
var checkLogin=require(`../middleware/check`).checkLogin;

//GET 前往登录
router.get(`/`,checkLogin,function(req,res,next){
    res.render('signin',{
        title:'welcome please signin'
    });
});

//POST  用户登录操作
router.post(`/`,checkLogin,function(req,res,next){
    var name=req.fields.name;
    var password=req.fields.password;

    UserModel.getUserByName(name).then(function(user){
        if(!user){
            req.flash('error','用户不存在');
            return res.redirect('back');
        }
        if(sha1(password)!==user.password){
            req.flash('error','用户名或密码错误');
            return res.redirect('back');
        }
        req.flash('success','登录成功');
        delete user.password;
        req.session.user=user;
        res.redirect('/welcome');
    }).catch(next)
});

module.exports=router;