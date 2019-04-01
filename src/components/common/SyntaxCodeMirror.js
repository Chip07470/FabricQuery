import React from 'react';
import PropTypes from 'prop-types';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import {UnControlled as CodeMirror} from 'react-codemirror2';


let SyntaxCodeMirror = ({value, mode, theme, onChange, readOnly, lineNumbers}) => {
    if (readOnly) {
        return (
            <CodeMirror 
                value={value}
                options={{
                    mode: mode,
                    theme: theme,
                    lineNumbers: lineNumbers,
                    readOnly: {readOnly}
                }}
                onChange={onChange}
            />
        );
    }
    return (
        <CodeMirror 
            value={value}
            options={{
                mode: mode,
                theme: theme,
                lineNumbers: lineNumbers,
            }}
            onChange={onChange}
        />
    );    
}

SyntaxCodeMirror.propTypes = {
    value: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default SyntaxCodeMirror;