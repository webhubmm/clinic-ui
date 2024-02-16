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
} from "@chakra-ui/react";
import { getToken } from "@/lib/auth";
import { UserManagementType } from "@/types/userManagementType";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { setEditLoading } from "@/store/slices/globalSlice";
import FilePondUploader from "@/components/FilePondUploader/FilePondUploader";
import { centralEdit } from "@/lib/api-central";
import Image from "next/image";
import { TeethManagmentType } from "@/types/teethDataType";

interface TeethEditModalProps {
  title: string; // Data to be edited
  fetchData: () => void;
}

export interface TeethEditModalRef {
  open: (data: TeethManagmentType) => void; // Updated to accept data object
  close: () => void;
}

const TeethManagementEditModal: React.ForwardRefRenderFunction<
  TeethEditModalProps,
  TeethEditModalRef
> = ({ title, fetchData }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const accessToken = getToken();
  const [formData, setFormData] = useState<TeethManagmentType>({
    id: "",
    type: "",
    type_number: "",
    image: "",
    token: accessToken,
  });
  const dispatch = useDispatch();
  const EditLoading = useAppSelector((state) => state.globalSlice.editLoading);
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

  useImperativeHandle(ref, () => ({
    open: (data: TeethManagmentType) => {
      onOpen();
      setFormData(data);
    },
    close: onClose,
  }));
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setEditLoading(true));
    const res = await centralEdit(
      "createEditDeleteTeethManagmentAPI",
      formData
    );
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

  const handleFileChange = (base64Image: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      image: base64Image,
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
              <FormLabel>Type</FormLabel>
              <Input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Type_Number</FormLabel>
              <Input
                type="text"
                name="type_number"
                value={formData.type_number}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            {formData.image && (
              <Box display={"flex"} justifyContent={"center"} mt={4}>
                <Image
                  src={formData.image.base64_url}
                  width={250}
                  alt="branches-img"
                  height={100}
                />
              </Box>
            )}

            <FilePondUploader onFileChange={handleFileChange} />

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

export default forwardRef(TeethManagementEditModal);
