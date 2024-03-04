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
  Textarea,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { setEditLoading } from "@/store/slices/globalSlice";
import { centralEdit } from "@/lib/api-central";
import { FAQSDataType } from "@/types/faqsDataType";
import { updateFAQS } from "@/store/slices/faqsSlice";

interface EditFaqsModalProps {
  title: string; // Data to be edited
}

export interface EditFaqsModalRef {
  open: (data: FAQSDataType) => void; // Updated to accept data object
  close: (data: any) => void;
}

const FaqsEditModal: React.ForwardRefRenderFunction<
  EditFaqsModalRef,
  EditFaqsModalProps
> = ({ title }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<FAQSDataType>({
    id: "",
    question: "",
    answer: "",
  });
  const dispatch = useDispatch();
  const EditLoading = useAppSelector((state) => state.globalSlice.editLoading);
  const toast = useToast();

  useImperativeHandle(ref, () => ({
    open: (data: FAQSDataType) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setEditLoading(true));
    const res = await centralEdit("createEditDeleteFAQSAPI", formData);
    if (res === undefined) {
      return;
    }
    if (res.code === 400) {
      toastFun("Error", res.message || res.data, "error");
      onClose();
    } else if (res.code === 200) {
      toastFun("Success", res.message, "success");
      dispatch(updateFAQS(res.data));
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
              <FormLabel>Question</FormLabel>
              <Textarea
                name="question"
                required
                value={formData.question}
                onChange={handleInputChange}
                placeholder="Question"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Answer</FormLabel>
              <Textarea
                name="answer"
                required
                value={formData.answer}
                onChange={handleInputChange}
                placeholder="Answer"
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

export default forwardRef(FaqsEditModal);
