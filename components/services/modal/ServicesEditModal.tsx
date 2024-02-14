"use client";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import { getToken } from "@/lib/auth";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { setEditLoading, setPerPage } from "@/store/slices/globalSlice";
import FilePondUploader from "@/components/FilePondUploader/FilePondUploader";
import { centralEdit } from "@/lib/api-central";
import { EditBranches } from "@/lib/branches";
import MulitpleFilePondUploader from "@/components/FilePondUploader/MulitpleFilePondUploader";
import Loading from "@/components/Custom/Loading";
import Image from "next/image";
import { ServicesDataType } from "@/types/servicesDataType";

interface ServicesEditModalProps {
  title: string; // Data to be edited
  fetchData: () => void;
}

export interface ServicesEditModalRef {
  open: (data: ServicesDataType) => void; // Updated to accept data object
  close: () => void;
}

const ServicesEditModal: React.ForwardRefRenderFunction<
  ServicesEditModalRef,
  ServicesEditModalProps
> = ({ title, fetchData }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const accessToken = getToken();
  const [formData, setFormData] = useState<ServicesDataType>({
    id: "",
    name: "",
    type: "",
    image: "",
  });
  const dispatch = useDispatch();
  const EditLoading = useAppSelector((state) => state.globalSlice.editLoading);
  const toast = useToast();

  useImperativeHandle(ref, () => ({
    open: (data: ServicesDataType) => {
      const newObj = {
        // Copy other properties from the original object
        ...data,
        // Map over the images array and extract the base64_url values
        image: data.image?.base64_url,
      };
      onOpen();
      setFormData(newObj);
    },
    close: onClose,
  }));

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleIsUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      type: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formData from servicesEditModal :: ", formData);

    dispatch(setEditLoading(true));
    const res = await centralEdit("createEditDeleteServicesAPI", formData);
    if (res === undefined) {
      return;
    }
    if (res.code === 400) {
      toastFun("Error", res.message || res.data, "error");
      onClose();
    } else if (res.code === 200) {
      toastFun("Success", res.message, "success");
      onClose();
      fetchData();
    }
    dispatch(setEditLoading(false));
  };

  const handleFileChange = (base64Images: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      images: base64Images,
    }));
  };

  // Render modal content
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={{ base: "100%", sm: "90%", md: "40%", lg: "28%" }}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Type</FormLabel>
              <Select
                value={formData.type}
                onChange={(e) => handleIsUserIdChange(e)}
              >
                <option value="multiple_visit">multiple_visit</option>
                <option value="one_visit">one_visit</option>
              </Select>
            </FormControl>

            {formData.image && (
              <Box
                display={"flex"}
                gap={2}
                flexWrap={"wrap"}
                justifyContent={"space-evenly"}
                mt={4}
              >
                <Image
                  src={formData.image}
                  width={200}
                  alt="branches-img"
                  height={150}
                />
              </Box>
            )}

            <MulitpleFilePondUploader onFileChange={handleFileChange} />

            <Button
              isLoading={EditLoading}
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
              Submit
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(ServicesEditModal);
