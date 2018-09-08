var inquirer = require('inquirer')
    ,prettyjson = require('prettyjson')
    ,shuffle = require('shuffle-words')
    ,randomNumber
    ,randomword
    ,definitions = []
    ,synonyms = []
    ,antonyms = []
    ,examples = []
    ,synonymi = 0
    ,antonymi = 0
    ,defi = 0
    ,Word = require('./word')
    ,domains = []
    ,fullObj = {};

var {makerequest} = require('./api');

var optionDisplay = {
    "1":"try again with another word",
    "2":"get a hint(synonym/antonym/defintion or same word with jumbled letters)",
    "3":"quit by knowing the word details"
};

const define = (word,isgame,isfulldict,fn) => {
    makerequest("def",word,function(result){
        continuefun(result,isgame,isfulldict,"def");
        if(fn!=undefined && typeof(fn)=== 'function'){//call examples with synonym as callback
            fn(word,isgame,isfulldict,synonym);
        }
    });
};
const example = (word,isgame,isfulldict,fn) => {
    makerequest("ex",word,function(result){
        continuefun(result,isgame,isfulldict,"ex");
        if(fn!=undefined && typeof(fn)=== 'function'){//call antonym as callback
            fn(word,isgame,isfulldict,antonym);
        }
    });
};
const synonym = (word,isgame,isfulldict,fn) => {
    makerequest("syn",word,function(result){
        continuefun(result,isgame,isfulldict,"syn");
        if(fn!=undefined && typeof(fn)=== 'function'){//call antonym as callback
            fn(word,isgame,isfulldict);
        }
    });
};
const antonym = (word,isgame,isfulldict,fn) => {
    makerequest("ant",word,function(result){
        continuefun(result,isgame,isfulldict,"ant");
        if(fn!=undefined && typeof(fn)=== 'function'){
            fn(word,isgame,isfulldict);
        }
        //start game here
        if(isgame){
            displayforgame(0);
            getguessword();
        }
        else if(!isgame && isfulldict){
            console.log("\n" + prettyjson.render(fullObj,{noColor:false},1)+"\n");
        }
    });
};

const continuefun = (response,isgame,isfulldict,str) => {
    if(response!=null){
        var wordClass = new Word(response);
        var objArr = str=="def"?wordClass.getdefinitions():str=="syn"?wordClass.getsynonyms():str=="ant"?wordClass.getantonyms():str=="ex"?wordClass.getexamples():[];
        if(objArr!=null){
            fullObj[str=="def"?"Definitions":str=="syn"?"Synonyms":str=="ant"?"Antonyms":str=="ex"?"Examples":""] = objArr;
            if(!isgame &&!isfulldict){
                console.log("\n" + prettyjson.render(fullObj,{noColor:false},1)+"\n");
            }
            else if(isgame && str!="ex") {
                pushtoarray(objArr,str);
            }
        }
        else if(!isgame){
            if(!isfulldict){
                console.log("\n No "+(str=="def"?"Definitions":str=="syn"?"Synonyms":str=="ant"?"Antonyms":str=="ex"?"Examples":"")+" found!");
            }
            else{
                fullObj[str=="def"?"Definitions":str=="syn"?"Synonyms":str=="ant"?"Antonyms":str=="ex"?"Examples":""] = "Not Found";
            }
        }
    }
    else if(!isgame){
        if(!isfulldict){
            console.log("\n No "+(str=="def"?"Definitions":str=="syn"?"Synonyms":str=="ant"?"Antonyms":str=="ex"?"Examples":"")+" found!");
        }
        else if(isfulldict){
            fullObj[str=="def"?"Definitions":str=="syn"?"Synonyms":str=="ant"?"Antonyms":str=="ex"?"Examples":""] = "Not Found";
        }
    }
}

const fulldict = (word,isgame,fn) => {
    define(word,isgame,true,example);
};

const pushtoarray = (src, str) =>{
    var tmp = [];
    if(Object.keys(src).length>0){
        Object.keys(src).forEach(function(p) {
            tmp = tmp.concat(src[p]);
        });
    }
    switch(str){
        case "def":
            definitions = tmp;
            break;
        case "syn":
            synonyms = tmp;
            break;
        case "ant":
            antonyms = tmp;
            break;
        default:
            break;
    }
}

const wordofday = () => {
    makerequest("wod","",function(result){
        if(result!=null && result.word){
            console.log("\n Word of the day : \""+result.word+"\"\n");
            fulldict(result.word,false);
        }
        else{
            console.log("something is not right");
        }
    });
};

const startgame = () => {
    //initialize
    definitions = [];
    synonyms = [];
    antonyms = [];
    synonymi = 0;
    antonymi = 0;
    defi = 0;
    fullObj = {};
    // randomword='like';
    // fulldict(randomword,true);
    randomword = getrandomword(function(rw){
        if(rw){
            randomword = rw;
            fulldict(randomword,true);
        }
        else{
            startgame();
        }
    });
}

const getrandomword = (fn) =>{
    if(domains.length>0){
        var randomDomain = domains[Math.floor(Math.random() * domains.length)];
        makerequest("rnd", randomDomain, function(result){
            if(result!=null && result.results!=null && result.results.length>0){
                tmparrw = [];
                result.results.forEach((e,i)=>{
                    if(e.word!=null && e.word.indexOf(" ")<0 && e.word.indexOf("_")<0 && e.word.indexOf("-")<0 ){
                        tmparrw.push(e.word);
                    }
                });
                if(tmparrw.length>0 && fn!=undefined && typeof(fn)=== 'function'){
                    fn(tmparrw[Math.floor(Math.random() * result.results.length)]);
                }
                else{
                    return getrandomword(fn);
                }
            }
            else{
                return getrandomword(fn);
            }
        });
    }
    else{
        makerequest("dom","",function(result){
            if(result!=null && result.results!=null){
                domains = Object.keys(result.results);
                getrandomword(fn);
            }
            else{
                console.log("something is not right");
            }
        });
    }
}

const displayforgame = (flag) => {
    console.log("");
    if(flag){
        randomNumber = Math.floor(Math.random() * 4);
    }
    else{
        randomNumber = Math.floor(Math.random() * 3) + 1;
    }
    switch(randomNumber){
        case 0:
            showshuffled();
            break;
        case 1:
            showantonym();
            break;
        case 2:
            showsynonym();
            break;
        case 3:
            showdefinition();
            break;
        default:
            break;
    }
    console.log("");
};

const showshuffled = () =>{
    console.log("shuffled word : " + shuffle(randomword,true));
}

const showsynonym = () =>{
    if(synonymi<synonyms.length){
        console.log("One of synonyms of the word is : " + synonyms[synonymi]);
        synonymi++;
    }
    else{
        showantonym();
    }
}

const showantonym = () =>{
    if(antonymi<antonyms.length){
        console.log("One of antonyms of the word is : " + antonyms[antonymi]);
        antonymi++;
    }
    else{
        showdefinition();
    }
}

const showdefinition = () =>{
    if(defi<definitions.length){
        console.log("One of definitions of the word is : " + definitions[defi]);
        defi++;
    }
    else{
        showshuffled();
    }
}

const getguessword = () =>{
    inquirer
        .prompt([
            {
                type : 'input',
                name : 'guessword',
                message : 'Enter your guess word : ',
              },
        ])
        .then(answers => {
            var guessword = answers.guessword;
            if(guessword!=undefined&&guessword!=""){
                var foundat = synonyms.indexOf(guessword);
                if((foundat>=0 && foundat>=synonymi) || randomword==guessword){
                    console.log("Yay, the word is correct!");
                }
                else if(foundat>=0 && foundat<synonymi){
                    console.log("\n Already displayed this synonym. Try again :P \n");
                    getguessword();
                }
                else{
                    console.log("");
                    console.log("  Incorrect word, Choose from following options to continue the game");
                    console.log("");
                    console.log(prettyjson.render(optionDisplay,{noColor:false},2));
                    console.log("");
                    getoption();
                }
            }
            else{
                getguessword();
            }
        });
}

const getoption = () =>{
    inquirer
    .prompt([
        {
            type : 'input',
            name : 'option',
            message : 'Enter one of the above options : '
            },
    ])
    .then(answers => {
        if(answers.option!=null && answers.option!=undefined && parseInt(answers.option)!=NaN && parseInt(answers.option)<=3 && parseInt(answers.option)>=1){
            if(answers.option==1){
                getguessword();
            }
            else if(answers.option==2){
                displayforgame(1);
                getguessword();
            }
            else if(answers.option==3){
                console.log("\n The word is \""+randomword+"\"");
                console.log("\n" + prettyjson.render(fullObj,{noColor:false},1)+"\n");
            }
            else {
                getoption();
            }
        }
        else{
            getoption();
        }
    });
}

// Export all methods
module.exports = {
    define,
    synonym,
    antonym,
    example,
    fulldict,
    wordofday,
    startgame,
};