import { StackClientApp } from "@stackframe/stack"

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  urls: {
    handler: "/handler",
    signIn: "/signin",
    signUp: "/signup",
  },
})
