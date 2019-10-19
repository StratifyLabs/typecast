
import Output from './Output';
import * as Util from '../utils/Util';

function Parser(commandTokens) {
    this.command = commandTokens;
    this.outputArray = [];
    this.state = null;

    this.parse = Util.defaultParser;

    this.isOption = (option) => {
        this.command.find(function (element) {
            return element == option;
        });
    }


    this.findId = (id) => {
        this.outputArray.find(function (output) {
            return output.id == id;
        });
    }
}

export default Parser;

