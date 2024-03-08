import Loading from "@/components/Custom/Loading";
import MultipleFilePondUploader from "@/components/FilePondUploader/MultipleFilePondUploader";
import { centralCreate } from "@/lib/api-central";
import { useAppSelector } from "@/store/hooks";
import { addBranches } from "@/store/slices/branchesSlice";
import { setCreateLoading, setPerPage } from "@/store/slices/globalSlice";
import { BranchesDataType } from "@/types/branchesDataType";
import { FaWindowClose } from "react-icons/fa";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BranchesCreateModalProps {
  title: string;
  children?: React.ReactNode;
  fetchData: () => void;
}

export interface BranchesCreateModalRef {
  open: () => void;
  close: () => void;
}

const BranchesCreateModal: React.ForwardRefRenderFunction<
  BranchesCreateModalRef,
  BranchesCreateModalProps
> = ({ title, children, fetchData }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<BranchesDataType>({
    name: "",
    email: "",
    phone: "",
    daily_appointment_count: "",
    user_id: "",
    images: [],
    is_open: "1",
    address: "",
    lat: "",
    lng: "",
    open_hour: "",
    close_hour: "",
    isOldImage: true,
  });
  const dispatch = useDispatch();
  const createLoading = useAppSelector(
    (state) => state.globalSlice.createLoading
  );
  const staffList = useAppSelector(
    (state) => state.branchesSlice.userDataForBranches
  );
  let perPage = useAppSelector(
    (state) => state.globalSlice.credential.per_page
  );

  useImperativeHandle(ref, () => ({
    open: onOpen,
    close: onClose,
  }));

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
    const res = await centralCreate("createEditDeleteBranchesAPI", formData);
    if (res.code === 400) {
      toastFun("Error", res.data, "error");
    }
    if (res.code === 200) {
      toastFun("Success", res.message, "success");
      dispatch(addBranches(res.data));
    }
    dispatch(setCreateLoading(false));
    onClose();
    setFormData({
      name: "",
      email: "",
      phone: "",
      daily_appointment_count: "",
      user_id: "",
      images: [],
      is_open: "",
      address: "",
      lat: "",
      lng: "",
      open_hour: "",
      close_hour: "",
      isOldImage: true,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleIsUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      user_id: e.target.value,
    }));
  };

  const handleIsOpenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      is_open: e.target.value,
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        minW={{ base: "100%", sm: "90%", md: "90%", lg: "80%", xl: "60%" }}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box display={{ base: "block ", md: "flex" }} gap={5}>
              <Box width={{ base: "100%", md: "50%" }}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Phone No.</FormLabel>
                  <Input
                    required
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Staff</FormLabel>
                  {staffList.length > 0 ? (
                    <Box display={"flex"}>
                      <Select
                        required
                        placeholder="Select Staff"
                        value={formData.user_id}
                        onChange={(e) => handleIsUserIdChange(e)}
                      >
                        {staffList.map((item) => {
                          return (
                            <option value={item.id} key={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </Select>
                      <Text
                        color={"#185aca"}
                        cursor={"pointer"}
                        width={"35%"}
                        textAlign={"center"}
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

                <FormControl mt={4}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Is Open?</FormLabel>
                  <Select
                    required
                    value={formData.is_open}
                    onChange={(e) => handleIsOpenChange(e)}
                  >
                    <option value="1">Open</option>
                    <option value="0">Close</option>
                  </Select>
                </FormControl>
              </Box>

              <Box width={{ base: "100%", md: "50%" }}>
                <FormControl mt={4}>
                  <FormLabel>Daily Appointment Count</FormLabel>
                  <Input
                    type="text"
                    name="daily_appointment_count"
                    value={formData.daily_appointment_count}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Open Time</FormLabel>
                  <Input
                    type="text"
                    name="open_hour"
                    value={formData.open_hour}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Close Time</FormLabel>
                  <Input
                    type="text"
                    name="close_hour"
                    value={formData.close_hour}
                    onChange={handleInputChange}
                    required
                  />
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
              </Box>
            </Box>
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
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(BranchesCreateModal);
