var Post=require('../lib/mongo').Post;

module.exports={
    //注册一个用户
    create:function(post){
        return Post.create(post).exec();
    }
};