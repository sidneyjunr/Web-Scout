import { useRef } from "react";

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
        onChange={(e) => setTime(e.target.value)}
        required
        ref={inputRef}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        autoComplete="off"
        inputMode={type === "text" ? "text" : undefined}
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
};
