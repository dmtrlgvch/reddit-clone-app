import {Icons} from "@/components/icons";
import Link from "next/link";
import {AuthForm} from "@/components/auth-form";

const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-12 w-12" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      </div>
      <AuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Don`t have an account?{" "}
        <Link
          href="/sign-up"
          className="hover:text-brand text-sm underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
