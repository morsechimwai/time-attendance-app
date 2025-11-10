import { StackClientApp } from "@stackframe/stack"

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "/signin",
    signUp: "/signup",
    afterSignIn: "/",
    afterSignOut: "/",
    forgotPassword: "/forgot-password",
    passwordReset: "/reset-password",
  },
})
