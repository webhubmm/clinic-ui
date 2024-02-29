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
import { getToken } from "@/lib/auth";
import { badgeColorChange, changeFormatDateStringArr } from "@/utils/changes";
import Loading from "@/components/Custom/Loading";
import UserManagementCreateModal, {
  MyModalRef,
} from "@/components/userManagement/modal/Create";
import UserManagementEditModal, {
  EditModalRef,
} from "@/components/userManagement/modal/Edit";
import CustomModal from "@/components/Custom/CustomModal";
import RestoreModal from "@/components/Custom/RestoreModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
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
import { removeUser, setUsersData } from "@/store/slices/userManagementSlice";

const UserManagementComponent = () => {
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
  const [userDataForDelete, setUserDataForDelete] = useState<string | null>(
    null
  );
  const [userDataForRestore, setUserDataForRestore] = useState<string | null>(
    null
  );
  const [userDataForForceDelete, setUserDataForForceDelete] = useState<
    string | null
  >(null);
  const dispatch = useAppDispatch();
  const { credential, fetchDataStatus } = useAppSelector(
    (state) => state.globalSlice
  );
  const trash = useAppSelector((state) => state.globalSlice.credential.trash);
  const userData = useAppSelector((state) => state.usersSlice.usersData);
  const { total_count, isFetchLoading } = useAppSelector(
    (state) => state.globalSlice
  );
  const toast = useToast();
  const pageCount = total_count
    ? Math.ceil(total_count / pagination.pageSize)
    : 0;

  const FetchGetAllUserListFun = async () => {
    const obj = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    };
    dispatch(setFetchLoading(true));
    const result = await centralGetAllLists("crudUserManagementAPI", {
      ...credential,
      ...obj,
    });
    dispatch(setUsersData(result?.data.users));
    dispatch(setFetchLoading(false));
    dispatch(setInit(true));
    dispatch(setTotal_count(result?.data.total_count));
  };

  useEffect(() => {
    if (fetchDataStatus) {
      FetchGetAllUserListFun();
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

  const createModalRef = useRef<MyModalRef>(null);
  const editModalRef = useRef<EditModalRef>(null);

  const handleCreateModal = () => {
    if (createModalRef.current) {
      createModalRef.current.open();
    }
  };

  const handleEditModal = (userManagement: UserManagementType) => {
    if (editModalRef.current) {
      editModalRef.current.open({ ...userManagement });
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleDelete = (user: UserManagementType) => {
    setUserDataForDelete(user.id as string);
    onOpen();
  };

  const deleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (userDataForDelete) {
      const delobj = { id: userDataForDelete };
      const deleteUserData = userData.find((item) => item.id === delobj.id);
      const result = await centralDelete("crudUserManagementAPI", delobj);
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      dispatch(setDeleteLoading(false));
      dispatch(removeUser(deleteUserData as UserManagementType));
      onClose();
    }
  };

  const handleRestore = (user: UserManagementType) => {
    setUserDataForRestore(user.id as string);
    onRestoreOpen();
  };

  const restoreComfirmFun = async () => {
    dispatch(setRestoreLoading(true));
    if (userDataForRestore) {
      const restoreobj = { id: userDataForRestore };
      const restoreUserData = userData.find(
        (item) => item.id === restoreobj.id
      );
      const result = await centralRestore(
        "restoreUserManagementAPI",
        restoreobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      dispatch(removeUser(restoreUserData as UserManagementType));
      dispatch(setRestoreLoading(false));
      onRestoreClose();
      // FetchGetAllUserListFun();
    }
  };

  const handleForceDelete = (user: UserManagementType) => {
    setUserDataForForceDelete(user.id as string);
    onForceDeleteOpen();
  };

  const forceDeleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (userDataForForceDelete) {
      const delobj = { id: userDataForForceDelete };
      const forceDeleteUserData = userData.find(
        (item) => item.id === delobj.id
      );
      const result = await centralForceDelete(
        "forceDeleteUserManagementAPI",
        delobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      onForceDeleteClose();
      dispatch(removeUser(forceDeleteUserData as UserManagementType));
      dispatch(setDeleteLoading(false));
    }
  };

  const columns = useMemo<ColumnDef<UserManagementType, React.ReactNode>[]>(
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
        header: "Email",
        accessorKey: "email",
      },
      {
        header: "Phone",
        accessorKey: "phone",
      },
      {
        header: "Role",
        accessorKey: "role",
        cell: ({ row }: CellContext<UserManagementType, React.ReactNode>) => (
          <Badge
            bg={badgeColorChange(row.original.role)}
            px={4}
            py={2}
            borderRadius={4}
            width={"100%"}
            textAlign={"center"}
            fontSize="0.9em"
            variant="solid"
          >
            {row.original.role}
          </Badge>
        ),
      },
      {
        id: "actions",
        cell: ({ row }: CellContext<UserManagementType, React.ReactNode>) => (
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
        <Text fontSize={"30px"} fontWeight={"bold"} cursor={"pointer"}>
          User Table
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
                FetchGetAllUserListFun();
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
        modalText={`Are you sure to Delete User Id ${userDataForDelete} ?`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        actionFun={deleteComfirmFun}
        actionText={"Delete"}
      />
      <RestoreModal
        modalText={`Are you sure to Restore User Id ${userDataForRestore} ?`}
        modalTitle={"Restore"}
        isOpen={isRestoreOpen}
        onOpen={onRestoreOpen}
        onClose={onRestoreClose}
        actionFun={restoreComfirmFun}
        actionText={"Restore"}
      />
      <CustomModal
        modalTitle={"Delete Permanent"}
        modalText={`Are you sure to Delete User Id ${userDataForDelete} permanently?`}
        isOpen={isForceDeleteOpen}
        onOpen={onForceDeleteOpen}
        onClose={onForceDeleteClose}
        actionFun={forceDeleteComfirmFun}
        actionText={"Force Delete"}
      />
      <UserManagementCreateModal
        ref={createModalRef}
        title={"Create User"}
        fetchData={FetchGetAllUserListFun}
      />
      <UserManagementEditModal ref={editModalRef} title={"Edit User"} />
    </Box>
  );
};

export default UserManagementComponent;
