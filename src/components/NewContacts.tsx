export default function NewContacts({
  setSearch,
  search,
}: {
  search: boolean;
  setSearch: () => void;
}) {
  return (
    <dialog
      className="w-full h-full bg-black/80 backdrop-blur-md fixed top-0 left-0 flex items-center justify-center"
      open={search}
    >
      <div className="bg-[#1E1E1E] w-[90%] md:w-[50%] p-6 rounded-lg shadow-lg">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={setSearch}
            className="p-2 rounded-full hover:bg-neutral-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#EAEAEA"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
              />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <form className="flex items-center gap-2 border border-neutral-700 rounded-lg p-2 bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full bg-transparent outline-none text-white p-2"
          />
          <button
            type="submit"
            className="p-2 rounded-full hover:bg-neutral-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>

        {/* Search Results (To be implemented) */}
        <div className="mt-4 text-neutral-400">
          Search results will appear here...
        </div>
      </div>
    </dialog>
  );
}
