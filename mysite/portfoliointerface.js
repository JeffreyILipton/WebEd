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
PortfolioInterface.prototype.getCollection= function(collection,callback) {
  this.db.collection(collection, function(error, article_collection) {
    if( error ) callback(error);
    else callback(null, article_collection);
  });
};


//getQuery
PortfolioInterface.prototype.getQuery= function(collection,search,callback) {
  this.db.collection(collection, function(error, article_collection) {
    if( error ){
       callback(error);
    }else{
		article_collection.find(search).toArray(function(error, results) {
			callback(null, results);
		});
	}
  });
};

PortfolioInterface.prototype.getBoxesByType = function(typestring,callback){
	this.getQuery('boxes',{type:typestring},callback);
};
PortfolioInterface.prototype.getVidsByType = function(typestring,callback){
	this.getQuery('vids',{type:typestring},callback);
}





//saveMedia
PortfolioInterface.prototype.saveBox = function(articles, callback) {
	console.log("working at saveMedia");
    this.getCollection('boxes',function(error, article_collection) {
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
		  if (typeof(article.tags)=="undefined"){article.tags=[];}
		  if (typeof(article.type)=="undefined"){article.type="";}
		}
		
        article_collection.insert(articles, function() {
          console.log("inserting");
          callback(null, articles);
        });
      }
    });
};



//saveTalks
PortfolioInterface.prototype.saveTalks = function(articles, callback) {
  this.getTalksCollection(function(error, article_collection) {
     if( error ) callback(error)
     else {
        console.log("received: "+articles);
        if( typeof(articles.length)=="undefined"){
          articles = [articles];
          console.log("made into array");
        }
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
                                            });
        callback(null, articles);
     }
  });
};






exports.PortfolioInterface = PortfolioInterface;
