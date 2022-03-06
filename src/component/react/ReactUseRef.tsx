import { useRef, createRef } from 'react'

const FocusInput = () => {
  const inputElement = createRef()

  const handleFocusInput = () => {
    inputElement.current.focus()
  }

  return (
    <>
      <input type="text" ref={inputElement} />
      <button onClick={handleFocusInput}>Focus Input</button>
    </>
  )
}
