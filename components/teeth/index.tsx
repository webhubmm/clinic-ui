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
import {
  TeethManagmentCreateType,
  TeethManagmentType,
} from "@/types/teethDataType";
import CustomModal from "../Custom/CustomModal";
import TeethCreateModal, { MyTeethModalRef } from "./modal/TeethCreateModal";
import { setTeethData } from "@/store/slices/teethSlice";
import TeethEditModal, { TeethEditModalRef } from "./modal/TeethEditModal";
import TeethRestoreModal from "./modal/TeethRestoreModal";
import { setUsersData } from "@/store/slices/userManagementSlice";
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
  const accessToken = getToken();

  const dispatch = useAppDispatch();
  const { credential } = useAppSelector((state) => state.globalSlice);
  const userData = useAppSelector((state) => state.usersSlice.usersData);
  const trash = useAppSelector((state) => state.globalSlice.credential.trash);
  const { total_count, isFetchLoading } = useAppSelector(
    (state) => state.globalSlice
  );

  const toast = useToast();

  // for data fetch
  useEffect(() => {
    FetchGetAllTeeth();
  }, [pagination]);

  useEffect(() => {
    onPaginationChange({ pageSize: 10, pageIndex: 0 });
    dispatch(setSearch(""));
  }, [trash]);

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

  const teethCreateModalRef = useRef<MyTeethModalRef>(null);
  const teethEditModalRef = useRef<TeethEditModalRef>(null);

  //  for handle function

  const handleCreateModal = () => {
    if (teethCreateModalRef.current) {
      teethCreateModalRef.current.open();
    }
  };

  const handleEditModal = (teethManagment: TeethManagmentType) => {
    if (teethEditModalRef.current) {
      teethEditModalRef.current.open({ ...teethManagment, token: accessToken });
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  // start delete
  const handleDelete = (user: TeethManagmentType) => {
    setTeethDataForDelete(user.id);
    onOpen();
  };

  const deleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (teethDataForDelete) {
      const delobj = { id: teethDataForDelete };
      const result = await centralDelete(
        "createEditDeleteTeethManagmentAPI",
        delobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      onClose();
      dispatch(setDeleteLoading(false));
      FetchGetAllTeeth();
    }
  };
  // end delete

  //start force_delete
  const handleForceDelete = (user: TeethManagmentType) => {
    setTeethDataForForceDelete(user.id);
    onForceDeleteOpen();
  };

  const forceDeleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (teethDataForForceDelete) {
      const delobj = { id: teethDataForForceDelete };
      const result = await centralForceDelete(
        "forceDeleteTeethManagmentAPI",
        delobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      onForceDeleteClose();
      dispatch(setDeleteLoading(false));
      FetchGetAllTeeth();
    }
  };
  // end start force delete

  // for start restore
  const handleRestore = (user: TeethManagmentType) => {
    setTeethDataForRestore(user.id);
    onRestoreOpen();
  };

  const restoreComfirmFun = async () => {
    dispatch(setRestoreLoading(true));
    if (teethDataForRestore) {
      const restoreobj = { id: teethDataForRestore };
      const result = await centralRestore(
        "restoreTeethManagmentAPI",
        restoreobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      onRestoreClose();
      dispatch(setRestoreLoading(false));
      FetchGetAllTeeth();
    }
  };

  const FetchGetAllTeeth = async () => {
    const obj = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    };
    dispatch(setFetchLoading(true));
    const result = await centralGetAllLists("getTeethAPI", {
      ...credential,
      ...obj,
    });
    const resultWithChangeDate = changeFormatDateStringArr(result?.data.teeths);

    dispatch(setTeethData(resultWithChangeDate));
    dispatch(setInit(true));
    dispatch(setTotal_count(result?.data.total_count));
    dispatch(setUsersData(resultWithChangeDate));
    dispatch(setFetchLoading(false));
  };

  const columns = useMemo<ColumnDef<TeethManagmentType, React.ReactNode>[]>(
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
        header: "Type_number",
        accessorKey: "type_number",
      },

      {
        header: "Date & Time",
        accessorKey: "updated_at",
      },
      {
        id: "actions",
        cell: ({ row }: CellContext<TeethManagmentType, React.ReactNode>) => (
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
          Teeth Table
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
                FetchGetAllTeeth();
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
              isDisabled={isFetchLoading}
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
              data={userData}
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
        modalText={`Are you sure to Delete User Id ${teethDataForDelete} ?`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        actionFun={deleteComfirmFun}
        actionText={"Delete"}
      />
      <TeethRestoreModal
        modalText={`Are you sure to Restore User Id ${teethDataForRestore} ?`}
        modalTitle={"Restore"}
        isOpen={isRestoreOpen}
        onOpen={onRestoreOpen}
        onClose={onRestoreClose}
        actionFun={restoreComfirmFun}
        actionText={"Restore"}
      />

      <CustomModal
        modalTitle={"Delete Permanent"}
        modalText={`Are you sure to Delete User Id ${teethDataForDelete} permanently?`}
        isOpen={isForceDeleteOpen}
        onOpen={onForceDeleteOpen}
        onClose={onForceDeleteClose}
        actionFun={forceDeleteComfirmFun}
        actionText={"Force Delete"}
      />

      <TeethCreateModal
        ref={teethCreateModalRef}
        title={"Create Teeth"}
        fetchData={FetchGetAllTeeth}
      />
      <TeethEditModal
        ref={teethEditModalRef}
        title={"Edit Teeth"}
        fetchData={FetchGetAllTeeth}
      />
    </Box>
  );
};

export default TeethManagementComponent;
