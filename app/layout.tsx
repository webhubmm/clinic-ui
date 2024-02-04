"use client";
import { Provider as ReduxProvider } from "react-redux";
import ThemeWrapper from "../layout/ThemeWrapper";
import { store } from "../store";
import Provider from "../providers/ChakraProvider";
import { usePathname } from "next/navigation";
import HomeWrapper from "@/layout/HomeWrapper";
import NavBar from "@/components/common/navbar/NavBar";
import Banner from "@/components/common/banner/Banner";
import Footer from "@/components/common/footer/Footer";
import { Box } from "@chakra-ui/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const avaliablePath =
    pathname.includes("/dashboard") || pathname.includes("/dashboard/user");

    const loginPath = pathname.includes("/login") || pathname.includes("/register");
   
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
                {!loginPath && (
                  <>
                  <Banner left="2359 Still StreetKenton, OH 43326"
        right="Working hours: Mon - Fri - 09:00 am - 06:00 pm">

                  </Banner>
                <NavBar />
                 
               
                </>
                )}
                 {/* <Box minHeight="70vh"> */}
                    {children}
                    {/* </Box> */}
                         {!loginPath && (
                   <Footer />
                )}
                </HomeWrapper>
            )}
          </Provider>
        </body>
      </html>
    </ReduxProvider>
  );
}
