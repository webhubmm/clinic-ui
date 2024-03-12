"use client";
import Loading from "@/components/Custom/Loading";
import BlogsCard from "@/components/common/blogscard/BlogsCard";
import BlogsCardTwo from "@/components/common/blogscard/BlogsCardTwo";
import ButtonSecondary from "@/components/common/button/ButtonSecondary";
import ContainerBox from "@/components/common/container/Container";
import BlogsShow from "@/components/page/blogs-page/BlogsShow";
import usePagination from "@/hooks/usePagination";
import { centralGetAllLists } from "@/lib/api-central";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setBlogsData } from "@/store/slices/blogsSlice";
import {
  setFetchLoading,
  setPerPage,
  setSearch,
} from "@/store/slices/globalSlice";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  Heading,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function BlogsPage() {
  const dispatch = useAppDispatch();
  const { isFetchLoading } = useAppSelector((item) => item.globalSlice);
  const { credential } = useAppSelector((state) => state.globalSlice);
  const { blogsData } = useAppSelector((item) => item.blogsSlice);
  let [next, setNext] = useState(0);
  let perPage = useAppSelector(
    (state) => state.globalSlice.credential.per_page
  );

  const obj = {
    page: 1,
    per_page: perPage,
  };

  const FetchGetAllBlogs = async () => {
    dispatch(setFetchLoading(true));
    const result = await centralGetAllLists("getBlogsAPI", {
      ...credential,
      ...obj,
    });
    dispatch(setBlogsData(result.data.blogs));
    dispatch(setFetchLoading(false));
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  useEffect(() => {
    FetchGetAllBlogs();
  }, [perPage]);

  console.log("next :: ", next);

  return (
    <Box bg="neat.pearlwhite" paddingY={{ sm: "4rem", lg: "6rem" }}>
      <ContainerBox>
        <Box display="grid" justifyContent="center">
          <Heading color="neat.secondary" fontSize={{ sm: "2rem", lg: "3rem" }}>
            Blog Posts
          </Heading>
          <Text color="slate" textAlign={"center"} mt={2}>
            Separating fact from fiction
          </Text>
        </Box>
        <Box
          mt={{ base: "2rem", lg: "4rem" }}
          display={"flex"}
          width={{ base: "100%", sm: "85%", md: "80%", lg: "60%" }}
          mx={"auto"}
        >
          <InputGroup>
            <Input
              variant="outline"
              placeholder="Search"
              border={"none"}
              className="inputSearch"
              height={"4rem"}
              focusBorderColor="transparent"
              _focus={{
                boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
              }}
              onChange={handleChangeSearch}
            />
            <InputRightElement
              height={"100%"}
              width={{ base: "13%", md: "11%", lg: "9%" }}
              onClick={() => FetchGetAllBlogs()}
            >
              <Button bgColor={"neat.primary"} height={"100%"} width={"100%"}>
                <SearchIcon fontSize={"20px"} color={"white"} />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box
          display={{ sm: "block", lg: "flex" }}
          justifyContent={"center"}
          mt={"4rem"}
          gap={10}
        >
          {blogsData?.slice(0, 2).map((item) => (
            <Box
              mx={"auto"}
              key={item.id}
              display={{ sm: "block", lg: "flex" }}
              justifyContent={"center"}
              width={{ base: "100%", sm: "85%", md: "80%", lg: "40%" }}
              mb={"2rem"}
            >
              <BlogsCardTwo
                key={item.id}
                blogImg={item.images}
                title={item.title}
              />
            </Box>
          ))}
        </Box>
        {isFetchLoading ? <Loading /> : <BlogsShow />}
        <Box display={"flex"} justifyContent={"center"} mt={"3rem"}>
          {next > 0 && (
            <ButtonSecondary
              placeholder="Previous"
              onClick={() => {
                setNext((next -= 1));
                dispatch(setPerPage((perPage -= 10)));
              }}
            />
          )}
          <ButtonSecondary
            placeholder="Next"
            onClick={() => {
              setNext((next += 1));
              dispatch(setPerPage((perPage += 10)));
            }}
          />
        </Box>
      </ContainerBox>
    </Box>
  );
}
