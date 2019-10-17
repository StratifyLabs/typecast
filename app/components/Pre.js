import React, { useState } from 'react';

function Pre(props){
    function createHtml() {
        return {__html: props.object.content};
      }

    return (
        <pre className="text-light mb-0 mt-0" dangerouslySetInnerHTML={createHtml()}>
        </pre>
    );
   
}

export default Pre;