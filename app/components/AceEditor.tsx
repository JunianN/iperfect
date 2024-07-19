import React from "react";
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-monokai"
import "ace-builds/src-noconflict/ext-language_tools"

function CodeEditor({ onChange, value }) {
    return (
        <AceEditor
            mode="python"
            theme="monokai"
            onChange={onChange}
            value={value}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
            }}
        />
    );
}

export default CodeEditor;