import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Contact from "./Contact";
import Chatbox from "./Chatbox";

interface contact {
  id: number;
  firstName: string;
  lastName: string;
}
const initialUsers = [
  { id: 1, firstName: "Raju", lastName: "Perikala" },
  { id: 2, firstName: "Pandu", lastName: "Perikala" },
  { id: 3, firstName: "Sarada", lastName: "Perikala" },
  { id: 4, firstName: "Sukanya", lastName: "Perikala" },
  { id: 5, firstName: "Swapna", lastName: "Perikala" },
];

export default function () {
  const [contacts, setContacts] = useState<contact[] | null>(initialUsers);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [selected, setSelected] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  const user: { userId: number; email: string } = JSON.parse(
    localStorage.getItem("user")!
  );

  async function fetchContacts() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/user/getcontacts`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setContacts(response.data.contacts);
      }
    } catch (error) {
      console.log("error");

      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
        return;
      }
      setError("An Error Occurred. Please try again later");
      return;
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   fetchContacts();
  // }, []);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080?userId=${user.userId}`);
    if (socket.OPEN) {
      setSocket(socket);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#121212] h-screen w-screen text-[#EAEAEA] flex ">
      <div
        className={`${isMobile && !selected && "w-full"} 
        ${isMobile && selected && "hidden"}
        ${!isMobile && "w-[25%] "}
        h-full border-r border-neutral-700 shadow-xs shadow-neutral-700 md:pl-2`}
      >
        <div
          className="p-3 text-lg font-semibold tracking-widest
        flex justify-between items-center border-b border-neutral-700 shadow-xs shadow-nuetral-700"
        >
          TEtheR
          <div className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 2048 2048"
            >
              <path
                fill="#EAEAEA"
                d="M1536 1536h-13q-23-112-81-206t-141-162t-187-106t-218-38q-88 0-170 23t-153 64t-129 100t-100 130t-65 153t-23 170H128q0-120 35-231t101-205t156-167t204-115q-113-74-176-186t-64-248q0-106 40-199t109-163T696 40T896 0t199 40t163 109t110 163t40 200q0 66-16 129t-48 119t-75 103t-101 83q112 43 206 118t162 176zM512 512q0 80 30 149t82 122t122 83t150 30q79 0 149-30t122-82t83-122t30-150q0-79-30-149t-82-122t-123-83t-149-30q-80 0-149 30t-122 82t-83 123t-30 149m1280 1152h256v128h-256v256h-128v-256h-256v-128h256v-256h128z"
              />
            </svg>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          {contacts
            ? contacts.map((contact) => {
                return (
                  <Contact
                    firstName={contact.firstName}
                    lastName={contact.lastName}
                    id={contact.id}
                    onClick={() => setSelected(true)}
                  />
                );
              })
            : "Add Contacts to Chat"}
        </div>
      </div>
      <div
        className={`${isMobile && selected && "w-full"}
      ${isMobile && !selected && "hidden"} w-[75%] `}
      >
        <Chatbox onClick={() => setSelected(false)} />
      </div>
    </div>
  );
}
