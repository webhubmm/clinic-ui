import { Box, Card, CardHeader, Heading, Text, Image } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

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
          src={blogImg[0]?.url}
          alt="blogs app"
          width={"100%"}
          height={"300px"}
          objectFit={"contain"}
          sizes="100vw"
          className="w-full h-auto"
        />
      </Box>
      <CardHeader maxW={{ sm: "lg", lg: "sm" }}>
        <Heading size="md" color="neat.secondary" fontSize="1.8rem">
          {title}
        </Heading>
        <Box
          display="flex"
          marginTop="20px"
          justifyItems="center"
          alignItems="center"
          gap="5"
          cursor="pointer"
        >
          <Box color="neat.primary">
            <ArrowForwardIcon
              _hover={{ fontSize: "25px" }}
              transitionDuration={"700ms"}
            />
            <Text
              as="span"
              color="neat.secondary"
              _hover={{ fontWeight: "bold" }}
              ml={2}
            >
              Read More
            </Text>
          </Box>
        </Box>
      </CardHeader>
    </Card>
  );
}
