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
import React, {
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
} from "react";
import usePagination from "@/hooks/usePagination";
import { getToken } from "@/lib/auth";
import { badgeColorChange, changeFormatDateStringArr } from "@/utils/changes";
import Loading from "@/components/Custom/Loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setCreateLoading,
  setDeleteLoading,
  setFetchDataStatus,
  setFetchLoading,
  setInit,
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
import CustomModal from "../Custom/CustomModal";
import TeethCreateModal, { MyTeethModalRef } from "./modal/TeethCreateModal";
import { removeTeeth, setTeethData } from "@/store/slices/teethSlice";
import TeethEditModal, { EditTeethModalRef } from "./modal/TeethEditModal";
import RestoreModal from "../Custom/RestoreModal";
import { TeethDataType } from "@/types/teethDataType";
const TeethManagementComponent = () => {
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
  const [teethDataForDelete, setTeethDataForDelete] = useState<string | null>(
    null
  );
  const [teethDataForRestore, setTeethDataForRestore] = useState<string | null>(
    null
  );
  const [teethDataForForceDelete, setTeethDataForForceDelete] = useState<
    string | null
  >(null);
  const dispatch = useAppDispatch();
  const { credential, fetchDataStatus } = useAppSelector(
    (state) => state.globalSlice
  );
  const trash = useAppSelector((state) => state.globalSlice.credential.trash);
  const { teethData } = useAppSelector((state) => state.teethSlice);
  const { total_count, isFetchLoading } = useAppSelector(
    (state) => state.globalSlice
  );
  const toast = useToast();
  const pageCount = total_count
    ? Math.ceil(total_count / pagination.pageSize)
    : 0;

  const FetchGetAllTeethListFun = async () => {
    const obj = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    };
    dispatch(setFetchLoading(true));
    const result = await centralGetAllLists("getTeethAPI", {
      ...credential,
      ...obj,
    });
    dispatch(setTeethData(result?.data.teeths));
    dispatch(setFetchLoading(false));
    dispatch(setTotal_count(result?.data.total_count));
  };

  useEffect(() => {
    if (fetchDataStatus) {
      FetchGetAllTeethListFun();
      dispatch(setFetchDataStatus(false)); // Set the flag to false after fetching data
    }
  }, [pagination.pageIndex, pagination.pageSize, trash, fetchDataStatus]);

  useEffect(() => {
    // Reset the flag to true whenever pagination or trash condition changes
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

  const createTeethModalRef = useRef<MyTeethModalRef>(null);
  const editTeethModalRef = useRef<EditTeethModalRef>(null);

  const handleCreateModal = () => {
    if (createTeethModalRef.current) {
      createTeethModalRef.current.open();
    }
  };

  const handleEditModal = (teeth: TeethDataType) => {
    if (editTeethModalRef.current) {
      editTeethModalRef.current.open({ ...teeth });
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleDelete = (user: TeethDataType) => {
    setTeethDataForDelete(user.id as string);
    onOpen();
  };

  const deleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (teethDataForDelete) {
      const delobj = { id: teethDataForDelete };
      const deleteTeethData = teethData.find((item) => item.id === delobj.id);
      const result = await centralDelete(
        "createEditDeleteTeethManagmentAPI",
        delobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      dispatch(setDeleteLoading(false));
      dispatch(removeTeeth(deleteTeethData as TeethDataType));
      onClose();
    }
  };

  const handleRestore = (user: TeethDataType) => {
    setTeethDataForRestore(user.id as string);
    onRestoreOpen();
  };

  const restoreComfirmFun = async () => {
    dispatch(setRestoreLoading(true));
    if (teethDataForRestore) {
      const restoreobj = { id: teethDataForRestore };
      const restoreTeethData = teethData.find(
        (item) => item.id === restoreobj.id
      );
      const result = await centralRestore(
        "restoreTeethManagmentAPI",
        restoreobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      dispatch(removeTeeth(restoreTeethData as TeethDataType));
      dispatch(setRestoreLoading(false));
      onRestoreClose();
    }
  };

  const handleForceDelete = (user: TeethDataType) => {
    setTeethDataForForceDelete(user.id as string);
    onForceDeleteOpen();
  };

  const forceDeleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (teethDataForForceDelete) {
      const delobj = { id: teethDataForForceDelete };
      const forceDeleteTeethData = teethData.find(
        (item) => item.id === delobj.id
      );
      const result = await centralForceDelete(
        "forceDeleteTeethManagmentAPI",
        delobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      onForceDeleteClose();
      dispatch(removeTeeth(forceDeleteTeethData as TeethDataType));
      dispatch(setDeleteLoading(false));
    }
  };

  const columns = useMemo<ColumnDef<TeethDataType, React.ReactNode>[]>(
    () => [
      {
        header: "Id",
        accessorKey: "id",
      },
      {
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Type Number",
        accessorKey: "type_number",
      },

      {
        id: "actions",
        cell: ({ row }: CellContext<TeethDataType, React.ReactNode>) => (
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
          Teeth
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
                FetchGetAllTeethListFun();
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
              data={teethData}
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
        modalText={`Are you sure to Delete Teeth Id ${teethDataForDelete} ?`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        actionFun={deleteComfirmFun}
        actionText={"Delete"}
      />
      <RestoreModal
        modalText={`Are you sure to Restore Teeth Id ${teethDataForRestore} ?`}
        modalTitle={"Restore"}
        isOpen={isRestoreOpen}
        onOpen={onRestoreOpen}
        onClose={onRestoreClose}
        actionFun={restoreComfirmFun}
        actionText={"Restore"}
      />
      <CustomModal
        modalTitle={"Delete Permanent"}
        modalText={`Are you sure to Delete Teeth Id ${teethDataForDelete} permanently?`}
        isOpen={isForceDeleteOpen}
        onOpen={onForceDeleteOpen}
        onClose={onForceDeleteClose}
        actionFun={forceDeleteComfirmFun}
        actionText={"Force Delete"}
      />
      <TeethCreateModal ref={createTeethModalRef} title={"Create Teeth"} />
      <TeethEditModal ref={editTeethModalRef} title={"Edit Teeth"} />
    </Box>
  );
};

export default TeethManagementComponent;
