"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Inputs";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import AuthSocialButton from "./AuthSocialButton";
import axios from "axios";
type varient = "Login" | "Register";
export default function AuthForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [varient, setVarient] = useState<varient>("Login");

  const toggleVarient = useCallback(() => {
    if (varient === "Login") {
      setVarient("Register");
    } else {
      setVarient("Login");
    }
  }, [varient]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    if (varient === "Register") {
      axios.post("/api/register", data);
    }
    if (varient === "Login") {
      // NextAuth signin
    }
  };
  const sociallinks = (action: string) => {
    setLoading(true);
    //nextauth social signin
  };
  return (
    <div className="mt-8 sm:mx-auto px-4 sm:w-full sm:max-w-md">
      <div className="bg-white shadow-lg px-4 py-8 sm:px-10 sm:rounded-lg">
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          {varient === "Register" && (
            <Input
              id="name"
              lable="Name"
              register={register}
              errors={errors}
              disabled={loading}
            />
          )}
          <Input
            id="email"
            type="email"
            lable="Email"
            register={register}
            errors={errors}
            disabled={loading}
          />
          <Input
            id="password"
            type="password"
            lable="Password"
            register={register}
            errors={errors}
            disabled={loading}
          />
          <Button fullWidth disabled={loading} type="submit">
            {varient === "Login" ? "Sign in" : "Sign up"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => sociallinks("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => sociallinks("google")}
            />
          </div>
        </div>
        <div
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {varient === "Login"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVarient} className="underline cursor-pointer">
            {varient === "Login" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
}
