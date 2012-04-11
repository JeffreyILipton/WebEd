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


var sides =[{link:"http://www.fabathome.org","txt":"Top Picks"},
            {link:"http://www.linkedin.com/pub/jeffrey-lipton/26/203/3ba","txt":"Education"},
            {link:"http://creativemachines.cornell.edu","txt":"Household"},
            {link:"http://www.fabathome.org","txt":"Eatables"},
            {link:"http://www.fabathome.org","txt":"Spare Parts"},
            {link:"http://www.fabathome.org","txt":"Woodshop"},
            {link:"http://www.fabathome.org","txt":"Toys/Kids"},
            {link:"http://www.fabathome.org","txt":"Accessories"},
            {link:"http://www.fabathome.org","txt":"New Inventions"},
            {link:"http://www.fabathome.org","txt":"Arts/Crafts"},
            {link:"http://www.fabathome.org","txt":"Tech/Gizmos"}];

// Routes
app.get('/', function(req,res){
	res.render('index.jade',{locals:{
			  title:"SeraphStore",
              sideItems:sides
			  }
	});
});



app.listen(3002);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
