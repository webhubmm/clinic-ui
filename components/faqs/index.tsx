"use client";
import CustomTable from "@/components/Table/Table";
import {
  Badge,
  Box,
  Button,
  Flex,
  Input,
  TableContainer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import {
  FaRegTrashAlt,
  FaRegEdit,
  FaTrashRestore,
  FaSistrix,
  FaAngleDoubleLeft,
  FaTrash,
} from "react-icons/fa";
import React, { useEffect, useMemo, useRef, useState } from "react";
import usePagination from "@/hooks/usePagination";
import Loading from "@/components/Custom/Loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setDeleteLoading,
  setFetchDataStatus,
  setFetchLoading,
  setRestoreLoading,
  setSearch,
  setTotal_count,
  setTrash,
} from "@/store/slices/globalSlice";
import {
  centralDelete,
  centralForceDelete,
  centralGetAllLists,
  centralRestore,
} from "@/lib/api-central";
import { FAQSDataType } from "@/types/faqsDataType";
import { removeFAQS, setFAQSData } from "@/store/slices/faqsSlice";
import TruncatedText from "../Custom/TruncatedText";
import FaqsCreateModal, { FaqsModalRef } from "./modal/FaqsCreateModal";
import FaqsEditModal, { EditFaqsModalRef } from "./modal/FaqsEditModal";
import CustomModal from "../Custom/CustomModal";
import RestoreModal from "../Custom/RestoreModal";

const FAQSComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRestoreOpen,
    onOpen: onRestoreOpen,
    onClose: onRestoreClose,
  } = useDisclosure();
  const {
    isOpen: isForceDeleteOpen,
    onOpen: onForceDeleteOpen,
    onClose: onForceDeleteClose,
  } = useDisclosure();
  const { onPaginationChange, pagination } = usePagination();
  const [faqsDataForDelete, setFaqsDataForDelete] = useState<string | null>(
    null
  );
  const [faqsDataForRestore, setFaqsDataForRestore] = useState<string | null>(
    null
  );
  const [faqsDataForForceDelete, setFaqsDataForForceDelete] = useState<
    string | null
  >(null);
  const dispatch = useAppDispatch();
  const { credential, fetchDataStatus } = useAppSelector(
    (state) => state.globalSlice
  );
  const trash = useAppSelector((state) => state.globalSlice.credential.trash);
  const { total_count, isFetchLoading } = useAppSelector(
    (state) => state.globalSlice
  );
  const { faqsData } = useAppSelector((state) => state.faqsSlice);
  const toast = useToast();

  const FetchGetAllFaqsListFun = async () => {
    const obj = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    };
    dispatch(setFetchLoading(true));
    const result = await centralGetAllLists("getFAQSAPI", {
      ...credential,
      ...obj,
    });

    dispatch(setFAQSData(result?.data.faq));
    dispatch(setFetchLoading(false));
    dispatch(setTotal_count(result?.data.total_count));
  };

  useEffect(() => {
    if (fetchDataStatus) {
      FetchGetAllFaqsListFun();
      dispatch(setFetchDataStatus(false));
    }
  }, [pagination.pageIndex, pagination.pageSize, trash, fetchDataStatus]);

  useEffect(() => {
    dispatch(setFetchDataStatus(true));
  }, [pagination.pageIndex, pagination.pageSize, trash]);

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

  const pageCount = total_count
    ? Math.ceil(total_count / pagination.pageSize)
    : 0;

  const faqsCreateModalRef = useRef<FaqsModalRef>(null);
  const faqsEditModalRef = useRef<EditFaqsModalRef>(null);

  const handleCreateModal = () => {
    if (faqsCreateModalRef.current) {
      faqsCreateModalRef.current.open();
    }
  };

  const handleEditModal = (faqs: FAQSDataType) => {
    if (faqsEditModalRef.current) {
      faqsEditModalRef.current.open({ ...faqs });
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleDelete = (faqs: FAQSDataType) => {
    setFaqsDataForDelete(faqs.id as string);
    onOpen();
  };

  const deleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (faqsDataForDelete) {
      const delobj = { id: faqsDataForDelete };
      const deleteDoctorData = faqsData.find((item) => item.id === delobj.id);
      const result = await centralDelete("createEditDeleteFAQSAPI", delobj);
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      dispatch(removeFAQS(deleteDoctorData as FAQSDataType));
      dispatch(setDeleteLoading(false));
      onClose();
    }
  };

  const handleRestore = (faqs: FAQSDataType) => {
    setFaqsDataForRestore(faqs.id as string);
    onRestoreOpen();
  };

  const restoreComfirmFun = async () => {
    dispatch(setRestoreLoading(true));
    if (faqsDataForRestore) {
      const restoreobj = { id: faqsDataForRestore };
      const restoreeUserData = faqsData.find(
        (item) => item.id === restoreobj.id
      );
      const result = await centralRestore("restoreFAQSAPI", restoreobj);
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      dispatch(removeFAQS(restoreeUserData as FAQSDataType));
      dispatch(setRestoreLoading(false));
      onRestoreClose();
    }
  };

  const handleForceDelete = (faqs: FAQSDataType) => {
    setFaqsDataForForceDelete(faqs.id as string);
    onForceDeleteOpen();
  };

  const forceDeleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (faqsDataForForceDelete) {
      const delobj = { id: faqsDataForForceDelete };
      const forceDeleteDoctorData = faqsData.find(
        (item) => item.id === delobj.id
      );
      const result = await centralForceDelete("forceDeleteFAQSAPI", delobj);
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      dispatch(removeFAQS(forceDeleteDoctorData as FAQSDataType));
      dispatch(setDeleteLoading(false));
      onForceDeleteClose();
    }
  };

  const columns = useMemo<ColumnDef<FAQSDataType, React.ReactNode>[]>(
    () => [
      {
        header: "Id",
        accessorKey: "id",
      },
      {
        header: "Question",
        accessorKey: "question",
        cell: ({ row }: CellContext<FAQSDataType, React.ReactNode>) => (
          <Box width={"400px"}>
            <TruncatedText text={row.original.question} />
          </Box>
        ),
      },
      {
        header: "Answer",
        accessorKey: "answer",
        cell: ({ row }: CellContext<FAQSDataType, React.ReactNode>) => (
          <Box width={"400px"}>
            <TruncatedText text={row.original.answer} />
          </Box>
        ),
      },

      {
        id: "actions",
        cell: ({ row }: CellContext<FAQSDataType, React.ReactNode>) => (
          <>
            {trash ? (
              <Flex gap={3}>
                <Button
                  onClick={() => {
                    handleRestore(row.original);
                  }}
                  sx={{
                    bgColor: "#5c90e9",
                    transitionDuration: "500ms",
                    color: "white",
                    _hover: {
                      bgColor: "#185aca",
                    },
                  }}
                >
                  <FaTrashRestore />
                </Button>
                <Button
                  onClick={() => handleForceDelete(row.original)}
                  sx={{
                    bgColor: "#EE5D50",
                    color: "white",
                    transitionDuration: "500ms",
                    _hover: {
                      bgColor: "#E31A1A",
                    },
                  }}
                >
                  <FaTrash />
                </Button>
              </Flex>
            ) : (
              <Flex gap={3}>
                <Button
                  onClick={() => {
                    handleEditModal(row.original);
                  }}
                  sx={{
                    bgColor: "#5c90e9",
                    transitionDuration: "500ms",
                    color: "white",
                    _hover: {
                      bgColor: "#185aca",
                    },
                  }}
                >
                  <FaRegEdit />
                </Button>
                <Button
                  onClick={() => handleDelete(row.original)}
                  sx={{
                    bgColor: "#EE5D50",
                    color: "white",
                    transitionDuration: "500ms",
                    _hover: {
                      bgColor: "#E31A1A",
                    },
                  }}
                >
                  <FaRegTrashAlt />
                </Button>
              </Flex>
            )}
          </>
        ),
      },
    ],
    [trash]
  );

  return (
    <Box mb={5}>
      <Box>
        <Text fontSize={"30px"} fontWeight={"bold"}>
          FAQS
        </Text>
        <Box display={"flex"} mt={3}>
          <Box display={"flex"} width={{ base: "90%", md: "50%", lg: "35%" }}>
            <Input
              variant="outline"
              placeholder="Search"
              onChange={handleChangeSearch}
            />
            <Button
              isDisabled={isFetchLoading}
              ml={1}
              sx={{
                bgColor: "#5c90e9",
                transitionDuration: "500ms",
                color: "white",
                _hover: {
                  bgColor: "#185aca",
                },
              }}
              onClick={() => {
                FetchGetAllFaqsListFun();
              }}
            >
              <FaSistrix />
            </Button>
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
            {trash ? (
              <Button
                isDisabled={isFetchLoading}
                sx={{
                  bgColor: "#5c90e9",
                  transitionDuration: "500ms",
                  color: "white",
                  _hover: {
                    bgColor: "#185aca",
                  },
                }}
                onClick={() => {
                  dispatch(setTrash(false));
                }}
              >
                <FaAngleDoubleLeft />
              </Button>
            ) : (
              <Button
                isDisabled={isFetchLoading}
                colorScheme={"red"}
                onClick={() => {
                  dispatch(setTrash(true));
                }}
              >
                Trash List
              </Button>
            )}

            <Button
              colorScheme={"blue"}
              isDisabled={isFetchLoading || trash}
              ml={4}
              onClick={handleCreateModal}
              sx={{
                bgColor: "#5c90e9",
                transitionDuration: "500ms",
                color: "white",
                _hover: {
                  bgColor: "#185aca",
                },
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
        {isFetchLoading ? (
          <Loading />
        ) : (
          <TableContainer>
            <CustomTable
              data={faqsData}
              columns={columns}
              pagination={pagination}
              onPaginationChange={onPaginationChange}
              pageCount={pageCount}
            />
          </TableContainer>
        )}
      </Box>

      <CustomModal
        modalTitle={"Delete"}
        modalText={`Are you sure to Delete User Id ${faqsDataForDelete} ?`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        actionFun={deleteComfirmFun}
        actionText={"Delete"}
      />
      <RestoreModal
        modalText={`Are you sure to Restore User Id ${faqsDataForRestore} ?`}
        modalTitle={"Restore"}
        isOpen={isRestoreOpen}
        onOpen={onRestoreOpen}
        onClose={onRestoreClose}
        actionFun={restoreComfirmFun}
        actionText={"Restore"}
      />
      <CustomModal
        modalTitle={"Delete Permanent"}
        modalText={`Are you sure to Delete User Id ${faqsDataForDelete} permanently?`}
        isOpen={isForceDeleteOpen}
        onOpen={onForceDeleteOpen}
        onClose={onForceDeleteClose}
        actionFun={forceDeleteComfirmFun}
        actionText={"Force Delete"}
      />

      <FaqsCreateModal ref={faqsCreateModalRef} title={"Create FAQS"} />
      <FaqsEditModal ref={faqsEditModalRef} title={"Edit FAQS"} />
    </Box>
  );
};

export default FAQSComponent;
