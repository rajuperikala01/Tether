import { useEffect, useRef, useState } from "react";

interface message {
  sendTo: number;
  sender: number;
  message: string;
}
interface contact {
  id: number;
  firstName: string;
  lastName: string;
}

interface props {
  onClick: () => void;
  socket: WebSocket | null;
  messages: message[];
  contact: contact | null;
  userId: number;
  setMessages: (data: message) => void;
}

export default function Chatbox({
  onClick,
  socket,
  messages,
  contact,
  userId,
  setMessages,
}: props) {
  const [latest, setLatest] = useState<string>("");
  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="flex gap-1 md:gap-4 p-2 md:p-5 w-full items-center border-b border-neutral-700">
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

      <div className="flex-1 py-2 px-4 overflow-y-scroll flex flex-col scroll-bar">
        {messages.map((data) => {
          const isSent = data.sender === userId;
          return (
            <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
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
        <div ref={messageRef}></div>
      </div>
      <div className="w-full">
        <form
          className="px-2 flex 
    w-full h-12  py-3 border-t border-neutral-700
    justify-between
      items-center gap-2 pl-2 md:pl-20 bg-[#121212]"
          onSubmit={(e) => {
            e.preventDefault();
            const message = {
              sendTo: contact ? contact.id : 0,
              message: latest,
              sender: userId,
            };
            socket?.send(JSON.stringify(message));
            setMessages(message);

            setLatest("");
          }}
        >
          <input
            type="text"
            onChange={(e) => setLatest(e.target.value)}
            value={latest}
            className="w-[90%] h-full
              text-sm placeholder:tracking-wide
              pl-2 rounded-sm outline-0 text-[#EAEAEA] tracking-wider"
            placeholder="Type a message"
          />
          <button
            type="submit"
            className="md:w-[10%] flex items-center justify-start md:justify-center h-full border-none outline-none"
            disabled={!latest.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 md:h-10 md:w-10"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#03DAC6"
                d="m6.998 10.247l.435.76c.277.485.415.727.415.993s-.138.508-.415.992l-.435.761c-1.238 2.167-1.857 3.25-1.375 3.788c.483.537 1.627.037 3.913-.963l6.276-2.746c1.795-.785 2.693-1.178 2.693-1.832s-.898-1.047-2.693-1.832L9.536 7.422c-2.286-1-3.43-1.5-3.913-.963s.137 1.62 1.375 3.788Z"
                stroke-width="1"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
