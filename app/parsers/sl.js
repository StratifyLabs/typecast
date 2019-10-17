
exports.sl = function(context, input, isFinal = false){
    let isReadme = context.command.find(function(element){
        return element == '--readme'
    });

    if( isFinal === true ){
        console.log("final call");
    } else {
        console.log("not final");
    }

    if( isReadme == '--readme' ){
        console.log("use markdown");
        context.output.type = "Markdown";
        context.output.id = Date.now();
        context.output.content += input;
        return context;
    } else {
        const yaml = require('js-yaml');


    }

    console.log("use default");
    return require('../utils/parser').defaultParser(context, input, isFinal);
}