"use client";
import { Provider as ReduxProvider } from "react-redux";
import ThemeWrapper from "../layout/ThemeWrapper";
import "./globals.css";
import { store } from "../store";
import Provider from "../providers/ChakraProvider";
import { usePathname, useRouter } from "next/navigation";
import HomeWrapper from "@/layout/HomeWrapper";
import { useEffect } from "react";
import { getAuth, getToken } from "@/lib/auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const avaliablePath = pathname.includes("/dashboard");

  return (
    <ReduxProvider store={store}>
      <html lang="en">
        <head>
          <title>Dental Clinic</title>
          <meta name="Neat Tech" content="Developed By Neat Tech" />
        </head>
        <body suppressHydrationWarning={true}>
          <Provider>
            {avaliablePath ? (
              <ThemeWrapper>{children}</ThemeWrapper>
            ) : (
              <HomeWrapper>{children}</HomeWrapper>
            )}
          </Provider>
        </body>
      </html>
    </ReduxProvider>
  );
}
