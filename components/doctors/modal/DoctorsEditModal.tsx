"use client";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Image } from "@chakra-ui/react";
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
  useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/hooks";
import { setEditLoading, setPerPage } from "@/store/slices/globalSlice";
import FilePondUploader from "@/components/FilePondUploader/FilePondUploader";
import { centralEdit } from "@/lib/api-central";
import makeAnimated from "react-select/animated";
import Loading from "@/components/Custom/Loading";
import { DoctorsDataType } from "@/types/doctorsDataType";

interface DoctorsEditModalProps {
  title: string; // Data to be edited
  fetchData: () => void;
}

export interface DoctorsEditModalRef {
  open: (data: DoctorsDataType) => void; // Updated to accept data object
  close: () => void;
}

const DoctorsEditModal: React.ForwardRefRenderFunction<
  DoctorsEditModalRef,
  DoctorsEditModalProps
> = ({ title, fetchData }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [
    clickedBranchForSelectedBranches,
    setClickedBranchForSelectedBranches,
  ] = useState([]);
  const [formData, setFormData] = useState<DoctorsDataType>({
    name: "",
    email: "",
    phone: "",
    degree: "",
    specialize: "",
    branches: [],
    address: "",
    image: "",
  });
  const dispatch = useDispatch();
  const EditLoading = useAppSelector((state) => state.globalSlice.editLoading);
  const animatedComponents = makeAnimated();
  let perPage = useAppSelector(
    (state) => state.globalSlice.credential.per_page
  );
  const branchesList = useAppSelector(
    (state) => state.branchesSlice.branchesData
  );
  const toast = useToast();

  useImperativeHandle(ref, () => ({
    open: (data: DoctorsDataType) => {
      const newObj = {
        // Copy other properties from the original object
        ...data,
        // Map over the images array and extract the base64_url values
        image: data.image?.base64_url,
        branches: data.branches?.map((item: any) => item.id),
      };
      onOpen();
      setFormData(newObj);

      const changeClickedBranches = data.branches;
      setClickedBranchForSelectedBranches(changeClickedBranches as any);
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

  const handleFileChange = (base64Image: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      image: base64Image,
    }));
  };

  const handleBranchesChange = (selectedOptions: any) => {
    const selectedBranches = selectedOptions.map((item: any) => item.value);
    setFormData((prevData) => ({
      ...prevData,
      branches: selectedBranches,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setEditLoading(true));
    const res = await centralEdit("createEditDeleteDoctorsAPI", formData);
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

  const selectedBranches = clickedBranchForSelectedBranches.map((item: any) => {
    const branch = branchesList.find((branch) => branch.id === item.id);
    return { value: branch?.id, label: branch?.name };
  });

  // Render modal content
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        minW={{ base: "100%", sm: "90%", md: "90%", lg: "80%", xl: "60%" }}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box display={{ base: "block ", md: "flex" }} gap={5}>
              <Box width={{ base: "100%", md: "50%" }}>
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
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
              <Box width={{ base: "100%", md: "50%" }}>
                <FormControl mt={4}>
                  <FormLabel>Degree</FormLabel>
                  <Input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Specialize</FormLabel>
                  <Input
                    type="text"
                    name="specialize"
                    value={formData.specialize}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Branches</FormLabel>
                  {branchesList.length > 0 && selectedBranches ? (
                    <Box display={"flex"}>
                      <Select
                        className="multiSelect"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        onChange={(branchesList) =>
                          handleBranchesChange(branchesList)
                        }
                        defaultValue={selectedBranches}
                        isMulti
                        options={branchesList.map((item) => ({
                          value: item.id,
                          label: item.name,
                        }))}
                      />
                      <Text
                        color={"#185aca"}
                        cursor={"pointer"}
                        width={"20%"}
                        textAlign={"center"}
                        fontSize={{ base: "12px", md: "13px" }}
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
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  mt={4}
                >
                  <Image
                    src={formData.image}
                    width={"80%"}
                    alt="branches-img"
                    height={"200px"}
                  />
                </Box>
                <FilePondUploader onFileChange={handleFileChange} />
              </Box>
            </Box>

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

export default forwardRef(DoctorsEditModal);
