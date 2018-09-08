#!/usr/bin/env node
const { prompt } = require('inquirer');

const program = require('commander');
const { define, synonym, antonym, example, fulldict, wordofday, startgame  } = require('./lib/mediator');

program
  .version('0.0.1')
  .description('Dictionary app');

program
  .command('def <word>')
  .description('Display definitions of a word')
  .action(word => define(word,false,false)
);

program
  .command('syn <word>')
  .description('Display synonyms of a word.')
  .action((word) => synonym(word,false,false));

program
  .command('ant <word>')
  .description('Display antonyms of a word.')
  .action((word) => antonym(word,false,false));

program
  .command('ex <word>')
  .description('Display examples of a word.')
  .action((word) => example(word,false,false));

program
  .command('* <word>')
  .description('Display full details of a word.')
  .action((word) => fulldict(word));

program
  .command('play')
  .description('Play a game with me.')
  .action(()=>startgame());

//command validation
if(process.argv.slice(2).length<=0){
  //wordofday();
  console.log("\n  Word of the day functionality is disabled. Please use the help displayed below")
  program.outputHelp();
  process.exit();
}
else if(process.argv.slice(2).length==2 && ["def","syn","ant","ex"].indexOf(process.argv.slice(2)[0])<0 ){
  program.outputHelp();
  process.exit();
}
else if(process.argv.slice(2).length>2){
  program.outputHelp();
  process.exit();
}

program.parse(process.argv)