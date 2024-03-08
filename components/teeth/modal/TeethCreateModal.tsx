import FilePondUploader from "@/components/FilePondUploader/FilePondUploader";
import { centralCreate } from "@/lib/api-central";
import { useAppSelector } from "@/store/hooks";
import { setCreateLoading } from "@/store/slices/globalSlice";
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
  Image,
} from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { TeethDataType } from "@/types/teethDataType";
import { FaWindowClose } from "react-icons/fa";
import { addTeeth } from "@/store/slices/teethSlice";

interface MyTeethModalProps {
  title: string;
  children?: React.ReactNode;
}

export interface MyTeethModalRef {
  open: () => void;
  close: () => void;
}
const TeethCreateModal: React.ForwardRefRenderFunction<
  MyTeethModalRef,
  MyTeethModalProps
> = ({ title, children }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<TeethDataType>({
    type: "",
    type_number: "",
    image: "",
    isOldImage: true,
  });

  const dispatch = useDispatch();

  const createLoading = useAppSelector(
    (state) => state.globalSlice.createLoading
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

  // for all handle function
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    dispatch(setCreateLoading(true));
    const res = await centralCreate(
      "createEditDeleteTeethManagmentAPI",
      formData
    );
    if (res.code === 400) {
      toastFun("Error", res.data, "error");
    }
    if (res.code === 200) {
      toastFun("Success", res.message, "success");
    }
    dispatch(setCreateLoading(false));
    dispatch(addTeeth(res?.data));
    onClose();
    setFormData({
      type: "",
      type_number: "",
      image: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (base64Image: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      image: base64Image,
      isOldImage: false,
    }));
  };

  const removeFile = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: null,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={{ base: "100%", sm: "90%", md: "40%", lg: "28%" }}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <Input
                type="text"
                name="type"
                required
                value={formData.type}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Type_Number</FormLabel>
              <Input
                required
                type="text"
                name="type_number"
                value={formData.type_number}
                onChange={handleInputChange}
              />
            </FormControl>

            {formData.image && (
              <Box
                display={"flex"}
                gap={2}
                flexWrap={"wrap"}
                justifyContent={"space-evenly"}
                mt={4}
              >
                <FaWindowClose
                  className="removeImg"
                  onClick={() => {
                    removeFile();
                  }}
                />
                <Image
                  src={formData.image}
                  width={"100%"}
                  alt="services-img"
                  height={"200px"}
                />
              </Box>
            )}

            <FilePondUploader
              onFileChange={handleFileChange}
              formDataImages={formData.image}
              setFormDataImages={removeFile}
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
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(TeethCreateModal);
