/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');
var CVarray = require('./papers').CVarray;
var recaptcha_async = require('recaptcha-async');
var emailer = require('mailer');
var portinterface = require('./portfoliointerface').PortInterface;

// Load Settings
var sideTitle = require('./settings').sideTitle;
var navbar = require('./settings').navBar;
var sides = require('./settings').sides;
var myintro = require('./settings').intro;


//var sideTitle = 'Links';




var app = module.exports = express.createServer();

var portinterface = new PortfolioInterface("localhost", 27017);	
//var myintro = {hdr:"Welcome to JeffreyILipton.com",txt:"This is the personal website for Jeffrey Lipton"};



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



//var navbar = [{link:"/","text":"Home"},
//                  {link:"/cv","text":"C.V."},
//	          {link:"/media","text":"Media"},
//	          {link:"/talks","text":"Talks and Outreach"},
//	          {link:"/contact","text":"Contact"}];

//var sides =[{link:"http://www.linkedin.com/pub/jeffrey-lipton/26/203/3ba","txt":"LinkedIn"},
//            {link:"http://www.creativemachines.cornell.edu","txt":"Creative Machines Lab"},
//            {link:"http://www.fabathome.org","txt":"Fab@Home"}];


// Routes
app.get('/', function(req,res){
    portinterface.getBoxesByType('talk',function(error,grids){
		res.render('index.jade',{locals:{
			title:"JeffreyILipton.com",
			navItems: navbar,
			sideItems:sides,
			sidebar:sideTitle,
			homeintro: myintro,
			gridItems:grids,
			vidItems:[]}
			});
		});
});

app.get('/cv',function(req,res){
    res.render('cv.jade',{locals:{
                 title:'CV',
                 navItems:navbar,
                 sideItems:sides,
                 sidebar:sideTitle,
                 CV:CVarray
                 }
              });
});


app.get('/talks', function(req,res){
    portinterface.getBoxesByType('talk', function(error,talkgrids){
       portinterface.getVidsByType('talk',function(error,talkvids){
      		res.render('boxdisplays.jade',{locals:{
			title:"Portfolio",
			navItems: navbar,
			sideItems:sides,
			sidebar:sideTitle,
			sectionItems:[{id:"talks", hdr:"Talks and Outreach", 
			               vidItems:talkvids, gridItems:talkgrids}]			
			}});
		});
	
    });
});

app.get('/media', function(req,res){
    portinterface.getBoxesByType('media',function(error,grids){
		res.render('boxdisplays.jade',{locals:{
			title:"Media Coverage",
			navItems: navbar,
			sideItems:sides,
			sidebar:sideTitle,
			sectionItems:[{id:"print", hdr:"Media", vidItems:[], gridItems:grids}]
//						  {id:"videos", hdr:"Videos", vidItems:vids,gridItems:grids}]
			}});
		});
});

app.get('/media/new', function(req, res) {
    res.render('media_new.jade', { locals: {
        title: 'Set New Media',
        navItems: navbar,
		sideItems:sides,
		sidebar:sideTitle,
        blankimage:""
    }
    });
});

app.post('/media/new', function(req, res){
    portinterface.saveBox({
        image: req.param('img'),
        link: req.param('link'),
        hdr: req.param("hdr"),
        txt: req.param("txt"),
        type: String(req.param('type')).toLowerCase(),
        tags: String(req.param('tags')).split(",")
        },function( error, docs) {
        res.redirect('/')
    });
});	

app.get('/contact', function(req,res){
   	res.render('contact.jade',{locals:{
		title:"Contact Jeff",
                navItems: navbar,
		sideItems:sides,
		sidebar:sideTitle,
		}});
});

app.post('/contact',function(req,res,next){
	    var recaptcha = new recaptcha_async.reCaptcha();

        // Eventhandler that is triggered by checkAnswer()
        recaptcha.on('data', function (recaptcha_response) {
                if(recaptcha_response.is_valid){
					var email = req.param("email");
					var subject = req.param("subject");
					var message = req.param("message");
					var name = req.param("name");
					console.log(name+","+email);
					
					
					emailer.send({
						host:'smtp.gmail.com',
						port:'465',
						ssl:true,
						domain:'gmail.com',
						to:'jeffreyilipton@gmail.com',
						from:'jeffreyiliptonsbot@gmail.com',
						subject: subject,
						body:'email from :'+name+'<'+email+'>\n'+message,
						authentication:'login',
						username:'jeffreyiliptonsbot',
						password:'MyBotIsDumb1'
					},
					function(err,result){
						if(err){console.log(err);}
					});
					
					
					
					
					
					
                }else{
					console.log("SPAM!!!");
					
	            }
                res.render('contact.jade', {
					locals: {
					   title: recaptcha_response.is_valid ? 'valid' : 'invalid',
					   navItems:navbar,
					   sideItems:sides,
					   sidebar:"Sides"
					}
			    });
        });

        // Check the user response by calling the google servers
        // and sends a 'data'-event
        recaptcha.checkAnswer('6LcPwM8SAAAAABDeDYyKeDksx5xcUeEg9sR1lSuj',  // private reCaptchakey 
                          req.connection.remoteAddress,
                          req.body.recaptcha_challenge_field,
                          req.body.recaptcha_response_field);
});

app.listen(3002);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
