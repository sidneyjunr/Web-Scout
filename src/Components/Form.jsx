import React, { memo, useRef, useEffect } from "react";

export const Form = memo(function Form({
  id,
  label,
  value,
  setTime,
  handleSubmit,
  type,
  ...props
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      className="mt-4 flex flex-col items-center"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        id={id}
        className="block mt-2 ring-1 ring-black rounded-full py-2 px-4"
        type={type}
        value={value}
        // Usando onInput (mais rápido no mobile)
        onInput={(e) => setTime(e.target.value)}
        required
        ref={inputRef}
        // autoCorrect="off"
        // autoCapitalize="off"
        // spellCheck={false}
        // autoComplete="off"
        {...props}
      />
      <button
        className="mt-4 bg-blue-200 px-4 py-2 rounded-full"
        type="submit"
      >
        Avançar
      </button>
    </form>
  );
});
