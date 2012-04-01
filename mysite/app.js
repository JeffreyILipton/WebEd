/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var portinterface = require('./portfoliointerface').PortInterface;

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

portinterface = new PortfolioInterface("localhost", 27017);	

var navbar = [{link:"http://www.google.com","text":"Home"},
	          {link:"#","text":"About"},
	          {link:"#","text":"Blog"},
	          {link:"#","text":"Contact"}];

var sides =[{link:"http://www.google.com","txt":"google"},
            {link:"http://www.bing.com","txt":"bing"},
            {link:"http://www.yahoo.com","txt":"yahoo"}];

/*var grids = [{image:"http://d2o0t5hpnwv4c1.cloudfront.net/373_html5/final/images/flower.png",link:"http://www.google.com","hdr":"woot","txt":"Awww yeah"},
			 {image:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.jpg", link:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.html","hdr":"Hotel Innovation","txt":"Presented at the Cornell NYC innovation network"},
			 {image:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.jpg", link:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.html","hdr":"O snap","txt":"Im fucking awesome"},
			 {image:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.jpg", link:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.html","hdr":"O snap","txt":"Im fucking awesome"},
			 {image:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.jpg", link:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.html","hdr":"O snap","txt":"Im fucking awesome"},
			 {image:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.jpg", link:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.html","hdr":"O snap","txt":"Im fucking awesome"},
			 {image:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.jpg", link:"http://www.news.cornell.edu/stories/Dec11/NYCInnovation.html","hdr":"O snap","txt":"Im fucking awesome"}];
*/

// Routes
app.get('/', function(req,res){
    portinterface.getMedia(function(error, grids){
		res.render('index.jade',{locals:{
			title:"TESTING",
			navItems: navbar,
			sideItems:sides,
			gridItems:grids
			}});
		});
});

app.get('/media/new', function(req, res) {
    res.render('media_new.jade', { locals: {
        title: 'New Media',
        navItems: navbar,
		sideItems:sides,
        blankimage:"http://d2o0t5hpnwv4c1.cloudfront.net/373_html5/final/images/flower.png"
    }
    });
});

app.post('/media/new', function(req, res){
    console.log("posted");
    portinterface.saveMedia({
        image: req.param('img'),
        link: req.param('link'),
        hdr: req.param("hdr"),
        txt: req.param("txt")
        },function( error, docs) {
        res.redirect('/')
    });
});	



app.listen(3002);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
