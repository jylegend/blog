var express=require('express');
var router=express.Router();

// `/u/:name` :name 占位符作用 => express 使用了 path-to-regexp 模块实现的路由匹配
router.get(`/:name`, function (req, res, next) {
	//render('模板的名字，也就是匹配views下的u.ejs 其作用就是将模板和数据结合生成 html，同时设置响应头中的 Content-Type: text/html，告诉浏览器我返回的是 html，不是纯文本，要按 html 展示')
	if (req.params.name=='1') {
		res.status(500).send('Service Error');
		next();
	}
	res.render('u', {
		name: req.params.name,
		age: 20,
		htmlStyle: '<h2>HELOOO</h2>',
		jsLimit: `<script>alert(1)</script>`,
		uList: ['express', 'koa', 'ts']
	});
});

module.exports=router;