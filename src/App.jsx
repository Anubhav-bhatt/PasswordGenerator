import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) string += "0123456789";  // Corrected: Changed 'str' to 'string'
    if (charAllowed) string += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length);  // Removed +1
      pass += string.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-700 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}  // Changed 'Password' to 'password'
            className="outline-none w-full py-1 px-2"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white p-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label> Length: {length} </label>  {/* Changed 'Length' to 'length' */}
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>

      </div>
      <div className='text-white text-center'>
        Hello Users

      </div>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center mt-8">
        <h2 className="text-xl text-gray-400 font-semibold mb-3">How to Use:</h2>
        <p className="text-gray-300">
          A secure password is created automatically each time you adjust the settings.
          Click the <strong>"Copy"</strong> button to copy it to your clipboard.
        </p>
      </div>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center mt-8">
        <h2 className="text-xl text-gray-400 font-semibold mb-3">Customize Your Password:</h2>
        <p className="text-gray-300">



          <ul className='flex flex-col justify-center items-start w-[50%] m-auto'>
            <li>
              <strong className='p-4'>Set Password Length: </strong> Use the slider to choose the length of your password (between 6 and 100 characters).
            </li>

            <li>
              <strong className='p-4'> Include Numbers: </strong>  Check the box to add numbers (0-9) to your password.
            </li>




            <li>


              <strong className='p-4'>Add Special Characters:</strong>  Check the box to include special characters like !@#$%^&*()_+ for extra security.
            </li>

          </ul>


        </p>
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center mt-8">
        <h2 className="text-xl text-gray-400 font-semibold mb-3">Copy to Clipboard:</h2>
        <p className="text-gray-300">
          <strong className='p-4'> Copy Button:  </strong> Click the "Copy" button to copy the generated password to your clipboard. It’s now ready to be pasted wherever you need it. <br />

        </p>

      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center mt-8">
        <h2 className="text-4xl text-gray-200 font-semibold mb-3">Thank you for visiting</h2>
        <p className="text-gray-300"></p>


      </div>    </>
  );
}

export default App; 