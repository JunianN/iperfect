'use client'

import React, { useState } from "react";
import Image from "next/image";
import CodeEditor from "./components/AceEditor";

export default function Home() {
  const [code, setCode] = useState('# Write your code here...');
  console.log("🚀 ~ Home ~ code:", code)

  const HandleCodeChange = (newCode) => {
    setCode(newCode)
  };

  return (
    <div>
      <h1>Python Code Editor</h1>
      <CodeEditor onChange={HandleCodeChange} value={code}/>
    </div>
  );
}
