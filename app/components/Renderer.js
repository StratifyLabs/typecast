import React, { useState } from 'react';
import Pre from './Pre';
import Markdown from './Markdown';
import MarkdownCard from './MarkdownCard';

function Renderer(props) {
    const object = props.object;

    function render(){
        if( object.type == "Pre" ){
            return <Pre object={object} />
        } else if( object.type == "Markdown" ){
            return <Markdown object={object} />
        } else if( object.type == "MarkdownCard" ){
            return <MarkdownCard object={object} />
        } else {
            return <pre className="text-light">{JSON.stringify(object)}</pre>
        }
    }

    return render();
}

export default Renderer;