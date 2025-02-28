export default function InputForm() {
  return (
    <form
      className="px-2 flex 
    w-full md:w-[76%] h-14 py-3 border-t border-gray-600
     shadow-gray-400 shadow-2xs justify-center
      items-center gap-2 fixed bottom-0"
    >
      <input
        type="text"
        //   onChange={(e) => setLatest(e.target.value)}
        //   value={latest}
        className="w-[92%] h-full border-gray-600 border pl-2 rounded-sm outline-0"
        placeholder="Type message"
      />
      <button
        type="submit"
        className="w-[4%] flex justify-start items-center h-full border-none outline-none"
        //   disabled={!latest.trim()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 15 16"
          className="h-8 w-10"
        >
          <path
            fill="#48b7c2"
            d="M12.49 7.14L3.44 2.27c-.76-.41-1.64.3-1.4 1.13l1.24 4.34q.075.27 0 .54l-1.24 4.34c-.24.83.64 1.54 1.4 1.13l9.05-4.87a.98.98 0 0 0 0-1.72Z"
          />
        </svg>
      </button>
    </form>
  );
}
