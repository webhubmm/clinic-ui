"use client";
import Loading from "@/components/Custom/Loading";
import MulitpleFilePondUploader from "@/components/FilePondUploader/MulitpleFilePondUploader";
import { centralCreate, centralShow } from "@/lib/api-central";
import { useAppSelector } from "@/store/hooks";
import {
  setCreateLoading,
  setFetchLoading,
  setPerPage,
} from "@/store/slices/globalSlice";
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
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { setBlogsData } from "@/store/slices/blogsSlice";
import TinyMceEditor from "@/components/Custom/TinyMceEditor";
import { useRouter } from "next/navigation";
import makeAnimated from "react-select/animated";
import { BlogsDataType } from "@/types/blogsDataType";

export interface ClickedSerivces {
  value: string | undefined;
  label: string | undefined;
}

const IdBlogsComponent = ({ params }: { params: { id: string } }) => {
  const [formData, setFormData] = useState<BlogsDataType>({
    title: "",
    content: "",
    author: "",
    read_time: "",
    services: [],
    images: [],
  });
  const [clickedServices, setClickedServices] = useState<ClickedSerivces[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const animatedComponents = makeAnimated();
  const servicesList = useAppSelector(
    (state) => state.blogsSlice.servicesListDataForBlogs
  );
  const FetchShowService = async () => {
    dispatch(setFetchLoading(true));
    const result = await centralShow("getBlogsAPI", params.id);
    const remainImg = result?.data.blog.images?.map((item: any) => item.url);
    const remainServices = result?.data.blog.services?.map(
      (item: any) => item.id
    );
    setFormData({
      ...result?.data.blog,
      images: remainImg,
      services: remainServices,
    });
    const outPutNewServices = result?.data.blog.services.map(
      (ele: any) => ele.id || ele
    );
    const selectedClickedServices = servicesList
      .filter(
        (item: any) =>
          outPutNewServices.includes(item) ||
          outPutNewServices.includes(item.id)
      )
      .map((item: any) => {
        const service = servicesList.find((service) => service.id === item.id);
        return { value: service?.id, label: service?.name };
      });

    setClickedServices(selectedClickedServices);
    dispatch(setFetchLoading(false));
  };

  useEffect(() => {
    FetchShowService();
  }, []);

  const createLoading = useAppSelector(
    (state) => state.globalSlice.createLoading
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
    // dispatch(setCreateLoading(true));
    // const res = await centralCreate("createEditDeleteBlogsAPI", formData);
    // if (res.code === 400) {
    //   toastFun("Error", res.data, "error");
    // }
    // if (res.code === 200) {
    //   toastFun("Success", res.message, "success");
    // }
    // dispatch(setCreateLoading(false));
    // router.push("/dashboard/blogs");
    console.log("formData :: ", formData);
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

  const handleServicesIdChange = (selectedOptions: any) => {
    const selectedServices = selectedOptions.map((item: any) => item.value);
    setFormData((prevData) => ({
      ...prevData,
      services: selectedServices,
    }));
  };

  console.log("formData :: ", formData.images);

  const handleFileChange = (base64Images: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      images: formData.images?.concat(base64Images),
      isOldImage: false,
    }));
  };

  const handleEditorChange = (content: string, editor: any) => {
    setFormData({ ...formData, content: content });
  };

  return (
    <Box>
      <Text fontSize={"30px"} fontWeight={"bold"}>
        Edit Blogs
      </Text>
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
                initialValue={formData.content}
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
              {servicesList?.length > 0 && clickedServices.length > 0 ? (
                <Box display={"flex"}>
                  <Select
                    className="multiSelect"
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={(servicesList) =>
                      handleServicesIdChange(servicesList)
                    }
                    required
                    defaultValue={clickedServices}
                    isMulti
                    options={servicesList.map((item) => ({
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
                <Select
                  className="multiSelect"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  onChange={(servicesList) =>
                    handleServicesIdChange(servicesList)
                  }
                  required
                  defaultValue={clickedServices}
                  isMulti
                  options={servicesList.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
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
                        alt="blogs-img"
                        height={"200px"}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Box>

            <MulitpleFilePondUploader onFileChange={handleFileChange} />

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
              Edit
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default IdBlogsComponent;
