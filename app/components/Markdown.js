import React, { useState } from 'react';

function Markdown(props){
    function createHtml() {
        const marked = require('marked');
        return {__html: marked(props.object.content) };
      }

    return (
        <div className="text-light mb-0 mt-0" dangerouslySetInnerHTML={createHtml()}>
        </div>
    );
   
}

export default Markdown;