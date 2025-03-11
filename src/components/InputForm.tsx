export default function InputForm() {
  return (
    <form
      className="px-2 flex 
    w-full md:w-[76%] h-14 py-3 border-t border-neutral-700
     shadow-neutral-400 shadow-2xs justify-between
      items-center gap-2 fixed bottom-0 pl-2 md:pl-20"
    >
      <input
        type="text"
        //   onChange={(e) => setLatest(e.target.value)}
        //   value={latest}
        className="w-[90%] h-full border-neutral-600 
        text-[13px] placeholder:tracking-wider
        border pl-2 rounded-sm outline-0"
        placeholder="Type message"
      />
      <button
        type="submit"
        className="md:w-[10%] flex items-center justify-start md:justify-center h-full border-none outline-none"
        //   disabled={!latest.trim()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#03DAC6"
            d="m6.998 10.247l.435.76c.277.485.415.727.415.993s-.138.508-.415.992l-.435.761c-1.238 2.167-1.857 3.25-1.375 3.788c.483.537 1.627.037 3.913-.963l6.276-2.746c1.795-.785 2.693-1.178 2.693-1.832s-.898-1.047-2.693-1.832L9.536 7.422c-2.286-1-3.43-1.5-3.913-.963s.137 1.62 1.375 3.788Z"
            stroke-width="1.5"
          />
        </svg>
      </button>
    </form>
  );
}
