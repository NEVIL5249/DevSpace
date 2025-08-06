import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import boilerplateMap from "./boilerplate";

// Ace editor language modes
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-swift";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-kotlin";

// Import the dracula theme
import "ace-builds/src-noconflict/theme-dracula";

const languageOptions = {
  c: "c_cpp",
  cpp: "c_cpp",
  java: "java",
  python: "python",
  javascript: "javascript",
  ruby: "ruby",
  go: "golang",
  php: "php",
  rust: "rust",
  swift: "swift",
  typescript: "typescript",
  csharp: "csharp",
  kotlin: "kotlin",
};

const CodeEditor = ({ onSave, initialCode = '', initialLanguage = 'javascript' }) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [code, setCode] = useState(initialCode);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Update code to boilerplate on language change, only if code is empty or matches previous boilerplate
  useEffect(() => {
    setCode(boilerplateMap[language] || "");
  }, [language]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("⏳ Running...");
    try {
      const res = await axios.post("http://localhost:5000/api/compile", {
        language,
        code,
        input,
      });

      const { stdout, stderr, compile_output } = res.data || {};
      const result = stdout || stderr || compile_output || "⚠️ No output";
      setOutput(result);
    } catch (err) {
      console.error("Compilation error:", err);
      setOutput("❌ Error connecting to backend.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveCode = async () => {
    setIsSaving(true);
    try {
      await onSave(language, code);
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1a1b26",
        color: "#fff",
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(180deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(14, 165, 233, 0.1) 100%)",
          opacity: 0.5,
          pointerEvents: "none",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      />

      {/* Main Container with padding */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "8px 12px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Editor Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 10px",
            backgroundColor: "rgba(30, 30, 46, 0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            height: "44px",
          }}
        >
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: "8px 12px",
              backgroundColor: "rgba(20, 20, 35, 0.4)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              minWidth: "140px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
              outline: "none",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2.5 4.5L6 8L9.5 4.5' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "32px",
            }}
          >
            <option value="" disabled style={{ display: 'none' }}>Select Language</option>
            {Object.keys(languageOptions).map((lang) => (
              <option 
                key={lang} 
                value={lang}
                style={{
                  backgroundColor: "#1a1b26",
                  color: "#fff",
                  padding: "8px",
                  fontSize: "14px",
                }}
              >
                {lang.toUpperCase()}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleRun}
              disabled={isRunning}
              style={{
                padding: "8px 16px",
                background: isRunning 
                  ? "rgba(255, 255, 255, 0.1)" 
                  : "linear-gradient(135deg, #2563EB 0%, #0EA5E9 100%)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: "600",
                cursor: isRunning ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 4px rgba(37, 99, 235, 0.1)",
              }}
              title={isRunning ? "Running..." : "Run Code"}
            >
              <span style={{ fontSize: "16px" }}>▶</span>
              {isRunning ? "Running..." : "Run Code"}
            </button>

            <button
              onClick={handleSaveCode}
              disabled={isSaving}
              style={{
                padding: "8px 16px",
                background: isSaving
                  ? "rgba(255, 255, 255, 0.1)"
                  : "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: "600",
                cursor: isSaving ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 4px rgba(139, 92, 246, 0.1)",
              }}
              title={isSaving ? "Saving..." : "Save Code"}
            >
              <span style={{ fontSize: "14px" }}>💾</span>
              {isSaving ? "Saving..." : "Save Code"}
            </button>
          </div>
        </div>

        {/* Editor and IO Container */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            minHeight: 0,
          }}
        >
          {/* Code Editor Section - 70% */}
          <div
            style={{
              flex: "7",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "rgba(30, 30, 46, 0.6)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <AceEditor
              mode={languageOptions[language]}
              theme="dracula"
              value={code}
              onChange={setCode}
              name="code-editor"
              width="100%"
              height="100%"
              fontSize={14}
              setOptions={{
                useWorker: false,
                tabSize: 2,
                showPrintMargin: false,
                showLineNumbers: true,
                highlightActiveLine: true,
              }}
              editorProps={{ $blockScrolling: true }}
            />
          </div>

          {/* Input/Output Section - 30% */}
          <div
            style={{
              flex: "3",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
              minHeight: 0,
            }}
          >
            {/* Input Panel */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                backgroundColor: "rgba(30, 30, 46, 0.6)",
                padding: "8px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                minWidth: 0,
              }}
            >
              <label
                htmlFor="input-area"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#94a3b8",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontSize: "14px" }}>🔡</span> Input
              </label>
              <textarea
                id="input-area"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  width: "100%",
                  maxWidth: "100%",
                  padding: "8px",
                  backgroundColor: "rgba(20, 20, 35, 0.4)",
                  color: "#e2e8f0",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "4px",
                  resize: "none",
                  fontFamily: "monospace",
                  fontSize: "13px",
                  lineHeight: "1.4",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                placeholder="Enter input for your program here..."
              />
            </div>

            {/* Output Panel */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                backgroundColor: "rgba(30, 30, 46, 0.6)",
                padding: "8px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                minWidth: 0,
              }}
            >
              <label
                htmlFor="output-area"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#94a3b8",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontSize: "14px" }}>📤</span> Output
              </label>
              <pre
                id="output-area"
                style={{
                  flex: 1,
                  width: "100%",
                  maxWidth: "100%",
                  margin: 0,
                  padding: "8px",
                  backgroundColor: "rgba(20, 20, 35, 0.4)",
                  color: "#10b981",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "4px",
                  overflow: "auto",
                  fontFamily: "monospace",
                  fontSize: "13px",
                  lineHeight: "1.4",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  boxSizing: "border-box",
                }}
              >
                {output || "Program output will appear here..."}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
