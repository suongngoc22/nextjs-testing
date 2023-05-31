"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import iconGoogle from "../../public/icons/icons8-google.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  //const [isRegister, setIsRegister] = useState(false);

  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  //const [error, setError] = useState(false);

  const { currentUser } = useAuth();
  const { loginGoogle } = useAuth();
  const router = useRouter();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!email || !password) {
  //     setError("Email address or password is required!");
  //     return;
  //   }

  //   if (!isRegister) {
  //     try {
  //       await signin(email, password);
  //       router.push("/");
  //     } catch (error) {
  //       setError("Incorrect email or password");
  //     }
  //     return;
  //   }
  //   await signup(email, password);
  //   router.push("/login");
  // };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
    return;
  }, [currentUser]);

  return (
    <div className="flex flex-col items-center gap-8 min-h-screen justify-center">
      <h1 className="text-3xl font-semibold uppercase">Mail Service</h1>
      {/* <h1 className="text-2xl font-semibold text-center uppercase">
          {isRegister ? "Register" : "Login"}
        </h1>
        {error && <span className="text-sm text-red-600">{error}</span>} */}
      {/* <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="text-sm border p-2 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="text-sm border p-2 outline-none"
          />
          <button type="submit" className="bg-blue-900 p-2 rounded text-white">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <span
          className="text-sm text-blue-500 hover:underline cursor-pointer"
          onClick={() => setIsRegister((prev) => !prev)}
        >
          {!isRegister ? "Register now!" : "Login now!"}
        </span> */}
      <div
        className="flex items-center bg-white text-gray-600 text-sm py-2 px-10 rounded border gap-4 shadow-md cursor-pointer"
        onClick={loginGoogle}
      >
        <Image src={iconGoogle} alt="google" width={24} height={24} />
        <span>Sign in with Google</span>
      </div>
    </div>
  );
};

export default Login;
