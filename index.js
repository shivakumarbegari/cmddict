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
  .action(word => define(word)
);

program
  .command('syn <word>')
  .description('Display synonyms of a word.')
  .action((word) => synonym(word));

program
  .command('ant <word>')
  .description('Display antonyms of a word.')
  .action((word) => antonym(word));

program
  .command('ex <word>')
  .description('Display examples of a word.')
  .action((word) => example(word));

program
  .command('* <word>')
  .description('Display full details of a word.')
  .action((word) => fulldict(word));

program
  .command('play')
  .description('Play a game with me.')
  .action(()=>startgame());


program.parse(process.argv)