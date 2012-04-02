
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});



var navbar = [{link:"http://www.google.com","text":"Home"},
	          {link:"#","text":"About"},
	          {link:"#","text":"Blog"},
	          {link:"#","text":"Contact"}];
var grids = [{image:"http://d2o0t5hpnwv4c1.cloudfront.net/373_html5/final/images/flower.png",link:"http://www.google.com","hdr":"woot","txt":"Awww yeah"},
			 {image:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.jpg", link:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.html","hdr":"O snap","txt":"Im fucking awesome"}];
var sides =[{link:"http://www.google.com","txt":"google"},
            {link:"http://www.bing.com","txt":"bing"},
            {link:"http://www.yahoo.com","txt":"yahoo"}];

// Routes
app.get('/', function(req,res){
	res.render('index.jade',{locals:{
	   title:"TESTING",
	   navItems: navbar,
	   gridItems:grids,
	   sideItems:sides}});
});

app.listen(3002);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
