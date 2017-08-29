module.exports = function (app) {
	app.get(`/`, function (req, res) {
		res.redirect('/welcome')
	});
	app.use(`/signin`,require(`./login`));
	app.use(`/logout`,require(`./logout`));
	app.use(`/signup`,require(`./sigup`));
	app.use(`/welcome`,require(`./welcome`));
};