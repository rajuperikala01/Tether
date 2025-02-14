import { useState } from "react";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";

function Signup() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  //   bg-[radial-gradient(circle,_#3d3d3d_1px,_transparent_1px)] bg-[size:30px_30px]
  return (
    <div
      className="h-screen w-screen bg-[#121212]  flex justify-center 
    pt-14 text-gray-300 relative"
    >
      <h1 className="absolute top-10 left-10 font-bold text-2xl tracking-wider flex gap-1">
        TeTher
        <img src="/brand_img.png" alt="" />
      </h1>
      <form className="px-10 py-8 text-start w-[30%] mb-4">
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
        <button type="submit" className="w-full">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
