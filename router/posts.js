var express=require('express');
var router=express.Router();

var checkNotLogin=require(`../middleware/check`).checkNotLogin;
var PostModel=require(`../models/posts`);

router.get(`/`,checkNotLogin,function(req,res,next){
    res.render(`create`,{
        title:'编辑文章'
    });
});

router.post(`/`,checkNotLogin,function(req,res,next){
    var author_id=req.session.user._id;
    var title=req.fields.title;
    var content=req.fields.content;
     
    try{
        if(!title.length)
            throw new Error('标题不能为空');
        if(!content.length)
            throw new Error('请填写内容');
        
    }
    catch(e){
        req.flash('error',e.message);
        console.log(e.message);
        return res.redirect('back');
    }
    var post={
        author:author_id,
        title:title,
        content:content,
        pv:0
    };
    PostModel.create(post).then(function(result){
        post=result.ops[0];
        req.flash('success','发布成功');
        res.redirect(`/welcome/${post._id}`);
    }).catch(function(e){
        next();
    });
});

module.exports=router;