var express=require('express');
var router=express.Router();

var checkNotLogin=require(`../middleware/check`).checkNotLogin;
//GET /welcome?author=xxx
router.get(`/`,function(req,res,next){
    res.render('welcome',{
        title:'welcome'
    });
});

//发表blog
//POST /welcome
router.post(`/`,checkNotLogin,function(req,res,next){
    res.send(req.flash());
});
//生成博客页
//GET /welcome
router.get(`/create`,checkNotLogin,function(req,res,next){
    res.send(req.flash());
});
//GET 根据ID获取博客
router.get(`/:id`,function(req,res,next){
    res.send(req.flash());
});
//POST edit
router.post(`/:id/edit`,checkNotLogin,function(req,res,next){
    res.send(req.flash());
});
//POST delete
router.post(`/:id/remove`,checkNotLogin,function(req,res,next){
    res.send(req.flash());
});
//POST 创建一条留言
router.post(`/:id/comment`,checkNotLogin,function(req,res,next){
    res.send(req.flash());
});
//GET 删除一条留言
router.get(`/:id/comment/:cid/remove`,checkNotLogin,function(req,res,next){
    res.send(req.flash());
});

module.exports=router;
