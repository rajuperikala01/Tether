import { text } from "express";
import InputForm from "./InputForm";

interface message {
  sendTo: number;
  receivedFrom: number;
  message: string;
}
interface contact {
  id: number;
  firstName: string;
  lastName: string;
}
export default function ({
  onClick,
  socket,
  messages,
  contact,
  userId,
}: {
  onClick: () => void;
  socket: WebSocket | null;
  messages: message[];
  contact: contact | null;
  userId: number;
}) {
  return (
    <div className="relative h-screen w-full flex flex-col">
      <div className="flex gap-1 md:gap-4 p-2 bg-[#121212] fixed top-0 z-10 md:p-5 w-full items-center border-b border-neutral-700">
        <div
          className="h-8 w-8 md:h-10 md:w-10 md:hidden flex items-center justify-center rounded-full hover:bg-neutral-800
        "
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-6 w-6 md:h-8 md:w-8 "
          >
            <path
              fill="#EAEAEA"
              d="m6.921 12.5l5.439 5.439q.146.146.153.344q.006.198-.16.363q-.164.16-.353.163q-.188.002-.354-.163l-6.08-6.08q-.131-.132-.184-.268T5.329 12t.053-.298t.184-.267l6.08-6.081q.14-.14.341-.15q.202-.01.367.15q.165.165.165.356q0 .192-.165.357L6.92 11.5H18.5q.214 0 .357.143T19 12t-.143.357t-.357.143z"
            />
          </svg>
        </div>
        {contact && (
          <p className="text-sm tracking-wide">
            {contact.firstName + " " + contact.lastName}
          </p>
        )}
      </div>

      <div className="w-full flex flex-col pt-16 pb-14 px-4 justify-end overflow-scroll flex-1">
        {messages.map((data) => {
          const isSent = data.receivedFrom === userId;
          return (
            <div
              className={`flex ${isSent ? "justify-end  " : "justify-start"}`}
            >
              <p
                className={`text-[13px] font-light p-[6px] text-neutral-300 ${
                  isSent
                    ? "bg-[#182747]  my-1 pr-2 pl-3 rounded-l-md rounded-r-sm"
                    : "bg-neutral-800 pr-3 pl-2 my-1 rounded-r-md rounded-l-sm"
                }  `}
              >
                {data.message}
              </p>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 w-full">
        <InputForm />
      </div>
    </div>
  );
}
