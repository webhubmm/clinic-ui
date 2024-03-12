"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import blogOne from "@/public/assets/blogOne_image13.png";
import blogTwo from "@/public/assets/blog_imageTwo.png";
import blogThree from "@/public/assets/blog_imageThree14.png";
import BlogsCard from "@/components/common/blogscard/BlogsCard";
import { useAppSelector } from "@/store/hooks";

export default function BlogsShow() {
  const { blogsData } = useAppSelector((item) => item.blogsSlice);
  return (
    <Box
      marginTop="2rem"
      gap={10}
      display={{ base: "block", lg: "flex" }}
      flexWrap={"wrap"}
      justifyContent={"center"}
    >
      {blogsData?.map((item) => (
        <Box
          key={item.id}
          mx={"auto"}
          width={{ base: "100%", sm: "85%", md: "80%", lg: "31%" }}
          mb={{ base: "2rem", lg: 0 }}
        >
          <BlogsCard blogImg={item.images} title={item?.title} />
        </Box>
      ))}
    </Box>
  );
}
