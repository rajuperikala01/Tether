import { FormEvent, useState } from "react";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  async function signup(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      if (response.status === 200) {
        navigate("/signin");
      }
    } catch (error: any) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  }
  return (
    <div
      className="h-screen w-screen bg-[#121212]  flex justify-center 
    pt-14 text-neutral-300 relative"
    >
      <h1 className="absolute top-10 left-10 font-bold text-2xl tracking-wider flex gap-1">
        TeTher
        <img src="/brand_img.png" alt="" />
      </h1>
      <form
        onSubmit={signup}
        className="px-10 py-8 text-start w-full sm:w-[70%] md:w-1/2 lg:w-[30%] mb-4"
      >
        <h1 className="pb-8 text-xl font-bold tracking-wider">
          Create Account
        </h1>
        <Input
          id="firstName"
          label="First Name*"
          type="text"
          onChange={(e) => setFirstName(e)}
          value={firstName}
        />
        <Input
          type="text"
          id="lastName"
          label="Last Name*"
          onChange={(e) => setLastName(e)}
          value={lastName}
        />
        <Input
          type="email"
          id="email"
          label="Email*"
          onChange={(e) => setEmail(e)}
          value={email}
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e)}
          showPassword={showPassword}
          click={() => setShowPassword(!showPassword)}
        />
        <Button content="Sign Up" type="submit" />
        <p className="text-sm w-full text-center mt-2 text-neutral-400">
          Already have an Account?{"  "}
          <Link to={"/signin"} className="text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
