
exports.ls = function(context, input, isFinal = false){
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