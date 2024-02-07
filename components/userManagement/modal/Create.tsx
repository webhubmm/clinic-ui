import FilePondUploader from "@/components/FilePondUploader/FilePondUloader";
import { getToken } from "@/lib/auth";
import { CreateUser } from "@/lib/userManagement";
import { useAppSelector } from "@/store/hooks";
import { setCreateLoading } from "@/store/slices/globalSlice";
import { UserManagementCreateType } from "@/types/userManagementType";
import { getBase64 } from "@/utils/changes";
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

interface MyModalProps {
  title: string;
  children?: React.ReactNode;
  fetchData: () => void;
}

export interface MyModalRef {
  open: () => void;
  close: () => void;
}

const UserManagementCreateModal: React.ForwardRefRenderFunction<
  MyModalRef,
  MyModalProps
> = ({ title, children, fetchData }, ref) => {
  const accessToken = getToken();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<UserManagementCreateType>({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    role: "",
    image: "",
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

  const handleSubmit = async (e: any) => {
    dispatch(setCreateLoading(true));
    e.preventDefault();
    const res = await CreateUser(formData);
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
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      role: "",
      image: "",
      token: accessToken,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      role: e.target.value,
    }));
  };

  const handleFileChange = (base64Image: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      image: base64Image,
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
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Phone No.</FormLabel>
              <Input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Select
                value={formData.role}
                onChange={(e) => handleRoleChange(e)}
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="user">User</option>
              </Select>
            </FormControl>
            <FilePondUploader onFileChange={handleFileChange} />

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

export default forwardRef(UserManagementCreateModal);
