var express=require('express');
var app=express();
var path=require('path');

var indexRouter=require('./router/index.js');
var uRouter=require('./router/u.js');

//set ejs 
//模板路径
app.set('views',path.join(__dirname,'views'));
//设置 模板引擎 ejs
app.set('view engine','ejs');

app.use(`/`,indexRouter);
app.use(`/u`,uRouter);

app.listen(3000,`127.0.0.1`);

console.log('express listen on 3000');