"use client";

import {useState, FC} from "react";
import {signIn} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {useToast} from "@/hooks/use-toast";
import {Icons} from "@/components/icons";
import Link from "next/link";

export const SignInForm: FC = () => {
  const {toast} = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-14 w-14" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      </div>
      <div className="flex justify-center">
        <Button
          isLoading={isLoading}
          type="button"
          size="sm"
          className="w-full"
          onClick={loginWithGoogle}
          disabled={isLoading}
        >
          {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
          Google
        </Button>
      </div>
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
