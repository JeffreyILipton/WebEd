var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

PortfolioInterface = function(host, port) {
  this.db= new Db('portfolio', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};

//getCollection

PortfolioInterface.prototype.getCollection= function(callback) {
  this.db.collection('talks', function(error, article_collection) {
    if( error ) callback(error);
    else callback(null, article_collection);
  });
};


//getMedia
PortfolioInterface.prototype.getTalks= function(callback) {
  this.db.collection('talks', function(error, article_collection) {
    if( error ) callback(error);
    else{
		article_collection.find().toArray(function(error, results) {
			callback(null, results);
		});
	}
  });
};



//save
PortfolioInterface.prototype.saveTalks = function(articles, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
		console.log("received: "+articles);
        if( typeof(articles.length)=="undefined")
          articles = [articles];
		  console.log("made into array");
        
		for (articleid in articles){
		  var article = articles[articleid];
		  console.log("Article:"+articleid+" >"+article);
		  if (typeof(article.link)=="undefined"){article.link="#";}
		  if (typeof(article.title)=="undefined"){article.title="";}
		  if (typeof(article.tags)=="undefined"){article.tags=[];}
		  if (typeof(article.isvid)=="undefined"){article.isvid=false;}
		  
		}
		
        article_collection.insert(articles, function() {
          console.log("inserting");
          callback(null, articles);
        });
      }
    });
};

var Talks=[ {title:"TedX Creating in the Classroom: The Future of Education",date:"10/3/2011", isvid:true, link:"http://youtu.be/ealGFfVEYOU",tags:["education","TED","classroom","Fab@Home","3D Printing", "Cornell"]},
{title: "Maker Faire: 3D Printing in the Classroom: Fab@Home / Fab@School",date: "5/22/2011",isvid:true, link:"http://youtu.be/EHXoLHTy3Aw", tags:["education","Make","Maker Faire","classroom","Fab@Home","3D Printing"]},
{title:"Ignite Ithaca", date:"4/29/2010", isvid:true, link:"http://youtu.be/qTGyQmMH7v8", tags:["Ignite","Fab@Home","3D Printing"]},
{title:"Fab@Home and the Future of Personal Manufacturing", date:"9/17/2011", isvid:true, link:"http://fora.tv/embed?id=14191&amp;type=c", tags:["Maker Faire","classroom","Fab@Home","3D Printing"]},
{title:"MacArthur Award DMC Ignite talk", date:"3/5/2011", isvid:true, link:"http://youtu.be/TGhyESfgrJ4",tags:["education","classroom","Fab@Home","3D Printing"]},
{title:"Digital Gastronomy",date:"10/25/2011",isvid:false, link:"http://3dprintingevent.com/wp-content/themes/3dprinting-V2/images/logo-3d.png",tags:['Food','Food printing','Confrence','3d Printing','Fab@Home']},
{title:"AAAS 2001", date:"2/17/2011", isvid:false, link:"http://www.aaas.org/images/main_logo.gif", tags:["Outreach","AAAS","3D Printing",'Fab@Home', 'Organ Printing']},
{title:"World Science Fair", date:"6/5/2011", isvid:false, link:"http://worldsciencefestival.com/-/img/logo_wsf.gif", tags:["Outreach","3d printing","education"]}]; 
 
 
var pi = new PortfolioInterface('localhost',27017);
console.log(typeof(pi));
pi.saveTalks(Talks, function(){console.log("saved talks")});


exports.PortfolioInterface = PortfolioInterface;
