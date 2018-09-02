var http = require('http')
  , qs = require('querystring')
  , path = require('path')
  , host = 'api.wordnik.com/v4'
  , format = 'json'
  , apikey = ''
   ,port = 80
  , wordsection = 'word';

var options = {
  host: host,
  port: port,
  path: host+'/'
};

var obj;//used for mock data

const setpath = (requesttype,query) =>{
  switch(requesttype){
    case "def":
      options.path = options.path+"word.json/"+query+"/definitions?limit=20&includeRelated=true&useCanonical=true&includeTags=false&api_key="+apikey;
      obj=[
        {
          "textProns": [],
          "sourceDictionary": "century",
          "exampleUses": [],
          "relatedWords": [],
          "labels": [],
          "citations": [],
          "word": "ss",
          "partOfSpeech": "noun",
          "sequence": "0",
          "attributionText": "from The Century Dictionary and Cyclopedia",
          "text": "A Middle English form of sh.",
          "score": 0
        },
        {
          "textProns": [],
          "sourceDictionary": "century",
          "exampleUses": [],
          "relatedWords": [],
          "labels": [],
          "citations": [],
          "word": "ss",
          "partOfSpeech": "noun",
          "sequence": "0",
          "attributionText": "from The Century Dictionary and Cyclopedia",
          "text": "A Middle English fashion of writing initial s-.",
          "score": 0
        },
        {
          "textProns": [],
          "sourceDictionary": "century",
          "exampleUses": [],
          "relatedWords": [],
          "labels": [],
          "citations": [],
          "word": "ss",
          "partOfSpeech": "noun",
          "sequence": "0",
          "attributionText": "from The Century Dictionary and Cyclopedia",
          "text": "An abbreviation:",
          "score": 0
        },
        {
          "textProns": [],
          "sourceDictionary": "century",
          "exampleUses": [],
          "relatedWords": [],
          "labels": [],
          "citations": [],
          "word": "ss",
          "partOfSpeech": "noun",
          "sequence": "1",
          "attributionText": "from The Century Dictionary and Cyclopedia",
          "text": "of saints;",
          "score": 0
        },
        {
          "textProns": [],
          "sourceDictionary": "century",
          "exampleUses": [],
          "relatedWords": [],
          "labels": [],
          "citations": [],
          "word": "ss",
          "partOfSpeech": "noun",
          "sequence": "2",
          "attributionText": "from The Century Dictionary and Cyclopedia",
          "text": "of scilicet (common in legal documents).",
          "score": 0
        },
        {
          "textProns": [],
          "sourceDictionary": "century",
          "exampleUses": [],
          "relatedWords": [],
          "labels": [],
          "citations": [],
          "word": "ss",
          "partOfSpeech": "noun",
          "sequence": "0",
          "attributionText": "from The Century Dictionary and Cyclopedia",
          "text": "See Collar of SS., under collar.",
          "score": 0
        }
      ];
      break;
    case "syn":
      obj=[
        {
          "relationshipType": "synonym",
          "words": [
            "affection",
            "tenderness",
            "friendship",
            "delight",
            "fondness",
            "kindness",
            "courtship",
            "nothing",
            "like",
            "pet"
          ]
        }
      ];
    options.path = options.path + "word.json/" + query + "/relatedWords?useCanonical=true&relationshipTypes=synonym&limitPerRelationshipType=10&api_key="+apikey;
    break;
    case "ant":
          obj=[
            {
              "relationshipType": "synonym",
              "words": [
                "malice",
                "angst",
                "hate",
                "spite",
                "hatred",
                "despise"
              ]
            }
          ];
      options.path = options.path+"word.json/"+query+"/relatedWords?useCanonical=true&relationshipTypes=antonym&limitPerRelationshipType=10&api_key="+apikey;
      break;
    case "ex":
    obj={
      "examples": [
        {
          "provider": {
            "name": "wordnik",
            "id": 711
          },
          "year": 2008,
          "rating": 9720,
          "url": "http://api.wordnik.com/v4/mid/905c4e0c870d7bd77aeb34f9eed135a2c4e96fb24525d7df0b24431410038791",
          "word": "love",
          "text": "May 19th, 2009 at 12:27 am love you fergie..you are beautiful..love you.",
          "title": "Casting Director’s No-Brainer: Fergie Cast As Prostitute | YepYep - Your Daily Waste Of Time",
          "documentId": 31999090,
          "exampleId": 455020830
        },
        {
          "provider": {
            "name": "wordnik",
            "id": 711
          },
          "year": 2005,
          "rating": 9589.209,
          "url": "http://api.wordnik.com/v4/mid/5789cb6b406d0f9f9746a1887fc0c4ea50e3090763de9d33415daf40eba23240",
          "word": "love",
          "text": "I mean HELL YES it was still hard to be there when he was with another woman but God tolerates far worse from me and for my love to be pure like Gods love",
          "title": "the-moo Diary Entry",
          "documentId": 23234215,
          "exampleId": 1018032284
        },
        {
          "provider": {
            "name": "wordnik",
            "id": 711
          },
          "year": 2004,
          "rating": 9558,
          "url": "http://api.wordnik.com/v4/mid/96c46bb8eb3e3727c3cfaeec673f43a8fc1987a7b0871ec2ac047202365dfa76",
          "word": "love",
          "text": "I define love * also known as true love* to be a hoax.",
          "title": "lethalpickle Diary Entry",
          "documentId": 23182010,
          "exampleId": 1008797094
        },
        {
          "provider": {
            "name": "wordnik",
            "id": 711
          },
          "year": 2003,
          "rating": 9530.472,
          "url": "http://api.wordnik.com/v4/mid/fd9cf2d986bd377750c8f499c2db8fc335923e985752deb90c4469ccaf0f0c90",
          "word": "love",
          "text": "I have been madly, passionately in love with women that I didn't like as much as Barbara, but I was not _in love_ with her.",
          "title": "The Emerald Triangle",
          "documentId": 22330145,
          "exampleId": 1076567649
        },
        {
          "provider": {
            "name": "wordnik",
            "id": 711
          },
          "rating": 9079.42,
          "url": "http://api.wordnik.com/v4/mid/ec246d109f26bb6d38acbd8670e728129950c454615bddc31ce12b0feffee58d",
          "word": "love",
          "text": "Some women think they have love when _love has them_.",
          "title": "The Man Thou Gavest",
          "documentId": 18092306,
          "exampleId": 1180714953
        },
        {
          "provider": {
            "name": "wordnik",
            "id": 711
          },
          "rating": 9079.42,
          "url": "http://api.wordnik.com/v4/mid/f51797828709c3b7ba0b5d37550c32e6f0c02dc6b60d65112b202b5927ccf414",
          "word": "love",
          "text": "We can get the good of our disability by conscientiously driving home the principle that in order to 'love others as ourselves' we must learn to _love ourselves as we love others_.",
          "title": "Study of Child Life",
          "documentId": 18092030,
          "exampleId": 1178594367
        },
        {
          "provider": {
            "name": "wordnik",
            "id": 711
          },
          "rating": 9079.42,
          "url": "http://api.wordnik.com/v4/mid/a9a188f9ae788fd1b1e458f215b4dd00d6a5b8606f0630d9e186e465e10b6695",
          "word": "love",
          "text": "I love you with a _constant and unchangeable love_; notwithstanding of all your weaknesses, yea, unkindness too, and unworthy walkings before me: thus you are bound to love one another.",
          "title": "The Divine Right of Church Government by Sundry Ministers Of Christ Within The City Of London",
          "documentId": 18091763,
          "exampleId": 1176884988
        },
        {
          "provider": {
            "name": "wordnik",
            "id": 711
          },
          "rating": 9079.42,
          "url": "http://api.wordnik.com/v4/mid/a9a188f9ae788fd1b1e458f215b4dd00e9f9690e1c22dcac2cf05c072b90422c",
          "word": "love",
          "text": "I love with a _holy, spiritual love_, as new men who have my image stamped on, and my holy nature in you, and as you are made perfect by the comeliness and beauty I have put on you: so do you love one another, because you are a lovely and holy people unto me.",
          "title": "The Divine Right of Church Government by Sundry Ministers Of Christ Within The City Of London",
          "documentId": 18091763,
          "exampleId": 1176884987
        },
        {
          "provider": {
            "name": "wordnik",
            "id": 711
          },
          "rating": 9079.42,
          "url": "http://api.wordnik.com/v4/mid/a9a188f9ae788fd1b1e458f215b4dd00cebd70ea75541de9b18ca72070ffc070",
          "word": "love",
          "text": "I love you with a _warm and fervent love_: so do you love one another.",
          "title": "The Divine Right of Church Government by Sundry Ministers Of Christ Within The City Of London",
          "documentId": 18091763,
          "exampleId": 1176884986
        },
        {
          "provider": {
            "name": "wordnik",
            "id": 711
          },
          "rating": 9079.42,
          "url": "http://api.wordnik.com/v4/mid/a9a188f9ae788fd1b1e458f215b4dd00b2808665353090c5f3bcbd9985178983",
          "word": "love",
          "text": "My love to you is a _pitying, sparing, and forgiving love; a forbearing and tender-hearted love_: so must you be to one another, Col. iii.",
          "title": "The Divine Right of Church Government by Sundry Ministers Of Christ Within The City Of London",
          "documentId": 18091763,
          "exampleId": 1176884985
        }
      ]
    };
      options.path = options.path+"word.json/"+query+"/examples?includeDuplicates=false&useCanonical=true&limit=10&api_key="+apikey;
      break;
    case "wod":
    obj={
      "id": 521695,
      "word": "caggy",
      "note": "The origin of 'caggy' is uncertain.",
      "contentProvider": {
        "name": "wordnik",
        "id": 711
      },
      "publishDate": "2018-09-02T03:00:00.000+0000",
      "examples": [
        {
          "url": "http://api.wordnik.com/v4/mid/831ad5cb2a69ebfbabf58e19c2bef07724b7720a89f32be4396acc2efcc8de29",
          "text": "Henry now stood forward as our leader and spokesman: eloquently did he descant upon all our grievances, not forgetting mouldy bread, caggy mutton, and hebdomadal meat pies.",
          "title": "Rattlin the Reefer",
          "id": 1156441677
        }
      ],
      "definitions": [
        {
          "text": "Decaying; tainted; unwholesome; loathsome.",
          "partOfSpeech": "adjective",
          "source": "century"
        }
      ]
    }
      options.path = options.path+"words.json/wordOfTheDay?api_key="+apikey;
      break;
    case "rnd":
    obj={
      "id": 99316,
      "word": "inosculate"
    }
      options.path = options.path+"words.json/randomWord?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key="+apikey;
      break;
    default:
      console.log("something is not right.");
      break;
  }
}

const makerequest = (requesttype,word,fn) => {
  setpath(requesttype,word);
  
  fn(obj);
  // http.get(options, function(res){
  //   var result = '';
  //   res.on('data', function(chunk) {
  //     result += chunk;
  //   });
  //   res.on('end', function() {
  //     result = JSON.parse(result);
  //     if (res.statusCode >= 400) {
  //       return fn(result, requesttype);
  //     }
  //     return fn(null, requesttype);
  //   });
  //   res.on('error', function(e) {
  //     return fn(null,requesttype);
  //   });
  // })
}

module.exports = {
  makerequest,
}
