
exports.defaultParser =  function(context, input, isFinal){
    context.output.type = "Pre";
    context.output.id = Date.now();
    const ansi2html = require('ansi2html')
    context.output.content += ansi2html(input);
    return context;
}

exports.loadParser = function(command){
    const commandTokens = command.split(" ");
    const processName = commandTokens[0];

    let context = {
        parse: exports.defaultParser,
        command: commandTokens, 
        state: null, 
        id: Date.now(),
        output: {
            type: null,
            id: null,
            content: ""
        }
    };

    switch(processName){
        case "ls":
            context.parse = require('../parsers/ls').ls;
            break;
        case "sl":
            context.parse = require('../parsers/sl').sl;
            break;
    }

    return context;
}