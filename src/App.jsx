/** @format */
import { useEffect } from "react";
import { useState, useCallback, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false); // for showing the copied message

  // for copying password to clipboard we use useRef hook
  const copyPassRef = useRef(null);

  // function to generate password using useCallback hook
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (numberAllowed) {
      str = str + numbers;
    } else if (charAllowed) {
      str = str + specialChars;
    }

    for (var i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // function to copy password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    copyPassRef.current?.select(); // select the password
    copyPassRef.current?.setSelectionRange(0, 20); // set the range of selection
    window.navigator.clipboard.writeText(password); // copy the password to clipboard
    setCopied(true); // set the copied state to true
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto   text-center text-orange-500">
        <h1 className="my-8 text-3xl text-yellow-200">Password Generator</h1>
        <div className="h-full border-2 border-pink-300 p-5">
          <div className="flex m-5 justify-between border-2 border-grey-500 rounded">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 bg-slate-800"
              placeholder="Password"
              ref={copyPassRef}
              readOnly
            ></input>
            <button
              onClick={copyPasswordToClipboard}
              className={`outline-none text-white px-3 py-0.5 shrink-0 ${
                copied ? "bg-green-500" : "bg-blue-700"
              }`}
            >
              {copied ? "✓" : "Copy"}
            </button>
          </div>
          <div className="flex gap-x-4">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length: {length}</label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => {
                  setnumberAllowed((prev) => !prev);
                }}
              ></input>
              <label> Number</label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => {
                  setcharAllowed((prev) => !prev);
                }}
              ></input>
              <label> Character</label>
            </div>
          </div>
        </div>
        <div className="text-xl mt-5 text-pink-500">
          Made by{" "}
          <span className="text-2xl text-red-400 mx-5">@DevPiyush-Git</span>
        </div>
      </div>
    </>
  );
}

export default App;
