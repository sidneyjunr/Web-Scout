
import { useState, useEffect } from "react";

export const TelaTimeB = ({ value, setTime, handleSubmit, timeA }) => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      value.trim().toLowerCase() === timeA?.trim().toLowerCase() &&
      value.trim() !== ""
    ) {
      setError("Os nomes dos times não podem ser iguais.");
    } else {
      setError("");
    }
  }, [value, timeA]);

  return (
    <form className="mt-4 flex flex-col items-center" onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="timeB" className="block">Time B</label>
      <input
        id="timeB"
        className="block mt-2 ring-1 ring-black rounded-full py-2 px-4"
        type="text"
        value={value}
        onChange={e => setTime(e.target.value)}
        required
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        autoComplete="off"
        autoFocus
      />
      {error && (
        <span className="text-red-500 text-sm mt-2">{error}</span>
      )}
      <button
        className="mt-4 bg-blue-200 px-4 py-2 rounded-full disabled:opacity-50"
        type="submit"
        disabled={!!error}
      >
        Avançar
      </button>
    </form>
  );
};
