import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import api from "../utils/api";
import Link from "next/link";

const SignupSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must meet requirements: 8 character, atleast 1 letter, 1 number and 1 special character"
    )
    .required("Password is required"),
});

const Signup = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  interface FormData {
    email: string;
    name: string;
    password: string;
  }

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post("/user/signup", data);
      if (response.status >= 200 && response.status < 300) {
        const userData = response.data;
        localStorage.setItem("user", JSON.stringify(userData));
        router.push("/");
      } else {
        setApiError(response.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError("An error occurred during the API request.");
        }
      } else {
        setApiError("Network error. Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-8 rounded shadow-md"
      >
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label>Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            {...register("name")}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            className="w-full border rounded p-2"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>
        {apiError && <p className="text-red-600 mb-4">{apiError}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
        <p className="mt-2">
          Already have an account? <Link href="/signin">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
