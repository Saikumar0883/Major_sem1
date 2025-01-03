"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { signup } from "@/app//store/slices/auth";
<<<<<<< HEAD

=======
import { useRouter } from "next/navigation";
>>>>>>> 391196496eb46b2c8b04603eb8e46f47089feb00
import { Button } from "@/components/ui/button";

export function SignupFormDemo() {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Extract data from the form
    const formData = {
      ID: e.target.ID.value, // Assumes input name="ID"
      userName: e.target.userName.value, // Assumes input name="userName"
      password: e.target.password.value, // Assumes input name="password"
    };
    console.log("Form submitted:", formData);

    // Dispatch the data to the signup action
    dispatch(signup(formData));
  }
=======
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const ID = e.target.ID.value;
    const userName = e.target.userName.value;
    const password = e.target.password.value;
    const user = { ID, userName, password };
    dispatch(signup({ user, router }));
  };
>>>>>>> 391196496eb46b2c8b04603eb8e46f47089feb00
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-slate-700">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-white flex gap-2 items-center">
        Welcome to{" "}
        <p className="bg-purple-200 dark:bg-zinc-600 rounded-full p-2  w-32">
          InsightHub
        </p>
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="userName">User Name</Label>
            <Input id="userName" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="ID">Enter Your Id</Label>
<<<<<<< HEAD
          <Input id="ID" placeholder="b19xxxx" type="text" />
=======
          <Input id="ID" placeholder="projectmayhem@fc.com" type="email" />
>>>>>>> 391196496eb46b2c8b04603eb8e46f47089feb00
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <Button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </Button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
export default SignupFormDemo;