
import Output from '../utils/Output';
import Parser from '../utils/Parser';

function handleAbout(parser, object) {
    let output = parser.outputArray.find((element) => {
        return element.source == object;
    });
    if (output === undefined) {
        output = new Output("MarkdownCard", "");
        output.content = {
            title: "About sl",
            body: ""
        }
        let keys = Object.keys(object);
        keys.map(function (value, idx) {
            output.content.body += ` - ${keys[idx]}: ${value} \n`;
        });
        output.source = object; //refer back to the original object
        parser.outputArray.push(output);
    }
    return output;
}

function parseObject(parser, object) {
    const keys = Object.keys(object);
    let id = null;
    for (var i = 0; i < keys.length; i++) {
        console.log(`handle key ${keys[i]}`);
        let output = undefined;
        switch (keys[i]) {
            case "about":
                output = handleAbout(parser, object[keys[i]]);
                break;
            case "connection.ping":
                output = handleAbout(parser, object[keys[i]]);
                break;
        }

        object[keys[i]].parserOutputDestination = output;

    }
}

export default function sl(parser, input, isFinal = false) {
    let isReadme = parser.command.find(function (element) {
        return element == '--readme'
    });

    if (isReadme == '--readme') {

        let output = null;
        if (parser.outputArray.length == 0) {
            output = new Output("Markdown", "");
            parser.outputArray.push(output);
        } else {
            output = parser.outputArray[0];
        }
        output.content += input;

    } else {
        const yaml = require('js-yaml');

        if (parser.state == null) {
            parser.state = {
                yaml: "",
                doc: null
            }
        }

        parser.state.yaml += input;
        try {
            const doc = yaml.safeLoad(parser.state.yaml);
            if (Array.isArray(doc) === true) {
                doc.map((element) => {
                    parseObject(parser, element);
                });
            }
            console.log(doc);
        } catch (e) {
            console.log(e);
        }
    }

}