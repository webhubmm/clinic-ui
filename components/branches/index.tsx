"use client";
import CustomTable from "@/components/Table/Table";
import { UserManagementType } from "@/types/userManagementType";
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
import CustomModal from "@/components/Custom/CustomModal";
import RestoreModal from "@/components/Custom/RestoreModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchUserData,
  setDeleteLoading,
  setFetchLoading,
  setInit,
  setRestoreLoading,
  setSearch,
  setTotal_count,
  setTrash,
  setUserData,
} from "@/store/slices/globalSlice";
import BranchesCreateModal, {
  BranchesCreateModalRef,
} from "./modal/BranchesCreateModal";
import {
  centralDelete,
  centralForceDelete,
  centralGetAllLists,
  centralRestore,
} from "@/lib/api-central";
import { BranchesDataType } from "@/types/branchesDataType";
import { setBranchesData } from "@/store/slices/branchesSlice";
import BranchesEditModal, {
  BranchesEditModalRef,
} from "./modal/BranchesEditModal";
import {
  badgeColorChangeForIsOpenOrClosed,
  changeFormatDateStringArr,
} from "@/utils/changes";
import Loading from "../Custom/Loading";
import { getToken } from "@/lib/auth";

const BranchesComponent = () => {
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
  const [branchesDataForDelete, setBranchesDataForDelete] = useState<
    string | null
  >(null);
  const [branchesDataForRestore, setBranchesDataForRestore] = useState<
    string | null
  >(null);
  const [branchesDataForForceDelete, setBranchesDataForForceDelete] = useState<
    string | null
  >(null);
  const accessToken = getToken();
  const dispatch = useAppDispatch();
  const { credential } = useAppSelector((state) => state.globalSlice);
  const branchesData = useAppSelector(
    (state) => state.branchesSlice.branchesData
  );
  const trash = useAppSelector((state) => state.globalSlice.credential.trash);
  const { total_count, isFetchLoading } = useAppSelector(
    (state) => state.globalSlice
  );
  const perPage = useAppSelector(
    (state) => state.globalSlice.credential.per_page
  );
  const toast = useToast();

  const FetchGetAllBranches = async () => {
    const obj = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    };
    dispatch(setFetchLoading(true));
    const result = await centralGetAllLists("getBranchesAPI", {
      ...credential,
      ...obj,
    });
    dispatch(setBranchesData(result?.data.branches));
    dispatch(setFetchLoading(false));
    dispatch(setTotal_count(result.data.total_count));
  };

  useEffect(() => {
    if (!isFetchLoading) {
      FetchGetAllBranches();
    }
  }, [pagination]);

  useEffect(() => {
    dispatch(
      fetchUserData({
        page: 1,
        per_page: perPage,
        search: "staff",
        trash: false,
      })
    );
  }, [perPage]);

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

  const branchesCreateModalRef = useRef<BranchesCreateModalRef>(null);
  const branchesEditModalRef = useRef<BranchesEditModalRef>(null);

  const handleCreateModal = () => {
    if (branchesCreateModalRef.current) {
      branchesCreateModalRef.current.open();
    }
  };

  const handleEditModal = (branchesEdit: BranchesDataType) => {
    if (branchesEditModalRef.current) {
      branchesEditModalRef.current.open({
        ...branchesEdit,
      });
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleDelete = (branches: BranchesDataType) => {
    setBranchesDataForDelete(branches.id as string);
    onOpen();
  };

  const deleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (branchesDataForDelete) {
      const delobj = { id: branchesDataForDelete };
      const result = await centralDelete("createEditDeleteBranchesAPI", delobj);
      if (result.code === 200) toastFun("Success", result.message, "success");
      if (result.status === 400) toastFun("Error", result.message, "error");
      onClose();
      dispatch(setDeleteLoading(false));
      FetchGetAllBranches();
    }
  };

  const handleRestore = (branches: BranchesDataType) => {
    setBranchesDataForRestore(branches.id as string);
    onRestoreOpen();
  };

  const restoreComfirmFun = async () => {
    dispatch(setRestoreLoading(true));
    if (branchesDataForRestore) {
      const restoreobj = { id: branchesDataForRestore };
      const result = await centralRestore("restoreBranchesAPI", restoreobj);
      if (result?.code === 200) toastFun("Success", result.message, "success");
      if (result?.status === 400) toastFun("Error", result.message, "error");
      onRestoreClose();
      dispatch(setRestoreLoading(false));
      FetchGetAllBranches();
    }
  };

  const handleForceDelete = (branches: BranchesDataType) => {
    setBranchesDataForForceDelete(branches.id as string);
    onForceDeleteOpen();
  };

  const forceDeleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (branchesDataForForceDelete) {
      const delobj = { id: branchesDataForForceDelete };
      const result = await centralForceDelete("forceDeleteBranchesAPI", delobj);
      if (result.code === 200) toastFun("Success", result.message, "success");
      if (result.status === 400) toastFun("Error", result.message, "error");
      onForceDeleteClose();
      dispatch(setDeleteLoading(false));
      FetchGetAllBranches();
    }
  };

  const columns = useMemo<ColumnDef<BranchesDataType, React.ReactNode>[]>(
    () => [
      {
        header: "Id",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Address",
        accessorKey: "address",
      },
      {
        header: "Open Time",
        accessorKey: "open_hour",
      },
      {
        header: "Close Time",
        accessorKey: "close_hour",
      },
      {
        header: "Is Open?",
        accessorKey: "is_open",
        cell: ({ row }: CellContext<BranchesDataType, React.ReactNode>) => (
          <Badge
            bg={badgeColorChangeForIsOpenOrClosed(row.original.is_open)}
            px={4}
            py={2}
            borderRadius={4}
            width={"100%"}
            textAlign={"center"}
            fontSize="0.9em"
            variant="solid"
          >
            {row.original.is_open === "1" ? "Open" : "Close"}
          </Badge>
        ),
      },
      {
        id: "actions",
        cell: ({ row }: CellContext<BranchesDataType, React.ReactNode>) => (
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
          Branches
        </Text>
        <Box display={{ base: "block", md: "flex" }} mt={3}>
          <Box
            display={"flex"}
            width={{ base: "100%", sm: "75%", md: "70%", lg: "45%", xl: "40%" }}
            mb={{ base: 4, md: 0 }}
          >
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
                FetchGetAllBranches();
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
                fontSize={{ base: "13px", md: "15px" }}
              >
                Trash List
              </Button>
            )}

            <Button
              isDisabled={isFetchLoading}
              colorScheme={"blue"}
              ml={4}
              onClick={handleCreateModal}
              fontSize={{ base: "13px", md: "15px" }}
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
              data={branchesData}
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
        modalText={`Are you sure to Delete User Id ${branchesDataForDelete} ?`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        actionFun={deleteComfirmFun}
        actionText={"Delete"}
      />
      <RestoreModal
        modalText={`Are you sure to Restore User Id ${branchesDataForRestore} ?`}
        modalTitle={"Restore"}
        isOpen={isRestoreOpen}
        onOpen={onRestoreOpen}
        onClose={onRestoreClose}
        actionFun={restoreComfirmFun}
        actionText={"Restore"}
      />
      <CustomModal
        modalTitle={"Delete Permanent"}
        modalText={`Are you sure to Delete User Id ${branchesDataForForceDelete} permanently?`}
        isOpen={isForceDeleteOpen}
        onOpen={onForceDeleteOpen}
        onClose={onForceDeleteClose}
        actionFun={forceDeleteComfirmFun}
        actionText={"Force Delete"}
      />
      <BranchesCreateModal
        ref={branchesCreateModalRef}
        title={"Create Branches"}
        fetchData={FetchGetAllBranches}
      />
      <BranchesEditModal
        ref={branchesEditModalRef}
        title={"Edit Branches"}
        fetchData={FetchGetAllBranches}
      />
    </Box>
  );
};

export default BranchesComponent;
