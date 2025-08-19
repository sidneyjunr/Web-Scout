import { useRef, useEffect } from "react";

export const Form = ({
  id,
  label,
  value,
  setTime,
  handleSubmit,
  type,
  ...props
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
      inputRef.current.focus();
    }
  }, [id]);
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
        ref={inputRef}
        {...props}
      />
      <button className="mt-4 bg-blue-200 px-4 py-2 rounded-full">
        Avançar
      </button>
    </form>
  );
};
