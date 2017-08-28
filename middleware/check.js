//权限 检查权限
module.exports={
    checkNotLogin:function(req,res,next){
        if(!req.session.user){
            req.flash('用户未登录');
            return res.redirect('/login');
        }
        next();
    },
    checkLogin:function(req,res,next){
        if(req.session.user){
            return res.redirect('back');
        }
        next();
    }
}