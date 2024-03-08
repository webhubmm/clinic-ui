import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { setEditLoading } from "@/store/slices/globalSlice";
import FilePondUploader from "@/components/FilePondUploader/FilePondUploader";
import { centralEdit } from "@/lib/api-central";
import { Image } from "@chakra-ui/react";
import { updateUser } from "@/store/slices/userManagementSlice";
import { FaWindowClose } from "react-icons/fa";
import { updateTeeth } from "@/store/slices/teethSlice";
import { HolidayManagementDataType } from "@/types/holidayManagementType";
import CustomCalendar from "@/components/Custom/Calendar";

interface EditHolidayManagementModalProps {
  title: string; // Data to be edited
  fetchData: () => void;
}

export interface EditHolidayManagementModalRef {
  open: (data: HolidayManagementDataType) => void; // Updated to accept data object
  close: (data: any) => void;
}

const HolidayManagementEditModal: React.ForwardRefRenderFunction<
  EditHolidayManagementModalRef,
  EditHolidayManagementModalProps
> = ({ title, fetchData }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<HolidayManagementDataType>({
    date: "",
    note: "",
  });
  const dispatch = useDispatch();
  const EditLoading = useAppSelector((state) => state.globalSlice.editLoading);
  const toast = useToast();

  useImperativeHandle(ref, () => ({
    open: (data: HolidayManagementDataType) => {
      onOpen();
      setFormData(data);
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setEditLoading(true));
    const res = await centralEdit(
      "createEditDeleteholidayManagementAPI",
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
      fetchData();
      onClose();
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
