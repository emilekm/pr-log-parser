#!/usr/bin/env node

'use strict';

const fs = require('fs');
const yargs = require('yargs');

const CommandParser = require('../lib/command.parser');
const HashParser = require('../lib/hash.parser');
const LogParser = require('../lib/log.parser');

const argv = yargs
    .alias('i', 'input')
    .alias('o', 'output')
    .alias('t', 'type')
    .argv;

fs.readFile(argv.input, (err, file) => {
    if (err) {
        throw err;
    }

    processFile(file);
})

function processFile(file) {
    let parsed;

    switch(argv.type) {
        case 'hash':
            parsed = new HashParser(file);
            break;
        case 'command':
            parsed = new CommandParser(file);
            break;
        default:
            parsed = new LogParser(file);
            break;
    }

    console.log(parsed.parse());
    if (argv.output) {
    }

}
