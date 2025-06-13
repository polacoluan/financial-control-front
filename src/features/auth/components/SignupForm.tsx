"use client";
import React, { useState } from "react";
import { signup } from "@/features/auth/api/signup";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signup(formData);
    alert(response.message);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-b pb-12">
        <div className="cols-span-3">
          <label htmlFor="name" className="block font-medium">
            Nome
          </label>
          <div className="mt-3">
            <input
              id="name"
              name="name"
              placeholder="Nome"
              className="block rounded-md w-full border px-3 py-1.5"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="cols-span-3 mt-3">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <div className="mt-3">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="block rounded-md w-full border px-3 py-1.5"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="cols-span-3 mt-3">
          <label htmlFor="password" className="block font-medium">
            Senha
          </label>
          <div className="mt-3">
            <input
              id="password"
              name="password"
              type="password"
              className="block rounded-md w-full border px-3 py-1.5"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="rounded-md py-2 px-3 text-semibold bg-sky-700 text-white hover:bg-sky-900"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
