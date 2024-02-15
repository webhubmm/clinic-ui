import Loading from "@/components/Custom/Loading";
import FilePondUploader from "@/components/FilePondUploader/FilePondUploader";
import MulitpleFilePondUploader from "@/components/FilePondUploader/MulitpleFilePondUploader";
import { centralCreate } from "@/lib/api-central";
import { getToken } from "@/lib/auth";
import { useAppSelector } from "@/store/hooks";
import { setCreateLoading, setPerPage } from "@/store/slices/globalSlice";
import { BranchesDataType } from "@/types/branchesDataType";
import { DoctorsDataType } from "@/types/doctorsDataType";
import Select from "react-select";
import makeAnimated from "react-select/animated";
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
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";

interface DoctorsCreateModalProps {
  title: string;
  children?: React.ReactNode;
  fetchData: () => void;
}

export interface DoctorsCreateModalRef {
  open: () => void;
  close: () => void;
}

const DoctorsCreateModal: React.ForwardRefRenderFunction<
  DoctorsCreateModalRef,
  DoctorsCreateModalProps
> = ({ title, children, fetchData }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<DoctorsDataType>({
    name: "",
    email: "",
    phone: "",
    degree: "",
    specialize: "",
    branches: [],
    address: "",
    image: "",
  });
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const createLoading = useAppSelector(
    (state) => state.globalSlice.createLoading
  );
  const branchesList = useAppSelector(
    (state) => state.branchesSlice.branchesData
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
    dispatch(setCreateLoading(true));
    e.preventDefault();
    const res = await centralCreate("createEditDeleteDoctorsAPI", formData);
    if (res.code === 400) {
      toastFun("Error", res.data, "error");
    }
    if (res.code === 200) {
      toastFun("Success", res.message, "success");
    }
    dispatch(setCreateLoading(false));
    onClose();
    fetchData();
    setFormData({
      name: "",
      email: "",
      phone: "",
      degree: "",
      specialize: "",
      branches: [],
      address: "",
      image: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBranchesChange = (selectedOptions: any) => {
    const selectedBranches = selectedOptions.map((item: any) => item.value);
    setFormData((prevData) => ({
      ...prevData,
      branches: selectedBranches,
    }));
  };

  const handleFileChange = (base64Image: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      image: base64Image,
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
                    type="text"
                    required
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
                  <FormLabel>Address</FormLabel>
                  <Input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
              <Box width={{ base: "100%", md: "50%" }}>
                <FormControl mt={4}>
                  <FormLabel>Degree</FormLabel>
                  <Input
                    type="text"
                    required
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Specialize</FormLabel>
                  <Input
                    type="text"
                    name="specialize"
                    value={formData.specialize}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Branches</FormLabel>
                  {branchesList.length > 0 ? (
                    <Box display={"flex"}>
                      <Select
                        required
                        className="multiSelect"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        onChange={(branchesList) =>
                          handleBranchesChange(branchesList)
                        }
                        isMulti
                        options={branchesList.map((item) => ({
                          value: item.id,
                          label: item.name,
                        }))}
                      />
                      <Text
                        color={"#185aca"}
                        cursor={"pointer"}
                        width={"20%"}
                        textAlign={"center"}
                        fontSize={{ base: "12px", md: "13px" }}
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

                <FilePondUploader onFileChange={handleFileChange} />
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

export default forwardRef(DoctorsCreateModal);
