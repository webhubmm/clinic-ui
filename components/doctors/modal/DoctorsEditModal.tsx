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
import { updateDoctors } from "@/store/slices/doctorsSlice";
import { FaWindowClose } from "react-icons/fa";

interface DoctorsEditModalProps {
  title: string; // Data to be edited
}

export interface DoctorsEditModalRef {
  open: (data: DoctorsDataType) => void; // Updated to accept data object
  close: () => void;
}

const DoctorsEditModal: React.ForwardRefRenderFunction<
  DoctorsEditModalRef,
  DoctorsEditModalProps
> = ({ title }, ref) => {
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
        ...data,
        image: data.image?.url,
        branches: data.branches?.map((item: any) => item.id || item),
        isOldImage: true,
      };

      onOpen();
      setFormData(newObj);
      const outPutNewBranches = data.branches?.map((ele: any) => ele.id || ele);
      const selectedClickedBranches = branchesList.filter(
        (item: any) =>
          outPutNewBranches.includes(item) ||
          outPutNewBranches.includes(item.id)
      );
      setClickedBranchForSelectedBranches(selectedClickedBranches as any);
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
      isOldImage: false,
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
    } else if (res.code === 200) {
      toastFun("Success", res.message, "success");
      dispatch(updateDoctors(res.data));
    }
    onClose();
    dispatch(setEditLoading(false));
  };

  const removeFile = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: null,
    }));
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
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Phone No.</FormLabel>
                  <Input
                    required
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Degree</FormLabel>
                  <Input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Box>
              <Box width={{ base: "100%", md: "50%" }}>
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
                {formData.image && (
                  <Box display={"flex"} justifyContent={"center"} mt={4}>
                    <FaWindowClose
                      className="removeImg"
                      onClick={() => {
                        removeFile();
                      }}
                    />
                    <Image
                      src={formData.image}
                      width={"80%"}
                      alt="services-img"
                      height={"200px"}
                      objectFit={"cover"}
                      objectPosition={"center"}
                    />
                  </Box>
                )}
                <FilePondUploader
                  onFileChange={handleFileChange}
                  formDataImages={formData.image}
                  setFormDataImages={removeFile}
                />
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
