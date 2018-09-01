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

var optionDisplay = {
    "1":"try again with another word",
    "2":"get a hint(synonym/antonym/defintion or same word with jumbled letters)",
    "3":"quit by knowing the word details"
};

const define = (word) => {
    console.log(word);
};
const synonym = (word) => {
    console.log(word);
};
const antonym = (word) => {
    console.log(word);
};
const example = (word) => {
    console.log(word);
};
const fulldict = (word) => {
    data = {"HI":1,"oul":2,"string":"jaskfhj"}
    console.log(prettyjson.render(data,{noColor:false}));
};

const wordofday = () => {
    data = {"word of the day":"none today","oul":2,"string":"asdfas"}
    console.log(prettyjson.render(data,{noColor:false}));
};

const startgame = () => {
    //initialize
    randomword = "apple";//get from api
    synonyms = ["fruit","pineapple","abcd"];
    antonyms = ["none"];
    displayforgame(0);
    getguessword();
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
                fulldict(randomword);
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