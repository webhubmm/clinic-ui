"use client";
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
  Text,
} from "@chakra-ui/react";
import { getToken } from "@/lib/auth";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { setEditLoading, setPerPage } from "@/store/slices/globalSlice";
import FilePondUploader from "@/components/FilePondUploader/FilePondUploader";
import { centralEdit } from "@/lib/api-central";
import { EditBranches } from "@/lib/branches";
import MulitpleFilePondUploader from "@/components/FilePondUploader/MulitpleFilePondUploader";
import Loading from "@/components/Custom/Loading";
import Image from "next/image";
import { PackagesDataType } from "@/types/packagesDataType";

interface PackagesEditModalProps {
  title: string; // Data to be edited
  fetchData: () => void;
}

export interface PackagesEditModalRef {
  open: (data: PackagesDataType) => void; // Updated to accept data object
  close: () => void;
}

const PackagesEditModal: React.ForwardRefRenderFunction<
  PackagesEditModalRef,
  PackagesEditModalProps
> = ({ title, fetchData }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<PackagesDataType>({
    id: "",
    name: "",
    service_id: "",
    price: "",
    discount_price: "",
    note: "",
    timeline: "",
    image: "",
  });
  const dispatch = useDispatch();
  const EditLoading = useAppSelector((state) => state.globalSlice.editLoading);
  const toast = useToast();
  const servicesList = useAppSelector(
    (state) => state.packagesSlice.servicesDataForPackages
  );
  let perPage = useAppSelector(
    (state) => state.globalSlice.credential.per_page
  );
  useImperativeHandle(ref, () => ({
    open: (data: PackagesDataType) => {
      const newObj = {
        // Copy other properties from the original object
        ...data,
        // Map over the images array and extract the base64_url values
        image: data.image?.base64_url,
      };
      onOpen();
      setFormData(newObj);
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

  const handleIsServicesListChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      service_id: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(setEditLoading(true));
    const res = await centralEdit("createEditDeletePackagesAPI", formData);
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

  const handleFileChange = (base64Image: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      image: base64Image,
    }));
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
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
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
                <Image
                  src={formData.image}
                  width={200}
                  alt="branches-img"
                  height={150}
                />
              </Box>
            )}

            <FilePondUploader onFileChange={handleFileChange} />

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

export default forwardRef(PackagesEditModal);
