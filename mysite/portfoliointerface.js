var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

PortfolioInterface = function(host, port) {
  this.db= new Db('portfolio', new Server(host, port, {auto_reconnect: true}, {}));
  this.db.open(function(){});
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
PortfolioInterface.prototype.saveArticle = function(articles, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        if( typeof(articles.length)=="undefined")
          articles = [articles];
		for (articleid in articles){
		  article = articles[articleid];
		  if (typeof(articles.img)=="undefined"){throw("noimg");}
		  if (typeof(articles.link)=="undefined"){article.link="#";}
		  if (typeof(articles.hdr)=="undefined"){article.hdr="";}
		  if (typeof(articles.txt)=="undefined"){article.txt="";}
		}
        article_collection.insert(articles, function() {
          callback(null, articles);
        });
      }
    });
};


exports.PortfolioInterface = PortfolioInterface;
