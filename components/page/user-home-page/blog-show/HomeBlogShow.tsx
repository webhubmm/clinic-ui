"use client";
import { Box, Container, Heading, Text, Wrap } from "@chakra-ui/react";
import blogOne from "@/public/assets/blogOne_image13.png";
import blogTwo from "@/public/assets/blog_imageTwo.png";
import blogThree from "@/public/assets/blog_imageThree14.png";
import BlogsCard from "@/components/common/blogscard/BlogsCard";
import ContainerBox from "@/components/common/container/Container";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFetchLoading } from "@/store/slices/globalSlice";
import { centralGetAllLists } from "@/lib/api-central";
import { BlogsDataType } from "@/types/blogsDataType";
import { useAppSelector } from "@/store/hooks";
import Loading from "@/components/Custom/Loading";
import { setBlogsData } from "@/store/slices/blogsSlice";

export default function HomeBlogShow() {
  const dispatch = useDispatch();
  const { isFetchLoading } = useAppSelector((item) => item.globalSlice);
  const { blogsData } = useAppSelector((item) => item.blogsSlice);

  const FetchGetAllBlogs = async () => {
    dispatch(setFetchLoading(true));
    const result = await centralGetAllLists("getBlogsAPI", {
      page: 1,
      per_page: 10,
      search: "",
      trash: false,
    });
    dispatch(setBlogsData(result.data.blogs));
    dispatch(setFetchLoading(false));
  };

  useEffect(() => {
    FetchGetAllBlogs();
  }, []);

  return (
    <Box paddingY="8rem">
      {/* <Container maxW='container.xl'> */}
      <ContainerBox>
        <Box display="grid" justifyItems="center" alignItems="center" gap="5">
          <Text color="neat.primary" fontWeight="600">
            Our blogs
          </Text>
          <Heading color="neat.secondary">Separating fact from fiction</Heading>
        </Box>

        <Box
          marginTop="4rem"
          display="flex"
          flexDir={{ sm: "column", lg: "row" }}
          alignItems="center"
          justifyContent={{ lg: "space-evenly" }}
          gap={{ sm: "5", lg: "0" }}
        >
          {isFetchLoading ? (
            <Loading />
          ) : (
            blogsData?.slice(0, 3).map((item) => (
              <Box
                key={item.id}
                // onClick={() => console.log("item :: ", item)}
                width={{ base: "100%", sm: "85%", md: "60%", lg: "31%" }}
              >
                <BlogsCard
                  key={item.id}
                  blogImg={item.images}
                  title={item.title}
                />
              </Box>
            ))
          )}
        </Box>
      </ContainerBox>
      {/* </Container> */}
    </Box>
  );
}
