import {useSession} from "next-auth/react";

export const useAuthSession = () => {
  return useSession();
};
