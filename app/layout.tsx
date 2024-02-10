"use client";
import { Provider as ReduxProvider } from "react-redux";
import ThemeWrapper from "../layout/ThemeWrapper";
import "./globals.css";
import { store } from "../store";
import Provider from "../providers/ChakraProvider";
import { usePathname, useRouter } from "next/navigation";
import HomeWrapper from "@/layout/HomeWrapper";
import Banner from "@/components/common/banner/Banner";
import Footer from "@/components/common/footer/Footer";
import { Box } from "@chakra-ui/react"
import { useEffect } from "react";
import { getAuth, getToken } from "@/lib/auth";
import UserNavBar from "@/components/common/navbar/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const avaliablePath = pathname.includes("/dashboard");
  const avaliableNav= pathname.includes('/login' ) || pathname.includes('/register') 
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
              <HomeWrapper>
                {
                  !avaliableNav && (
                    <>
                     <Banner left="2359 Still StreetKenton, OH 43326"
        right="Working hours: Mon - Fri - 09:00 am - 06:00 pm">

                  </Banner>
                  <UserNavBar />
                    </>
                  )
                }
                {children}
                {
                  !avaliableNav && <Footer />
                }
                </HomeWrapper>
            )}
          </Provider>
        </body>
      </html>
    </ReduxProvider>
  );
}
