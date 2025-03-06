import React, { useState } from 'react'
import Logo from './assets/logo.png'

export const App = () => {

  function handleSubmit(e) {
    e.preventDefault()
    setSlide(slide + 1)
    console.log(slide);
    


  }

  const [timeA, setTimeA] = useState('')
  const [timeB, setTimeB] = useState('')
  const [slide, setSlide] = useState(0)

  return (
    <>
      <div className=' bg-gray-100'>
        <header className='container mx-auto rounded-b-lg bg-white px-2'>
          <nav className='flex justify-between items-center mx-4 '>
            <img src={Logo} className='size-16' alt="logo" />
            <ul className=''>
              <li >Contribuir ☕</li>
            </ul>
          </nav>
        </header>
        <main className='container mx-auto h-[calc(100vh-64px)] flex justify-center '>
          {slide === 0 ? (
            <form className='mt-20' onSubmit={handleSubmit}>
              <label htmlFor='teamA' className='block'>Time A</label>
              <input
                id='teamA'
                className='block mt-2'
                type="text"
                placeholder='Digite o nome do time A'
                value={timeA}
                onChange={({target})=>setTimeA(target.value.toUpperCase())}
                required
              />
              <button className='mt-4' >Avançar</button>
            </form>

          ) : null}
          {slide === 1 ?(
            <form className='mt-20' onSubmit={handleSubmit}>
            <label htmlFor='teamB' className='block'>Time B</label>
            <input
              id='teamB'
              className='block mt-2'
              type="text"
              placeholder='Digite o nome do time B'
              value={timeB}
              onChange={({target})=>setTimeB(target.value.toUpperCase())}
              required
            />
            <button className='mt-4' >Avançar</button>
          </form>
          ): null}
        {timeA && timeB && slide === 2 && <p>{timeA} x {timeB}</p>}
        </main>
      </div>
    </>
  )
}
