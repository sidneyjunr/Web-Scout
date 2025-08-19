export const TelaTimeA = ({ value, setTime, handleSubmit }) => (
  <form className="mt-4 flex flex-col items-center" onSubmit={handleSubmit} autoComplete="off">
    <label htmlFor="timeA" className="block">Time A</label>
    <input
      id="timeA"
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
    <button className="mt-4 bg-blue-200 px-4 py-2 rounded-full" type="submit">Avançar</button>
  </form>
);
