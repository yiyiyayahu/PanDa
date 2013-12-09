exports.do_work = function(req, res){
	console.log('User name: ' + req.query.username);
	console.log('Keyword: ' + req.query.keyword);
	res.render('homepage.jade', {
		username: req.query.username
	});
};