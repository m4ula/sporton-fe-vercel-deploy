"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/products");
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

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm mb-2">Email</label>
            <input
              id="email"
              type="email"
              placeholder="admin@store.com"
              className="border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm mb-2">Password</label>
            <input
              id="password"
              type="password"
              placeholder="**********"
              className="border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <button
  type="submit"
  className="mt-4 bg-primary text-white py-3 rounded-md hover:bg-primary/90 active:scale-105 transition-all duration-150 ease-in-out cursor-pointer"
>
  Sign In
</button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;