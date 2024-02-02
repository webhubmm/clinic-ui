import React from "react";
import Container from "../container/Container";
import TextSmall from "../text/TextSmall";

interface BannerProp {
  left: string;
  right: string;
}

const Banner = ({ left, right }: BannerProp) => {
  return (
    <div className="  bg-neat-secondary text-white p-2 hidden lg:block">
      <Container>
        <div className="flex justify-between items-center">
          <TextSmall>{left}</TextSmall>
          <TextSmall>{right}</TextSmall>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
