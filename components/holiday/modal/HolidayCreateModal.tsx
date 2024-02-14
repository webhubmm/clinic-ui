import FilePondUploader from "@/components/FilePondUploader/FilePondUploader";
import { centralCreate } from "@/lib/api-central";
import usePagination from "@/hooks/usePagination";
import { getToken } from "@/lib/auth";
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
} from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { HolidayManagmentCreateType } from "@/types/holidayDataType";

interface MyModalProps {
  title: string;
  children?: React.ReactNode;
  fetchData: () => void;
}

export interface MyHolidayModalRef {
  open: () => void;
  close: () => void;
}
const HolidayCreateModal: React.ForwardRefRenderFunction<
  MyHolidayModalRef,
  MyModalProps> = ({ title, children, fetchData }, ref) => {
  const accessToken = getToken();
  const { isOpen, onOpen ,onClose} =useDisclosure();
    const [formData, setFormData] = useState<HolidayManagmentCreateType>({
     date:"",
    note:"",
    token: accessToken,
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
    dispatch(setCreateLoading(true));
    e.preventDefault();
    const res = await centralCreate("createEditDeleteHolidayManagmentAPI", formData);
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
        date:"",
        note:"",
      token: accessToken,
    });
  };

  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
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
              <FormLabel>Holiday_Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Holiday</FormLabel>
              <Input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
              />
            </FormControl>
          
          
            {/* <FilePondUploader onFileChange={handleFileChange} /> */}

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
  )
}

export default forwardRef(HolidayCreateModal)