import React from "react";
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-github_dark"
import "ace-builds/src-noconflict/ext-language_tools"
import "ace-builds/src-noconflict/snippets/python"

interface CodeEditorProps {
    onChange: (newCode: string) => void;
    value: string;
}

function CodeEditor({ onChange, value }: CodeEditorProps) {
    return (
        <AceEditor
            mode="python"
            theme="github_dark"
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
            style={{ width: '100%', height: '100%' }}
        />
    );
}

export default CodeEditor;