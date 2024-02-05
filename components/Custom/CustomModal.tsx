"use client";
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

interface CustomModalType {
  modalTitle: string;
  modalText?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  actionFun?: () => void;
  actionText?: string;
  children?: React.ReactNode;
}

const CustomModal = ({
  modalTitle,
  modalText,
  isOpen,
  onOpen,
  onClose,
  actionFun,
  actionText,
}: CustomModalType) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="solid"
              onClick={actionFun}
              sx={{
                bgColor: "#EE5D50",
                color: "white",
                transitionDuration: "500ms",
                _hover: {
                  bgColor: "#E31A1A",
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

export default CustomModal;
