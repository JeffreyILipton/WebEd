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
  this.db.collection('media', function(error, article_collection) {
    if( error ) callback(error);
    else callback(null, article_collection);
  });
};


//getMedia
PortfolioInterface.prototype.getMedia= function(callback) {
  this.db.collection('media', function(error, article_collection) {
    if( error ) callback(error);
    else{
		article_collection.find().toArray(function(error, results) {
			callback(null, results);
		});
	}
  });
};



//save
PortfolioInterface.prototype.saveMedia = function(articles, callback) {
	console.log("working at saveMedia");
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
		  if (typeof(article.hdr)=="undefined"){article.hdr="";}
		  if (typeof(article.txt)=="undefined"){article.txt="";}
		  if ((typeof(article.image)=="undefined")){throw("noimg");}
		  
		  
		}
		
        article_collection.insert(articles, function() {
          console.log("inserting");
          callback(null, articles);
        });
      }
    });
};


exports.PortfolioInterface = PortfolioInterface;
