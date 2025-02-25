import { useEffect, useRef, useState } from "react";

interface message {
  userId: number;
  message: string;
}

export default function () {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [messages, setMessages] = useState<message[]>([]);
  const [latest, setLatest] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [friends, setFriends] = useState({});
  const user: { userId: number; email: string } = JSON.parse(
    localStorage.getItem("user")!
  );

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080?userId=${user.userId}`);

    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    };

    socket.onerror = () => {
      console.log("Cannot Connect to the server");
    };

    socket.onmessage = (content) => {
      const data: message = JSON.parse(content.data);
      console.log(data);

      setMessages((prev) => [...prev, data]);
    };

    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  if (!socket) {
    return (
      <div className="bg-[#1c1c1c] h-screen w-screen flex justify-center items-center text-white">
        Connecting...
      </div>
    );
  }

  return (
    <div
      className="bg-neutral-900 h-screen w-screen text-white px-1 md:flex"
      style={{
        backgroundImage:
          "radial-gradient(circle at 0.5px 0.5px, rgba(6,182,212,0.2) 0.5px, transparent 0)",
      }}
    >
      <div className="basis-[25%] hidden md:block border-r border-gray-600">
        hi
      </div>
      <div className="w-full relative h-full basis-[75%]">
        <div className="max-h-screen max-w-full h-[88%] md:px-2 overflow-y-auto flex flex-col justify-end">
          {messages.map((data, index) => (
            <div
              key={index}
              className={`px-2 py-1 text-md mt-1 max-w-[70%]  break-words ${
                data.userId === user.userId
                  ? "ml-auto pl-3 rounded-l-lg rounded-r-sm bg-blue-500"
                  : "mr-auto pr-2 rounded-r-lg rounded-l-sm bg-gray-800"
              }`}
            >
              {data.message}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>
        {/* {!socket && "connecting..."} */}
        {socket && (
          <form
            className="px-2 flex 
            w-full md:w-[76%] h-14 py-3 border-t border-gray-600
             shadow-gray-400 shadow-2xs justify-center
              items-center gap-2 fixed bottom-0"
            onSubmit={(e) => {
              e.preventDefault();
              socket.send(
                JSON.stringify({ senderId: user.userId, message: latest })
              );
              setMessages((prev) => [
                ...prev,
                { userId: user.userId, message: latest },
              ]);
              setLatest("");
            }}
          >
            <input
              type="text"
              onChange={(e) => setLatest(e.target.value)}
              value={latest}
              className="w-[92%] h-full border-gray-600 border pl-2 rounded-sm outline-0"
              placeholder="Type message"
            />
            <button
              type="submit"
              className="w-[4%] flex justify-start items-center h-full border-none outline-none"
              disabled={!latest.trim()}
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
        )}
      </div>
    </div>
  );
}
