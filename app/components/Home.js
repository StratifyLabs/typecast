// @flow
import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Renderer from './Renderer';
import * as Util from '../utils/Util';

function Home() {

  const [input, setInput] = useState("");
  const [instance, setInstance] = useState(null);
  let [parser, setParser] = useState(null);
  let [components, setComponents] = useState([
    {
      type: "Pre",
      content: "Welcome to typecast!"
    }
  ]);

  const [isTimeToScroll, setIsTimeToScroll] = useState(false);

  useEffect(() => {
    if (isTimeToScroll) {
      let theBottom = document.getElementById('theBottom');
      theBottom.scrollIntoView();
      setIsTimeToScroll(false);
    }
  }, [isTimeToScroll]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleKeyPress(e) {
    if (e.key == 'Enter') {
      setInput("");
      components.push(
        {
          type: "Pre",
          content: `# ${input}`
        }
      );
      console.log(`input is -${input}-`);
      setComponents(components);
      setIsTimeToScroll(true);
      executeCommand();
    }
  }

  function processOutput(parser) {
    //some data is ready
    console.log(parser.outputArray);
    parser.outputArray.map((parserOutputElement) => {
      let targetComponent = components.find(function (element) {
        return element.id == parserOutputElement.id;
      });

      if (targetComponent === undefined){
        console.log("push output");
        components.push(parserOutputElement);
      }

    });

    setComponents(components);
    setIsTimeToScroll(true);

  }

  function executeCommand() {
    if (instance == null) {
      parser = Util.loadParser(input);
      setParser(parser);

      console.log(parser);

      let newInstance = Util.launch(input);
      newInstance.stdout.on('data', (data) => {

        if (parser !== null) {
          //parse will modifiy parser
          parser.parse(parser, data.toString());
          processOutput(parser);
          setParser(parser); //update the context

        } else {
          console.log("parser is null");
        }
      });

      newInstance.stderr.on('data', (data) => {
        console.log(data.toString());
      });

      newInstance.on('exit', (code) => {
        console.log(`exit code is ${code}`);
        if (parser !== null) {
          console.log(`about to finalize parser ${parser}`)
          parser.parse(parser, "", true);
          processOutput(parser);
          setParser(null);
          console.log("finalize parser");
        }
        setInstance(null);
      });

      setInstance(newInstance);
    } else {
      instance.stdin.write(input + '\n');
    }
  }

  function handleInputChange(e) {
    setInput(e.target.value);
  }


  return (
    <div className="container-fluid w-100 h-100 bg-dark text-light fill">
      {
        components.map((object) => {
          return <Renderer
            key={object.id}
            object={object}
          />
        })
      }
      <div className="pt-1" id="theBottom"></div>
      <div className="pt-5" id="theBottom"></div>
      <Navbar bg="dark" expand="lg" fixed="bottom">
        <Form className="w-100" onSubmit={handleSubmit}>
          <Form.Control
            className="bg-dark text-light"
            type="input"
            id="terminalInput"
            placeholder="Enter a command to make magic happen"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </Form>
      </Navbar>
    </div>
  );
}

export default Home;
