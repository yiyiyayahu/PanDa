/**
 * Simple Homework 2 application for CIS 550
 * 
 * zives
 */

/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , actor = require('./routes/actor')
  , login = require('./routes/login')
  , homepage = require('./routes/homepage')
  , test = require('./routes/test')
  , register = require('./routes/register')
  , search = require('./routes/search')
  , board = require('./routes/board')
  , http = require('http')
  , path = require('path')
;

// Initialize express
var app = express();
// .. and our app
init_app(app);

// When we get a request for {app}/ we should call routes/index.js
app.get('/', routes.do_work);
// when we get a request for {app/actor} we should call routes/actor.js
app.get('/actor', actor.do_work);
app.post('/HomePage', homepage.do_login);
app.post('/FirstVisit', homepage.do_register);
app.post('/test', test.do_work);

app.get('/front.html', routes.do_work);
app.get('/login.html', login.do_work);
app.get('/HomePage.html', homepage.do_work);
app.get('/register.html', register.do_work);
app.get('/Search.html', search.do_work);
app.get('/Board.html', board.do_work);

// Listen on the port we specify
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//////
// This is app initialization code
function init_app() {
	// all environments
	app.set('port', process.env.PORT || 8080);
	
	// Use Jade to do views
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(express.favicon());
	// Set the express logger: log to the console in dev mode
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);

	app.use(express.static(path.join(__dirname, 'css')));
	app.use(express.static(path.join(__dirname, 'images')));
	app.use(express.static(path.join(__dirname, 'js')));
	app.use(express.static(path.join(__dirname, 'waterfall/js/libs/jquery')));
	app.use(express.static(path.join(__dirname, 'waterfall/js/libs/handlebars')));
	app.use(express.static(path.join(__dirname, 'waterfall/js')));
	app.use(express.static(path.join(__dirname, 'waterfall/data/')));
	app.use(express.static(path.join(__dirname, 'waterfall/css')));
	
	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

}