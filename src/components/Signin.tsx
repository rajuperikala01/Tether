import { FormEvent, useState } from "react";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { signInSchema } from "../validation/authSchemas";

function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function signin(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const validation = signInSchema.safeParse({
      email: email,
      password: password,
    });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }
    try {
      const sign = await axios.post(
        "http://localhost:5000/api/v1/auth/signin",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (sign.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({ userId: sign.data.userId, email: sign.data.email })
        );
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);

        if (!error.response) {
          setError("Server is unreachable right now. Please try again later");
          return;
        }

        setError(error.response.data.error);
        return;
      }
      setError("Unexpected error occurred! Please try Later");
    }
  }

  return (
    <div
      className="h-screen w-screen bg-[#121212]  flex justify-center 
    pt-20 text-neutral-300 relative"
    >
      <h1 className="absolute top-10 left-10 font-bold text-2xl tracking-wider flex gap-1">
        TeTher
        <img src="/brand_img.png" alt="" />
      </h1>
      <form
        className="px-10 pt-5 text-start w-full sm:w-[70%] md:w-1/2 lg:w-[30%] mb-4"
        onSubmit={signin}
      >
        <h1 className="pb-3 text-xl font-bold tracking-wider">
          Login to your Account
        </h1>
        <div className="text-xs text-red-500 h-2">{error && error}</div>

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
        <Button content="Sign In" type="submit" />
        <p className="text-sm w-full text-center mt-2 text-neutral-400">
          Don't have an Account?{"  "}
          <Link to={"/signup"} className="text-blue-400">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signin;
