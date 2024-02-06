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
import {
  GetAllUserList,
  GetAllUserListFun,
  GetUserType,
  userDelete,
  userForceDelete,
  userRestore,
} from "@/lib/userManagement";
import { getToken } from "@/lib/auth";
import {
  badgeColorChange,
  changeFormatDateStringArr,
  formatDateString,
} from "@/utils/changes";
import Loading from "@/components/Custom/Loading";
import UserManagementCreateModal, {
  MyModalRef,
} from "@/components/userManagement/modal/Create";
import UserManagementEditModal, {
  EditModalRef,
} from "@/components/userManagement/modal/Edit";
import CustomModal from "@/components/Custom/CustomModal";
import RestoreModal from "@/components/userManagement/modal/Restore";

const UserManagement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userList, setUserList] = useState<UserManagementType[]>([]);
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
  const { limit, onPaginationChange, skip, pagination } = usePagination();
  const [totalCount, setTotalCount] = useState<number | undefined>();
  const [userDataForDelete, setUserDataForDelete] = useState<string | null>(
    null
  );
  const [userDataForRestore, setUserDataForRestore] = useState<string | null>(
    null
  );
  const [userDataForForceDelete, setUserDataForForceDelete] = useState<
    string | null
  >(null);
  const accessToken = getToken();
  const [credentialObj, setCredentialObj] = useState<GetUserType>({
    search: "",
    token: accessToken,
  });
  const [trash, setTrash] = useState(true);
  const [isRestoreLoading, setIsRestoreLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    FetchGetAllUserListFun();
  }, [pagination, trash]);

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

  const pageCount = totalCount
    ? Math.ceil(totalCount / pagination.pageSize)
    : 0;

  const createModalRef = useRef<MyModalRef>(null);
  const editModalRef = useRef<EditModalRef>(null);

  const handleCreateModal = () => {
    if (createModalRef.current) {
      createModalRef.current.open();
    }
  };

  const handleEditModal = (userManagement: UserManagementType) => {
    if (editModalRef.current) {
      editModalRef.current.open({ ...userManagement, token: accessToken });
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentialObj({ ...credentialObj, search: e.target.value });
  };

  const handleDelete = (user: UserManagementType) => {
    setUserDataForDelete(user.id);
    onOpen();
  };

  const deleteComfirmFun = async () => {
    if (userDataForDelete) {
      const delobj = { id: userDataForDelete };
      const result = await userDelete(delobj, accessToken);
      console.log("result from deleteComfirmFun :: ", result);
      if (result.code === 200) toastFun("Success", result.message, "success");
      if (result.status === 400) toastFun("Error", result.message, "error");
      onClose();
      FetchGetAllUserListFun();
    }

    return;
  };

  const handleRestore = (user: UserManagementType) => {
    setUserDataForRestore(user.id);
    onRestoreOpen();
  };

  const restoreComfirmFun = async () => {
    setIsRestoreLoading(true);
    if (userDataForRestore) {
      const restoreobj = { id: userDataForRestore };
      const result = await userRestore(restoreobj, accessToken);
      console.log("result from restoreComfirmFun :: ", result);
      if (result.code === 200) toastFun("Success", result.message, "success");
      if (result.status === 400) toastFun("Error", result.message, "error");
      onRestoreClose();
      FetchGetAllUserListFun();
    }
    setIsRestoreLoading(false);
    return;
  };

  const handleForceDelete = (user: UserManagementType) => {
    setUserDataForForceDelete(user.id);
    onForceDeleteOpen();
  };

  const forceDeleteComfirmFun = async () => {
    if (userDataForDelete) {
      const delobj = { id: userDataForDelete };
      const result = await userForceDelete(delobj, accessToken);
      console.log("result from deleteComfirmFun :: ", result);
      if (result.code === 200) toastFun("Success", result.message, "success");
      if (result.status === 400) toastFun("Error", result.message, "error");
      onForceDeleteClose();
      FetchGetAllUserListFun();
    }

    return;
  };

  const FetchGetAllUserListFun = async () => {
    const obj = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    };
    setIsLoading(true);
    const result = await GetAllUserList({ ...credentialObj, trash, ...obj });
    const resultWithChangeDate = changeFormatDateStringArr(result.data.users);
    setUserList(resultWithChangeDate);
    setTotalCount(result.data.total_count);
    setIsLoading(false);
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
        header: "Date & Time",
        accessorKey: "updated_at",
      },
      {
        id: "actions",
        cell: ({ row }: CellContext<UserManagementType, React.ReactNode>) => (
          <Flex gap={3}>
            {trash ? (
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
            ) : (
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
            )}
            {trash ? (
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
            ) : (
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
            )}
          </Flex>
        ),
      },
    ],
    []
  );

  return (
    <Box>
      {isLoading ? (
        <Loading />
      ) : (
        <Box>
          <Text fontSize={"30px"} fontWeight={"bold"}>
            User Table
          </Text>
          <Box display={"flex"}>
            <Box display={"flex"} width={{ base: "90%", md: "50%", lg: "35%" }}>
              <Input
                variant="outline"
                placeholder="Search"
                onChange={handleChangeSearch}
              />
              <Button
                ml={1}
                onClick={() => {
                  FetchGetAllUserListFun();
                  setCredentialObj({ ...credentialObj, search: "" });
                }}
              >
                <FaSistrix />
              </Button>
            </Box>
            <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
              {trash ? (
                <Button
                  onClick={() => {
                    setTrash(false);
                  }}
                >
                  <FaAngleDoubleLeft />
                </Button>
              ) : (
                <Button
                  colorScheme={"red"}
                  onClick={() => {
                    setTrash(true);
                  }}
                >
                  Trash List
                </Button>
              )}

              <Button
                colorScheme={"blue"}
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
          <TableContainer>
            <CustomTable
              data={userList}
              columns={columns}
              pagination={pagination}
              onPaginationChange={onPaginationChange}
              pageCount={pageCount}
            />
          </TableContainer>
        </Box>
      )}
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
        isRestoreLoading={isRestoreLoading}
        setIsRestoreLoading={setIsRestoreLoading}
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
      <UserManagementCreateModal ref={createModalRef} title={"Create User"} />
      <UserManagementEditModal ref={editModalRef} title={"Edit User"} />
    </Box>
  );
};

export default UserManagement;
