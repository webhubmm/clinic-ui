"use client";
import Loading from "@/components/Custom/Loading";
import MultipleFilePondUploader from "@/components/FilePondUploader/MultipleFilePondUploader";
import { centralCreate } from "@/lib/api-central";
import { useAppSelector } from "@/store/hooks";
import { addBranches } from "@/store/slices/branchesSlice";
import { setCreateLoading, setPerPage } from "@/store/slices/globalSlice";
import { FaWindowClose } from "react-icons/fa";
import Select from "react-select";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CreateBlogsDataType } from "@/types/blogsDataType";
import { addBlogs } from "@/store/slices/blogsSlice";
import TinyMceEditor from "@/components/Custom/TinyMceEditor";
import { useRouter } from "next/navigation";
import makeAnimated from "react-select/animated";

const BlogsCreate = () => {
  const [formData, setFormData] = useState<CreateBlogsDataType>({
    title: "",
    content: "",
    author: "",
    read_time: "",
    services: [],
    images: [],
  });
  const [
    clickedServicesForSelectedServices,
    setClickedServicesForSelectedServices,
  ] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const animatedComponents = makeAnimated();

  const createLoading = useAppSelector(
    (state) => state.globalSlice.createLoading
  );

  const serviceList = useAppSelector(
    (state) => state.blogsSlice.servicesListDataForBlogs
  );
  let perPage = useAppSelector(
    (state) => state.globalSlice.credential.per_page
  );

  const toast = useToast();
  const toastFun = (
    condition: string,
    description: string,
    statusInd: "error" | "success"
  ) => {
    toast({
      position: "top-right",
      title: condition,
      description: description,
      status: statusInd,
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(setCreateLoading(true));
    const res = await centralCreate("createEditDeleteBlogsAPI", formData);
    if (res.code === 400) {
      toastFun("Error", res.data, "error");
    }
    if (res.code === 200) {
      toastFun("Success", res.message, "success");
    }
    dispatch(setCreateLoading(false));
    router.push("/dashboard/blogs");
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const selectedServices = clickedServicesForSelectedServices.map(
    (item: any) => {
      const service = serviceList.find((service) => service.id === item.id);
      return { value: service?.id, label: service?.name };
    }
  );

  const handleServicesIdChange = (selectedOptions: any) => {
    const selectedServices = selectedOptions.map((item: any) => item.value);
    setFormData((prevData) => ({
      ...prevData,
      services: selectedServices,
    }));
  };

  const handleFileChange = (base64Images: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      images: base64Images,
      isOldImage: false,
    }));
  };

  const imageRemoveToNull = () => {
    setFormData((prevData) => ({
      ...prevData,
      images: null,
    }));
  };

  const handleEditorChange = (content: string, editor: any) => {
    setFormData({ ...formData, content: content });
  };
  return (
    <Box>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box
          display={{ base: "block", md: "flex" }}
          justifyContent={"space-evenly"}
        >
          <Box width={{ base: "95%", sm: "90%", md: "45%" }} mx={"auto"}>
            <FormControl mt={4}>
              <FormLabel>Title</FormLabel>
              <Input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <TinyMceEditor
                apiKey={"qeiutdvy45rq4rlxyv51z1r5n7jbk2wdzqzrjpk4uaulh869"}
                onChange={handleEditorChange}
              />
            </FormControl>
          </Box>

          <Box width={{ base: "95%", sm: "90%", md: "45%" }} mx={"auto"}>
            <FormControl mt={4}>
              <FormLabel>Author</FormLabel>
              <Input
                required
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Read Time</FormLabel>
              <Input
                required
                type="text"
                name="read_time"
                value={formData.read_time}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Services</FormLabel>
              {serviceList?.length > 0 ? (
                <Box display={"flex"}>
                  <Select
                    className="multiSelect"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={(serviceList) =>
                      handleServicesIdChange(serviceList)
                    }
                    defaultValue={selectedServices}
                    isMulti
                    options={serviceList.map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))}
                  />
                  <Text
                    color={"#185aca"}
                    cursor={"pointer"}
                    width={"35%"}
                    textAlign={"center"}
                    fontSize={{ base: "12px", md: "15px" }}
                    my={"auto"}
                    onClick={() => {
                      dispatch(setPerPage((perPage += 10)));
                    }}
                  >
                    Load more
                  </Text>
                </Box>
              ) : (
                <Loading />
              )}
            </FormControl>

            <Box
              display={"flex"}
              gap={2}
              flexWrap={"wrap"}
              justifyContent={"space-evenly"}
              mt={4}
            >
              {formData.images?.length > 0 && (
                <FaWindowClose
                  className="removeImg"
                  onClick={() => {
                    setFormData((prevData) => ({
                      ...prevData,
                      images: null,
                    }));
                  }}
                />
              )}
              <Swiper
                autoHeight={true}
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
              >
                {formData.images?.map((item: any, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image
                        src={item}
                        key={index}
                        width={"100%"}
                        alt="branches-img"
                        height={"200px"}
                        objectFit={"contain"}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>

            <MultipleFilePondUploader
              onFileChange={handleFileChange}
              formDataImages={formData.images}
              setFormDataImages={imageRemoveToNull}
            />

            <Button
              isLoading={createLoading}
              float="inline-end"
              type="submit"
              colorScheme="blue"
              mt={4}
              sx={{
                bgColor: "#5c90e9",
                transitionDuration: "500ms",
                color: "white",
                _hover: {
                  bgColor: "#185aca",
                },
                mb: 3,
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default BlogsCreate;
