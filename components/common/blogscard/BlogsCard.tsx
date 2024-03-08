import { Box, Card, CardHeader, Heading, Text } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import blogImg from "@/public/assets/blogOne_image13.png";
import { FaArrowRight } from "react-icons/fa6";

interface blogProps {
  blogImg: string;
  title: string;
}
export default function BlogsCard({
  blogImg,
  title,
  md,
}: {
  blogImg: StaticImageData;
  title: string;
  md?: string;
}) {
  return (
    <Card width={{ sm: "auto", md: `${md}`, lg: "380px" }} borderRadius="10px">
      <Box pos="relative">
        <Image
          src={blogImg}
          alt="blogs app"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
        />
      </Box>
      <CardHeader maxW={{ sm: "lg", lg: "sm" }}>
        <Heading size="md" color="neat.secondary" fontSize="1.5rem">
          {title}
        </Heading>
        <Text
          display="flex"
          marginTop="20px"
          justifyItems="center"
          alignItems="center"
          gap="5"
          cursor="pointer"
        >
          <Text as="span" color="neat.primary">
            <FaArrowRight />
          </Text>
          <Text as="span" color="neat.secondary">
            Read More
          </Text>
        </Text>
      </CardHeader>
    </Card>
  );
}
