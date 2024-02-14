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
import { HolidayManagmentCreateType, HolidayManagmentType } from "@/types/holidayDataType";

interface HolidayEditModalProps {
  title: string; // Data to be edited
  fetchData: () => void;
}

export interface HolidayEditModalRef {
  open: (data: HolidayManagmentCreateType) => void; // Updated to accept data object
  close: () => void;
}

const HolidayManagementEditModal: React.ForwardRefRenderFunction<
  HolidayEditModalProps,
  HolidayEditModalRef
> = ({ title, fetchData }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const accessToken = getToken();
  const [formData, setFormData] = useState<HolidayManagmentCreateType>({
    data:'',
    note:'',
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
    open: (data: HolidayManagmentType) => {
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
    const res = await centralEdit("createEditDeleteHolidayManagmentAPI", formData);
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
              <FormLabel>Holiday_Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Holiday</FormLabel>
              <Input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                required
              />
            </FormControl>
           

           

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

export default forwardRef(HolidayManagementEditModal);