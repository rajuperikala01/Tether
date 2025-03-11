import InputForm from "./InputForm";

export default function ({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <div className="flex gap-1 md:gap-4 p-2 md:p-3 w-full items-center border-b border-neutral-700">
        <div
          className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-full hover:bg-neutral-800
        "
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 md:h-8 md:w-8"
          >
            <path
              fill="#EAEAEA"
              d="m6.921 12.5l5.439 5.439q.146.146.153.344q.006.198-.16.363q-.164.16-.353.163q-.188.002-.354-.163l-6.08-6.08q-.131-.132-.184-.268T5.329 12t.053-.298t.184-.267l6.08-6.081q.14-.14.341-.15q.202-.01.367.15q.165.165.165.356q0 .192-.165.357L6.92 11.5H18.5q.214 0 .357.143T19 12t-.143.357t-.357.143z"
            />
          </svg>
        </div>
        <p className="text-sm">Raju Perikala</p>
      </div>

      <div></div>
      <InputForm />
    </div>
  );
}
