"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10  }} onClick={() => signIn()}>
      Sign in
    </button>
  );
};