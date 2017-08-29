var express=require('express');
var app=express();
var path=require('path');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
var flash=require('connect-flash');
var config=require('./config/defalut');
var routers=require('./router');
var pkg=require('./package');

var app=express();

//set ejs 
//模板路径
app.set('views',path.join(__dirname,'views'));
//设置 模板引擎 ejs
app.set('view engine','ejs');

//设置静态文件
app.use(express.static(path.join(__dirname,'public')));

//注意：中间件的加载顺序很重要。
//如上面设置静态文件目录的中间件应该放到 routes(app) 之前加载，
//这样静态文件的请求就不会落到业务逻辑的路由里；
//flash 中间件应该放到 session 中间件之后加载，因为 flash 是基于 session 的。

//session 中间件
app.use(session({
    name: config.session.key,         //设置cookie中保存session id 字段名称
    secret: config.session.secret,    //通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,                     //强制更新session
    saveUninitialized: false,         //设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge //过期时间，过期后session id 自动删除 无效
    },
    store: new MongoStore({           //将session 保存到Mongodb
        url: config.mongodb           //mongodb 地址 
    })
}));
//flash 中间件 显示通知
app.use(flash());

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir:path.join(__dirname,'public/img'),//上传目录
    keepExtensions:true //保留后缀
}));

//app.locals 上通常挂载常量信息（如博客名、描述、作者信息） 全局常量
app.locals.blog={
    title:pkg.name,
    description: pkg.description
};
// 添加模板必需的三个变量 调用 res.render 的时候就不用传入这四个变量了
app.use(function(req,res,next){
    res.locals.user=req.session.user;
    res.locals.success=req.flash('success').toString();
    res.locals.error=req.flash('error').toString();
    next();
});
// 路由
routers(app);

app.listen(config.port,function(){
    console.log(`${pkg.name} listening on port ${config.port}`);
});

console.log('express listen on 3000');