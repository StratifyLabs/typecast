
import Output from './Output';
import Parser from './Parser';
import sl from '../parsers/sl';
import ls from '../parsers/ls';

export function defaultParser(parser, input, isFinal) {
    let output = null;
    if (parser.outputArray.length == 0) {
        output = new Output("Pre", "");
    } else {
        output = parser.outputArray[0];
    }

    const ansi2html = require('ansi2html');
    output.content += ansi2html(input);
}

export function launch(command){
    var parsed = command.split(" ");
    var processName = parsed[0];
    var args = [];
    for(var i=1; i < parsed.length; i++){
        args.push(parsed[i]);
    }

    const spawn = require('child_process').spawn;
    return spawn(processName, args);
}

export function loadParser(command) {
    const commandTokens = command.split(" ");
    const processName = commandTokens[0];

    let parser = new Parser(commandTokens);

    console.log(`new parser is`);
    console.log(parser);

    switch (processName) {
        case "ls":
            parser.parse = ls;
            break;
        case "sl":
            parser.parse = sl;
            break;
    }

    return parser;
}
