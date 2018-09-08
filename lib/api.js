var https = require('https')
  , qs = require('querystring')
  , path = require('path')
  , host = 'od-api.oxforddictionaries.com'
  , format = 'json'
  , apikey = ''
   ,port = 443
  , wordsection = 'word'
  , Word = require('./word');

var options = {
  host: host,
  port: port,
  path: '/api/v1',
  headers:{
    'Accept': 'application/json',
    'app_id': '****',
    'app_key': '***'
  },
  method:'GET',
};

const setpath = (requesttype,query) =>{
  options.path = '/api/v1';
  switch(requesttype){
    case "def":
      options.path = options.path+"/entries/en/"+query;
      break;
    case "syn":      
      options.path = options.path + "/entries/en/"+query+"/synonyms";
      break;
    case "ant":
      options.path = options.path + "/entries/en/"+query+"/antonyms";
      break;
    case "ex":
      options.path = options.path+"/entries/en/"+query;
      break;
    case "rnd":    
      options.path = options.path+"/wordlist/en/domains%3D"+query+"?limit=10";
      break;
    case "dom":  
      options.path = options.path+"/domains/en";
      break;
    default:
      console.log("something is not right.");
      break;
  }
}

const makerequest = (requesttype,word,fn) => {
  setpath(requesttype,word);
  var req = https.request(options, (res) => {
    var result = '';
    res.on('data', (d) => {
      result += d;
    });
    res.on('end', function() {
      if (res.statusCode == 200) {
        result = JSON.parse(result);
        fn(result);
      }
      else{
        fn(null);
      }
    });
    res.on('error', function(e) {
      console.error(`Got error: \'${e.message}\' from server.`);
      return fn(null,requesttype);
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}

module.exports = {
  makerequest,
}
