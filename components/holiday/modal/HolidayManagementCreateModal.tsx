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
import { FaWindowClose } from "react-icons/fa";
import { HolidayManagementDataType } from "@/types/holidayManagementType";
import CustomCalendar from "@/components/Custom/Calendar";
import { addHolidayManagement } from "@/store/slices/holidayManagementSlice";

interface HolidayManagementModalProps {
  title: string;
  children?: React.ReactNode;
}

export interface HolidayManagementModalRef {
  open: () => void;
  close: () => void;
}
const HolidayManagementCreateModal: React.ForwardRefRenderFunction<
  HolidayManagementModalRef,
  HolidayManagementModalProps
> = ({ title, children }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<HolidayManagementDataType>({
    date: "",
    note: "",
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
    if (formData.date.length > 0) {
      const res = await centralCreate(
        "createEditDeleteholidayManagementAPI",
        formData
      );
      if (res.code === 400) {
        toastFun("Error", res.data, "error");
      }
      if (res.code === 200) {
        toastFun("Success", res.message, "success");
      }
      dispatch(setCreateLoading(false));
      dispatch(addHolidayManagement(res?.data));
      onClose();
      setFormData({
        date: "",
        note: "",
      });
    } else {
      toastFun("Error", "Please select date !!!", "error");
      onClose();
      setFormData({
        date: "",
        note: "",
      });
    }
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
              <FormLabel>Date</FormLabel>
              <CustomCalendar formData={formData} setFormData={setFormData} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Note</FormLabel>
              <Input
                required
                type="text"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
              />
            </FormControl>

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

export default forwardRef(HolidayManagementCreateModal);
