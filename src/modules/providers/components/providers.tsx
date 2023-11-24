import { type PropsWithChildren } from "react";
import { ThemeProvider } from "./theme";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "./trpc-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <TRPCReactProvider cookies={cookies().toString()}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </TRPCReactProvider>
  );
};
