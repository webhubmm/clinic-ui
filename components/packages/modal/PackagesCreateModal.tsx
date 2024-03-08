import Loading from "@/components/Custom/Loading";
import FilePondUploader from "@/components/FilePondUploader/FilePondUploader";
import MulitpleFilePondUploader from "@/components/FilePondUploader/MultipleFilePondUploader";
import { centralCreate } from "@/lib/api-central";
import { getToken } from "@/lib/auth";
import { useAppSelector } from "@/store/hooks";
import { setCreateLoading, setPerPage } from "@/store/slices/globalSlice";
import { addPackages, updatePackages } from "@/store/slices/packagesSlice";
import { BranchesDataType } from "@/types/branchesDataType";
import { PackagesDataType } from "@/types/packagesDataType";
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
  Text,
  Image,
} from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface PackagesCreateModalProps {
  title: string;
  children?: React.ReactNode;
  fetchData: () => void;
}

export interface PackagesCreateModalRef {
  open: () => void;
  close: () => void;
}

const PackagesCreateModal: React.ForwardRefRenderFunction<
  PackagesCreateModalRef,
  PackagesCreateModalProps
> = ({ title, children, fetchData }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<PackagesDataType>({
    name: "",
    service_id: "",
    price: "",
    discount_price: "",
    note: "",
    timeline: "",
    image: "",
    isOldImage: true,
  });
  const dispatch = useDispatch();
  const createLoading = useAppSelector(
    (state) => state.globalSlice.createLoading
  );
  const servicesList = useAppSelector(
    (state) => state.packagesSlice.servicesDataForPackages
  );
  let perPage = useAppSelector(
    (state) => state.globalSlice.credential.per_page
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
    const res = await centralCreate("createEditDeletePackagesAPI", formData);
    if (res?.code === 400) {
      toastFun("Error", res.data, "error");
    }
    if (res?.code === 200) {
      toastFun("Success", res.message, "success");
    }
    dispatch(setCreateLoading(false));
    dispatch(addPackages(res.data));
    onClose();
    setFormData({
      name: "",
      service_id: "",
      price: "",
      discount_price: "",
      note: "",
      timeline: "",
      image: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleIsServicesListChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      service_id: e.target.value,
    }));
  };

  const removeFile = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: null,
    }));
  };

  const handleFileChange = (base64Image: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      image: base64Image,
      isOldImage: false,
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
              <FormLabel>Price</FormLabel>
              <Input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Discount Price</FormLabel>
              <Input
                type="text"
                name="discount_price"
                value={formData.discount_price}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Note</FormLabel>
              <Input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Timeline</FormLabel>
              <Input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Services</FormLabel>
              {servicesList.length > 0 ? (
                <Box display={"flex"}>
                  <Select
                    placeholder="Select Services"
                    required
                    value={formData.service_id}
                    onChange={(e) => handleIsServicesListChange(e)}
                  >
                    {servicesList.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Select>
                  <Text
                    color={"#185aca"}
                    cursor={"pointer"}
                    width={"35%"}
                    textAlign={"center"}
                    my={"auto"}
                    onClick={() => {
                      dispatch(setPerPage((perPage += 10)));
                    }}
                  >
                    Load more
                  </Text>
                </Box>
              ) : (
                <Loading />
              )}
            </FormControl>

            {formData.image && (
              <Box
                display={"flex"}
                gap={2}
                flexWrap={"wrap"}
                justifyContent={"space-evenly"}
                mt={4}
              >
                <FaWindowClose
                  className="removeImg"
                  onClick={() => {
                    removeFile();
                  }}
                />
                <Image
                  src={formData.image}
                  width={"100%"}
                  alt="packages-img"
                  height={"200px"}
                />
              </Box>
            )}

            <FilePondUploader
              onFileChange={handleFileChange}
              formDataImages={formData.image}
              setFormDataImages={removeFile}
            />

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

export default forwardRef(PackagesCreateModal);
