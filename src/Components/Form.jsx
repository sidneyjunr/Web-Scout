import React, { useEffect, useRef } from "react";

export const Form = ({ id, label, value, setTime, handleSubmit,type, ...props }) => {
  
  const inputRef = useRef(null);

  useEffect(() => {
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []); 

  return (
    <form className="mt-4 flex flex-col items-center" onSubmit={handleSubmit}>
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        id={id}
        className="block mt-2 ring-1 ring-black rounded-full py-2 px-4"
        type={type}
        value={value}
        onChange={({ target }) => setTime(target.value.toUpperCase())}
        required
        ref={inputRef} // Adiciona a referência para o input
        {...props}
      />
      <button className="mt-4 bg-blue-200 px-4 py-2 rounded-full">Avançar</button>
    </form>
  );
};
