"use client";
import { useAppSelector } from "@/store/hooks";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface RestoreModalType {
  modalTitle: string;
  modalText?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  actionFun?: () => void;
  actionText?: string;
  children?: React.ReactNode;
}

const RestoreModal = ({
  modalTitle,
  modalText,
  isOpen,
  onOpen,
  onClose,
  actionFun,
  actionText,
}: RestoreModalType) => {
  const restoreLoading = useAppSelector(
    (state) => state.globalSlice.restoreLoading
  );
  return (
    <>
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={{ base: "95%", sm: "90%", md: "50%", lg: "40%" }}>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={{ base: "15px", sm: "18px", md: "21px" }}>
              {modalText}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={3}
              onClick={onClose}
              variant={"solid"}
              sx={{
                bgColor: "#5c90e9",
                transitionDuration: "500ms",
                color: "white",
                _hover: {
                  bgColor: "#185aca",
                },
              }}
            >
              Close
            </Button>
            <Button
              isLoading={restoreLoading}
              variant="solid"
              onClick={actionFun}
              sx={{
                bgColor: "#2ce04d",
                color: "white",
                transitionDuration: "500ms",
                _hover: {
                  bgColor: "#009911",
                },
              }}
            >
              {actionText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RestoreModal;
