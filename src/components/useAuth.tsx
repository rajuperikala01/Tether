import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface auth {
  userId: number | null;
  email: string | null;
  authenticated: boolean | null;
}
export default function useAuth() {
  const [auth, setAuth] = useState<auth>({
    userId: null,
    email: null,
    authenticated: null,
  });

  async function getAuth() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/auth/getauth",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setAuth({
          userId: response.data.userId,
          authenticated: response.data.Authenticated,
          email: response.data.email,
        });
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setAuth({
          ...auth,
          authenticated: false,
        });
      }
    }
  }
  useEffect(() => {
    getAuth();
  }, []);

  return auth;
}
