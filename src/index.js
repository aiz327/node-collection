var Crawler = require("crawler");
var Datastore = require('nedb');
var stockDB = new Datastore({ 
  filename: 'db/first',
  autoload: true,
});

var c = new Crawler({
  maxConnections : 10,
  // This will be called for each crawled page
  callback : function (error, res, done) {
      if(error){
          console.log(error);
      }else{
          var $ = res.$;
          // $ is Cheerio by default
          //a lean implementation of core jQuery designed specifically for the server
          console.log($("title").text());
      }
      done();
  }
});

// Queue URLs with custom callbacks & parameters
c.queue([{
  uri: 'https://www.baidu.com',
  jQuery: true,

  // The global callback won't be called
  callback: function (error, res, done) {
      if(error){
          console.log(error);
      }else{
        var $ = res.$;
        console.log($("script").text())
        // stockDB.insert({1: res.body}, function (err, newDoc) {   // Callback is optional
        //   console.log(err, newDoc)
        //   console.log("storedb success");
        // });
      }
      done();
  }
}]);