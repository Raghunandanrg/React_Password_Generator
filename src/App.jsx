import { useCallback, useState, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false)
  const [isChar, setIsChar] = useState(false)
  const [password, setPassword] = useState("")

  const passwordref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumber) str += "1234567890"
    if (isChar) str += ';/<>,+=()&%$#@!``'
    for (let index = 0; index < length; index++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, isNumber, isChar, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, isChar, isNumber, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-md px-4 my-8  bg-slate-500 text-center'>
        Password Generator
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} readOnly className='outline-none w-full py-1 px-3 font-bold text-black' ref={passwordref} />
          <button className='p-1 bg-blue-500' onClick={useCallback(() => {
            passwordref.current?.select()
            passwordref.current?.setSelectionRange(0, passwordref.length())
            window.navigator.clipboard.writeText(password)
          }, [password])}>COPY</button>
        </div>
        <div className='flex flex-row gap-2 m-auto text-orange-500 '>
          <input type="range" max='16' className='rounded-md' onChange={(e) => { setLength(e.target.value) }} value={length} />
          <span>{length}</span>
          <input type="checkbox" id='setnumber' defaultValue={isNumber} onChange={() => { setIsNumber((prev) => !prev) }} />
          <label htmlFor="setnumber">Number</label>
          <input type="checkbox" id='char' defaultValue={isNumber} onChange={() => { setIsChar((prev) => !prev) }} />
          <label htmlFor="char">Characters</label>
        </div>
      </div>
    </>
  )
}

export default App
