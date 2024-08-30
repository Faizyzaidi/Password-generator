import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(8);
  const [charAllowed,setCharAllowed] = useState(false);
  const [numAllowed ,setNumAllowed] = useState(false);
  const [password ,setPassword] = useState("")
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() =>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) {
      str += "0123456789"
    }
    if(charAllowed){
      str += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    }
    for (let index = 1; index <=length; index++) {
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numAllowed,charAllowed,setPassword])
  const CopytoClip = useCallback(()=>{
    passwordRef.current?.select()
   passwordRef.current?.setSelectionRange(0,99)
   window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator();
  },[length,numAllowed,charAllowed,passwordGenerator])
    return (
    <><div className='flex justify-center  '>
     <div className='w-1/3 h-32  bg-black  flex-col justify-center rounded-md p-3 '>
      <div>
       <input ref={passwordRef} type="text" value={password} placeholder='password' className='mt-4 mr-1 p-2 rounded-sm  w-72' />
        <button onClick={CopytoClip} className='bg-blue-600 text-white pt-2 pb-2 pl-3 pr-3 rounded-xl font-bold mt-4'>Copy</button>
      </div>
      <div className='flex justify-center gap-2'>
          <div>
          <input type="range" min={6} max={100} value={length} onChange={(e) =>{setLength(e.target.value)} } className='cursor-pointer'
          />
          <label className='text-white font-semibold ' >Length:{length}</label>
          </div>
          <input type="checkbox" name="" id="" onChange={() => {setNumAllowed((prev) =>!prev)}}/>
           <label className='text-white '>Number</label>
           <input onChange={()=>{setCharAllowed((prev) => !prev)}} type="checkbox" name="" id="" />
           <label className='text-white'>Character</label>
      </div>
          
     </div>
     </div>
    </>
  )
}

export default App
