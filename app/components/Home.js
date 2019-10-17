// @flow
import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Renderer from './Renderer';

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

  function executeCommand() {
    if (instance == null) {
      const launch = require('../utils/launch').launch;
      const loadParser = require('../utils/parser.js').loadParser;
      parser = loadParser(input);
      setParser(parser);

      let newInstance = launch(input);

      newInstance.stdout.on('data', (data) => {

        if (parser !== null) {
          //parse will modifiy parser
          parser.parse(parser, data.toString());
          setParser(parser); //update the context

          if (parser.output !== null) {
            //some data is ready

            let exists = components.find(function(element){
              return element.id == parser.output.id;
            });
            console.log(`exists is ${exists}`);
            if( exists === undefined ){
              components.push(parser.output);
            } else {
              //exists = parser.output;
            }
            setComponents(components);
            setIsTimeToScroll(true);
          }
        } else {
          console.log("parser is null");
        }
      });

      newInstance.stderr.on('data', (data) => {
        console.log(data.toString());
      });

      newInstance.on('exit', (code) => {
        console.log(`exit code is ${code}`);
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
        components.map((object, idx) => {
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
