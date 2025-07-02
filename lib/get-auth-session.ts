// import {authOptions} from "@/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

export const getAuthSession = () => {
  return getServerSession(authOptions);
};
