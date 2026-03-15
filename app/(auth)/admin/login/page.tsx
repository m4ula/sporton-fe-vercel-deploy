"use client";

import { login } from "@/app/services/auth.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/admin/products");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const data = await login({ email, password });

      if (data?.token) {
        localStorage.setItem("token", data.token);
        router.push("/admin/products");
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || "Something went wrong, please try again later."
      );
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#F7F9FA] w-full min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md py-12 px-8 border-t-4 border-primary">
        <Image
          src="/images/logo-Admin.svg"
          alt="logo admin"
          width={304}
          height={51}
          className="mx-auto mb-6"
        />
        <p className="opacity-50 text-sm text-center mb-8">
          Enter your credentials to access the dashboard
        </p>

        {errorMessage && (
          <div className="mb-4 px-3 py-2 bg-primary-light border border-primary rounded-md text-primary text-sm text-center w-full">
            {errorMessage}
          </div>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="admin@store.com"
              className="border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm mb-2">Password</label>
            <input
              id="password"
              type="password"
              placeholder="**********"
              className="border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 bg-primary text-white py-3 rounded-md hover:bg-primary/90 disabled:opacity-60 active:scale-95 transition-all"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;