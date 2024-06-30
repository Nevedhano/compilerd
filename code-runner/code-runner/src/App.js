import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import Output from "./Output";
import axios from "axios";
import "./App.css";
import { javascript } from "@codemirror/lang-javascript";

function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      let lang = language === "javascript" ? "nodejs" : language;
      const response = await axios.post("http://localhost:3000/api/execute/", {
        language: lang,
        script: code,
      });
      setOutput(response.data.output);
    } catch (error) {
      console.error(error);
      setOutput("Error executing code");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Code Runner</h1>
      </header>
      <div className="controls">
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python3">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
        <button id="colorButton" onClick={runCode}>
          Run
        </button>
      </div>
      <CodeEditor language={language} code={code} setCode={setCode} />
      <Output output={output} />
    </div>
  );
}

export default App;

    </div>
  );
}

export default App;
