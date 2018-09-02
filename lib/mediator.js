var inquirer = require('inquirer')
    ,prettyjson = require('prettyjson')
    ,shuffle = require('shuffle-words')
    ,randomNumber
    ,randomword
    ,definitions = []    
    ,synonyms = []
    ,antonyms = []
    ,synonymi = 0
    ,antonymi = 0
    ,defi = 0;

var {makerequest} = require('./api');

var optionDisplay = {
    "1":"try again with another word",
    "2":"get a hint(synonym/antonym/defintion or same word with jumbled letters)",
    "3":"quit by knowing the word details"
};

const define = (word,isgame,fn) => {
    makerequest("def",word,function(result){
        if(result.length>0){
            if(isgame){
                definitions=[];
                defi=0;
            }
            else{
                console.log("\n Definitions : \n");
            }
            result.forEach((element,index) => {
                var tmpobj={};
                tmpobj[element.partOfSpeech] = element.text;
                if(isgame){
                    definitions.push(element.text);
                }
                else{
                    console.log(prettyjson.render(tmpobj,{noColor:false},2)+"\n");
                }
            });
        }
        else{
            if(!isgame){
                console.log("\n No definitions found! \n");
            }
        }
        if(fn!=undefined && typeof(fn)=== 'function'){//call examples with synonym as callback
            fn(word,isgame,synonym,);
        }
    });
};
const example = (word,isgame,fn) => {
    makerequest("ex",word,function(result){
        if(result!=null && result.examples!=null && result.examples.length>0){
            if(!isgame){
                console.log("\n Examples : \n");
            }
            result.examples.forEach((element,index) => {
                var tmpobj={};
                tmpobj[index+1] = element.text;
                if(!isgame){
                    console.log(prettyjson.render(tmpobj,{noColor:false},2)+"\n");
                }
            });
        }
        else{
            if(!isgame){
                console.log("\n No examples found! \n");
            }
        }      
        if(fn!=undefined && typeof(fn)=== 'function'){//call antonym as callback
            fn(word,isgame,antonym);
        }
    });
};
const synonym = (word,isgame,fn) => {
    makerequest("syn",word,function(result){
        if(result!=null && result.length>0 && result[0].words!=null && result[0].words.length>0){
            if(isgame){
                synonyms=[];
                synonymi=0;
            }
            else{
                console.log("\n Synonyms : \n");
            }
            result[0].words.forEach((element,index) => {
                var tmpobj={};
                tmpobj[index+1] = element;
                if(isgame){
                    synonyms.push(element);
                }
                else{
                    console.log(prettyjson.render(tmpobj,{noColor:false},2)+"\n");
                }
            });
        }
        else{
            if(!isgame){
                console.log("\n No synonyms found! \n");
            }
        }
        if(fn!=undefined && typeof(fn)=== 'function'){//call antonym as callback
            fn(word,isgame);
        }
    });
};
const antonym = (word,isgame,fn) => {
    makerequest("ant",word,function(result){
        if(result!=null && result.length>0 && result[0].words!=null && result[0].words.length>0){
            if(isgame){
                antonyms=[];
                antonymi=0;
            }
            else{
                console.log("\n Antonyms : \n");
            }
            result[0].words.forEach((element,index) => {
                var tmpobj={};
                tmpobj[index+1] = element;
                if(isgame){
                    antonyms.push(element);
                }
                else{
                    console.log(prettyjson.render(tmpobj,{noColor:false},2)+"\n");
                }
            });
        }
        else{
            if(!isgame){
                console.log("\n No antonyms found! \n");
            }
        }
        if(fn!=undefined && typeof(fn)=== 'function'){//call antonym as callback
            fn(word);
        }
        //start game here
        if(isgame){
            displayforgame(0);
            getguessword();
        }
    });
};
const fulldict = (word,isgame,fn) => {
    define(word,isgame,example);
};

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
    makerequest("rnd","",function(result){
        if(result!=null && result.word){
            randomword = result.word;
            fulldict(result.word,true);
        }
        else{
            console.log("something is not right");
        }
    });
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
                if(synonyms.indexOf(guessword)>=0 || randomword==guessword){
                    console.log("Yay, the word is correct!");
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
                fulldict(randomword,false);
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