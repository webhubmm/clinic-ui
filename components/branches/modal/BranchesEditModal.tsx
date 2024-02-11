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
import { BranchesDataType } from "@/types/branchesDataType";
import { centralEdit } from "@/lib/api-central";
import { EditBranches } from "@/lib/branches";
import MulitpleFilePondUploader from "@/components/FilePondUploader/MulitpleFilePondUploader";
import Loading from "@/components/Custom/Loading";
import Image from "next/image";

interface branchesEditModalProps {
  title: string; // Data to be edited
  fetchData: () => void;
}

export interface branchesEditModalRef {
  open: (data: BranchesDataType) => void; // Updated to accept data object
  close: () => void;
}

const UserManagementEditModal: React.ForwardRefRenderFunction<
  branchesEditModalRef,
  branchesEditModalProps
> = ({ title, fetchData }, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const accessToken = getToken();
  const [formData, setFormData] = useState<BranchesDataType>({
    id: "",
    name: "",
    email: "",
    phone: "",
    user_id: "",
    daily_appointment_count: "",
    is_open: "",
    address: "",
    lat: "",
    lng: "",
    open_hour: "",
    close_hour: "",
    images: [],
    // token: accessToken,
  });
  const dispatch = useDispatch();
  const EditLoading = useAppSelector((state) => state.globalSlice.editLoading);
  const staffList = useAppSelector(
    (state) => state.branchesSlice.userDataForBranches
  );
  let perPage = useAppSelector(
    (state) => state.globalSlice.credential.per_page
  );
  const toast = useToast();

  useImperativeHandle(ref, () => ({
    open: (data: BranchesDataType) => {
      const newObj = {
        // Copy other properties from the original object
        ...data,
        // Map over the images array and extract the base64_url values
        images: data.images.map((image: any) => image.base64_url),
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

  const handleIsOpenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      is_open: e.target.value,
    }));
  };

  const handleIsUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      user_id: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setEditLoading(true));
    const res = await centralEdit("createEditDeleteBranchesAPI", formData);
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

  const handleFileChange = (base64Images: string[]) => {
    setFormData((prevData) => ({
      ...prevData,
      images: base64Images,
    }));
  };

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
                    required
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Staff</FormLabel>
                  {staffList.length > 0 ? (
                    <Box display={"flex"}>
                      <Select
                        value={formData.user_id}
                        onChange={(e) => handleIsUserIdChange(e)}
                      >
                        {staffList.map((item) => {
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
                        fontSize={{ base: "13px", md: "15px" }}
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

                <FormControl mt={4}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Is Open?</FormLabel>
                  <Select
                    value={formData.is_open}
                    onChange={(e) => handleIsOpenChange(e)}
                  >
                    <option value="1">Open</option>
                    <option value="0">Close</option>
                  </Select>
                </FormControl>
              </Box>
              <Box width={{ base: "100%", md: "50%" }}>
                <FormControl mt={4}>
                  <FormLabel>Daily Appointment Count</FormLabel>
                  <Input
                    type="text"
                    name="daily_appointment_count"
                    value={formData.daily_appointment_count}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Open Time</FormLabel>
                  <Input
                    type="text"
                    name="open_hour"
                    value={formData.open_hour}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Close Time</FormLabel>
                  <Input
                    type="text"
                    name="close_hour"
                    value={formData.close_hour}
                    onChange={handleInputChange}
                    required
                  />
                </FormControl>

                <Box
                  display={"flex"}
                  gap={2}
                  flexWrap={"wrap"}
                  justifyContent={"space-evenly"}
                  mt={4}
                >
                  {formData.images.map((item: any, index: number) => {
                    return (
                      <Image
                        src={item}
                        key={index}
                        width={150}
                        alt="branches-img"
                        height={100}
                      />
                    );
                  })}
                </Box>

                <MulitpleFilePondUploader onFileChange={handleFileChange} />
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

export default forwardRef(UserManagementEditModal);
