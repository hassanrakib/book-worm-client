"use client";

import { useRef } from "react";
import { Provider as StoreProvider } from "react-redux";
import { AppStore, makeStore } from "./store";
import { setToken } from "./features/auth/auth.slice";

export function Provider({
  token,
  children,
}: Readonly<{ token: string | undefined; children: React.ReactNode }>) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();

    // if user is logged in
    // initialize the store with token
    if (token) {
      storeRef.current.dispatch(setToken(token));
    }
  }
  return <StoreProvider store={storeRef.current}>{children}</StoreProvider>;
}
