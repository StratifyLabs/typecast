
import Output from '../utils/Output';

export default function ls(parser, input, isFinal = false){
    const lines = input.split('\n');

    let output = null;

    if( parser.outputArray.length == 0 ){
        //first line is the total
        let type = "Pre";
        let content = "";
        let firstTokens = lines[0].split(" ");
        parser.state = {
            count: 0
        }
        if( firstTokens.length > 1 ){
            console.log("init state");
            type = "Markdown";
            content = "Permissions | ino | owner | group | size | month | day | time | name\n";
            content += "-----|-----|----|-----|-----|-----|-----|-----|-----\n";
            parser.state.count = 1;
        }
        output = new Output(type, content);
        parser.outputArray.push(output);
    } else {
        output = parser.outputArray[0];
    }

    let i = parser.state.count;

    while(i < lines.length ){
        let line = lines[i].split(" ");

        if( output.type == "Pre" ){
            //just a simple output
            output.content += lines[i];
            if( lines[i] != "" ){
                output.content += '\n';
            } 
        } else {
            //create a markdown table
            let noEmptyTokens = line.filter(function(a){
                return a !== "";
            });
            for(var j = 0; j < noEmptyTokens.length; j++){
                console.log(`add token to table ${noEmptyTokens[j]}`);
                output.content += noEmptyTokens[j];
                if( j < noEmptyTokens.length-1 ){
                    output.content += " | ";
                }
            }
            output.content += '\n';
        }
        i++;
    }
}