import Link from "next/link";
import { Icons } from "./icons";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/get-auth-session";
import { UserMenu } from "@/components/user-menu";
import SearchBar from "@/components/searchbar";

export const Header = async () => {
  const session = await getAuthSession();

  return (
    <header className="sticky top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-3">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="h-10 w-10 sm:h-8 sm:w-8" />
          <p className="hidden text-zinc-700 text-md font-medium md:block">Kinda Reddit</p>
        </Link>

        <SearchBar />

        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};
