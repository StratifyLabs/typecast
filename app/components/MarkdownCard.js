import React, { useState } from 'react';

function MarkdownCard(props) {
    function createHtml() {
        const marked = require('marked');
        return { __html: marked(props.object.content.body) };
    }

    return (
        <div className="card bg-dark border-light mb-3">
            <h5 className="card-title ml-3 mt-3">{props.object.content.title}</h5>
            <div className="card-body" dangerouslySetInnerHTML={createHtml()}></div>
        </div>
    );
}

export default MarkdownCard;