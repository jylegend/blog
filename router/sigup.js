var fs=require('fs');
var path=require('path');
var sha1=require('sha1');
var express=require('express');
var router=express.Router();
var UserModel=require('../models/user');
var checkLogin=require(`../middleware/check`).checkLogin;

//GET 前往注册
router.get(`/`, checkLogin, function (req, res, next) {
    res.render('signup', {
        title: '欢迎注册'
    });
});

//POST  用户注册操作
router.post(`/`,checkLogin,function(req,res,next){
    var name=req.fields.name;
    var gender=req.fields.gender;
    var bio=req.fields.bio;
    var password=req.fields.password;
    var repassword=req.fields.repassword;
    var avatar=req.files.avatar.path.split(path.sep).pop();
    var f=false,err='';
    try{
        if(name.length<=0 || name.length>10){
            err="用户名长度保持在1-10字符";
        }
        else if(['m','f','x'].indexOf(gender)===-1){
            err='请选择性别'
        }
        else if(bio.length>=50 || bio.length<=0){
            err='个人简介描叙长度不正确，保持1-50个字符以内'
        }
        else if(!req.files.avatar.name){
            err='请选择头像'
        }
        else if(password.length<6){
            err='密码长度至少6位'
        }
        else if(password!==repassword){
            err='两次密码输入不一样'
        }
        f=true;
        if(err){
            throw new Error(err);
        }
    }
    catch(e){
        f=false;
        fs.unlink(req.files.avatar.path);
        req.flash('error',e.message);
        return res.redirect('/signup');
    }
    if(f){
        password=sha1(password);
        var user={
            name:name,
            password:password,
            gender:gender,
            bio:bio,
            avatar:avatar
        };
        UserModel.create(user).then(function(result){
            user=result.ops[0];
            delete user.password;
            req.session.user=user;
            req.flash('success','注册成功');
            res.redirect('/welcome');
        }).catch(function(e){
            fs.unlink(req.files.avatar.path);
            if(e.message.match('E11000 duplicate key')){
                req.flash('error','用户名已被占用');
                return res.redirect('/signup');
            }
        })
    }
});

module.exports=router;