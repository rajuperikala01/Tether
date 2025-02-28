import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Contact from "./Contact";

interface contact {
  id: number;
  firstName: string;
  lastName: string;
}
const initialUsers = [
  { id: 1, firstName: "Raju", lastName: "Perikala" },
  { id: 2, firstName: "Pandu", lastName: "Perikala" },
  { id: 3, firstName: "Amma", lastName: "" },
];
export default function () {
  const [contacts, setContacts] = useState<contact[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="bg-neutral-900 h-screen pt-1 md:pt-4 w-screen text-white md:flex">
      <div className="md:basis-[33%] lg:basis-[25%] border-r border-gray-600">
        <div
          className="h-14 w-full pl-4 
        flex justify-start items-center
        text-2xl font-bold tracking-wider gap-1 border-b border-neutral-700 shadow-sm shadow-neutral-700
        "
        >
          TeTher
          <img src="/brand_img.png" alt="" />
        </div>

        {error && <div>{error}</div>}
        {loading && (
          <div className="flex justify-center items-center w-full text-neutral-400 min-h-[500px]">
            Loading...
          </div>
        )}
        <div className="flex flex-col mt-2 items-center w-full justify-center">
          {contacts &&
            contacts.map((contact) => (
              <Contact
                id={contact.id}
                firstName={contact.firstName}
                lastName={contact.lastName}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
