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
  Textarea,
} from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import { addTeeth } from "@/store/slices/teethSlice";
import { FAQSDataType } from "@/types/faqsDataType";
import { addFAQS } from "@/store/slices/faqsSlice";

interface FaqsModalProps {
  title: string;
  children?: React.ReactNode;
}

export interface FaqsModalRef {
  open: () => void;
  close: () => void;
}
const TeethCreateModal: React.ForwardRefRenderFunction<
  FaqsModalRef,
  FaqsModalProps
> = ({ title, children }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<FAQSDataType>({
    question: "",
    answer: "",
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
    const questionWords = formData.question.trim();

    dispatch(setCreateLoading(true));
    const validWordCount = questionWords.length < 255;

    if (!validWordCount) {
      toastFun(
        "Error",
        "The question must not exceed 255 characters.",
        "error"
      );
    }

    if (validWordCount) {
      const res = await centralCreate("createEditDeleteFAQSAPI", formData);
      if (res.code === 400) {
        toastFun("Error", res.data, "error");
      }
      if (res.code === 200) {
        toastFun("Success", res.message, "success");
        dispatch(addFAQS(res?.data));
      }
    }

    dispatch(setCreateLoading(false));
    onClose();
    setFormData({
      question: "",
      answer: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
