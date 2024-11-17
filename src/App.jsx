import { useCallback, useEffect, useRef, useState } from "react";
function App() {
  const [lenght, setLenght] = useState(8);
  const [nummberAllowed, setNummberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKL?NOPQRSTUVWXYZabcdefghijkl?nopqrstuvwxyz";
    if (nummberAllowed) string += "0123456789";
    if (charAllowed) string += "!@#$%^&*";

    for (let i = 1; i <= lenght; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);
    }
    setPassword(pass);
  }, [lenght, nummberAllowed, charAllowed]);

  //useRef hook
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 3); if you want to set the selection range
    window.navigator.clipboard.writeText(password).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [lenght, charAllowed, nummberAllowed, passwordGenerator]);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-500 py-4 px-2 rounded-xl min-w-[480px]">
        <h1 className="text-center text-xl mb-4">Password generator</h1>
        <div className="flex ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-2 rounded-md "
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className={`${
              isCopied ? `bg-green-500` : `bg-blue-600`
            } px-3 py-2 text-white`}
          >
            {isCopied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={6}
              max={50}
              value={lenght}
              className="cursor-pointer"
              onChange={(e) => {
                setLenght(e.target.value);
              }}
            />
            <label>lenght {lenght}</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultValue={nummberAllowed}
              id="numberinput"
              onChange={() => setNummberAllowed((prev) => !prev)} // this setNummberAllowed function parametter get the value of the current value and change the new value
            />
            <label>number Allowed</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultValue={charAllowed}
              id="charAllowed"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label>setChar Allowed</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
