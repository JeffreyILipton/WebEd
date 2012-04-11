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

var apps=[{hdr:'Logo2Fab',txt:'Program a Shape using Logo',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'Cool Cookie',txt:'Create your own cookie',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'Scrapbook Cutter',txt:'Create Letters and Cutouts',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'Birdhouse',txt:'Build a home for birds',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'Physics Ramp',txt:'Learn about gravity',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'Jewlery Box',txt:'Custom for all your gems',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'Chocolate Design',txt:'Draw any shape in sweetnes',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'RaceCar',txt:'Make your own RC car',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'Custom Blocks',txt:'Make your own LEGO blocks',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'Battery Cover',txt:'Lost it? Make it!',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'House Hooks',txt:'hand it up right away',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'Iphone Stand',txt:'stop droping your phone',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'Wacky Wristband',txt:'draw the shape and wear the band',src:"/images/SeraphIcon-5-blue.png",link:"#"},
{hdr:'Chess Set',txt:'Customize the set for you',src:"/images/SeraphIcon-5-blue.png",link:"#"}
]

// Routes
app.get('/', function(req,res){
    res.render('index.jade',{locals:{
              title:"SeraphStore",
              sideItems:sides,
              appdisplays:apps
              }
    });
});



app.listen(3002);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
