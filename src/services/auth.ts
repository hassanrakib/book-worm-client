// we are considering functions here to be server actions
// so, that we can we use them in client (only in event handlers)
// & server both type of components
"use server";

import { envConfig } from "@/config/envConfig";
import { cookies } from "next/headers";

// delete token cookie on sign out
export const deleteToken = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("token");
};

// set token in the cookie store to be used by next.js server components using cookies() api
// cookies will be scoped to the frontend domain, as next.js server is setting the cookie
// request to frontend server (next.js) will recieve cookie from browser and can use cookies()
// so backend api call will not send cookie (cookie not scoped to backend domain, no cookie for backend domain in the browser)
export const setTokenInCookie = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    secure: envConfig.NODE_ENV === "production",
    httpOnly: true,
    sameSite: true,
    // 5 minute less than the token life time
    maxAge: Number(envConfig.token_expires_in) - 300,
  });
};