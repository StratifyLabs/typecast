
function parseLs(context, input){
    const lines = input.split('\n');
    var i = 0;

    if( context.state === null ){
        //first line is the total
        let firstTokens = lines[0].split(" ");
        if( firstTokens.length > 1 ){
            context.state = { total: firstTokens[1] };
            i = 1;
        }
        context.output.type = "Pre";
    } 

    while(i < lines.length ){
        line = lines[i].split(" ");
        if( line.length == 1 ){
            //just a simple output
            context.output.content += line;
            if( line != "" ){
                context.output.content += '\n';
            } 
        } else {
            let noEmptyTokens = line.filter(function(a){
                return a !== "";
            });
            context.output.content += noEmptyTokens;
            if(line != "" ){
                context.output.content += '\n';
            } 
        }
        i++;
    }

    context.output.id = Date.now();
    return context;
}

function parseDefault(context, input){
    context.output.type = "Pre";
    context.output.id = Date.now();
    const ansi2html = require('ansi2html')
    context.output.content += ansi2html(input);
    return context;
}

function parseSl(context, input){
    let isReadme = context.command.find(function(element){
        return element == '--readme'
    });
    console.log(`look for readme in ${context.command.length} options ${isReadme}`);
    if( isReadme == '--readme' ){
        console.log("use markdown");
        context.output.type = "Markdown";
        context.output.id = Date.now();
        context.output.content += input;
        return context;
    }

    console.log("use default");
    return parseDefault(context, input);
}

exports.loadParser = function(command){
    const commandTokens = command.split(" ");
    const processName = commandTokens[0];

    let context = {
        parse: parseDefault,
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
            context.parse = parseLs;
            break;
        case "sl":
            context.parse = parseSl;
            break;
    }

    return context;
}