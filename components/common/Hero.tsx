"use client";

import { Box, Center, Flex, Heading, HStack } from "@chakra-ui/react";
import HeroImg from "@/public/assets/asset 5.webp";
import Image from "next/image";
import dantxLogo from "@/public/assets/asset 6.svg";
import Container from "./container/Container";
import Button from "./button/ButtonPrimary";
import HeadingLarge from "./headings/HeadingLarge";
import Text from "./text/Text";
import TextSmall from "./text/TextSmall";

export default function Hero() {
  return (
    <section className=" bg-heroBackgroundImage">
      <Container>
        <div className="flex justify-between gap-10 items-center">
          <Image src={HeroImg} alt="hero img" width={800} height={400} />
          <div className=" space-y-20">
            <div className=" space-y-10 text-white">
              <HeadingLarge>Trustworthy dental services</HeadingLarge>
              <Text>
                Our dental clinic offers a range of services to help you achieve
                a healthy and beautiful smile.
              </Text>
              <Button placeholder="Learn More" onClick={() => {}} />
            </div>
            <div className="flex gap-3 items-center">
              <Image src={dantxLogo} alt="dantx logo" width={30} height={30} />
              <div className="flex gap-1">
                <TextSmall color="text-neat-primary">Say goodbye</TextSmall>
                <TextSmall color="text-white">
                  to dental issues with our restoration services.
                </TextSmall>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
