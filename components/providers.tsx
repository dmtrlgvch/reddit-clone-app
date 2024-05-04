"use client";

import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {SessionProvider} from "next-auth/react";
import {ReactNode} from "react";

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({children}: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
