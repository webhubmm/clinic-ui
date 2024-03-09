import { Box, Card, CardHeader, Heading, Text, Image } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa6";

interface BlogImgType {
  id: number;
  url: string;
}

export default function BlogsCard({
  blogImg,
  title,
  md,
}: {
  blogImg: BlogImgType[];
  title: string;
  md?: string;
}) {
  return (
    <Card width={"100%"} borderRadius="10px" overflow={"hidden"}>
      <Box>
        <Image
          src={blogImg[0].url}
          alt="blogs app"
          width={"100%"}
          height={"300px"}
          sizes="100vw"
          className="w-full h-auto"
        />
      </Box>
      <CardHeader maxW={{ sm: "lg", lg: "sm" }}>
        <Heading size="md" color="neat.secondary" fontSize="1.3rem">
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
          <Text as="span" color="neat.primary" className="readMore">
            <FaArrowRight />
          </Text>
          <Text as="span" color="neat.secondary" className="readMore">
            Read More
          </Text>
        </Text>
      </CardHeader>
    </Card>
  );
}
