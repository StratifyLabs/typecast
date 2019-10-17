
exports.launch = function(command){
    var parsed = command.split(" ");
    var processName = parsed[0];
    var args = [];
    for(var i=1; i < parsed.length; i++){
        args.push(parsed[i]);
    }

    const spawn = require('child_process').spawn;
    return spawn(processName, args);
}
 