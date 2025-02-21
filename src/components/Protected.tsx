import { ReactNode } from "react";
import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";

function Protected({ children }: { children: ReactNode }) {
  const { authenticated } = useAuth();
  if (authenticated === null) {
    return <div>Loading..</div>;
  }

  return authenticated ? children : <Navigate to={"/signin"} />;
}

export default Protected;
