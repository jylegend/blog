module.exports = function (app) {
	app.get(`/`, function (req, res) {
		res.redirect('/welcome')
	});
	app.use(`/login`,require(`./login`));
	app.use(`/logout`,require(`./logout`));
	app.use(`/sigup`,require(`./login`));
	app.use(`/welcome`,require(`./welcome`));
};