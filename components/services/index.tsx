"use client";
import CustomModal from "@/components/Custom/CustomModal";
import RestoreModal from "@/components/Custom/RestoreModal";
import CustomTable from "@/components/Table/Table";
import usePagination from "@/hooks/usePagination";
import {
  centralDelete,
  centralForceDelete,
  centralGetAllLists,
  centralRestore,
} from "@/lib/api-central";
import { getToken } from "@/lib/auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setDeleteLoading,
  setFetchLoading,
  setRestoreLoading,
  setSearch,
  setTotal_count,
  setTrash,
} from "@/store/slices/globalSlice";
import { removeServices, setServicesData } from "@/store/slices/servicesSlice";
import { ServicesDataType } from "@/types/servicesDataType";
import { badgeColorChangeForServicesType } from "@/utils/changes";
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
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaAngleDoubleLeft,
  FaRegEdit,
  FaRegTrashAlt,
  FaSistrix,
  FaTrash,
  FaTrashRestore,
} from "react-icons/fa";
import Loading from "../Custom/Loading";

import ServicesCreatModal, {
  ServicesCreateModalRef,
} from "./modal/ServicesCreatModal";
import ServicesEditModal, {
  ServicesEditModalRef,
} from "./modal/ServicesEditModal";

const ServicesComponent = () => {
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
  const [servicesDataForDelete, setServicesDataForDelete] = useState<
    string | null
  >(null);
  const [servicesDataForRestore, setServicesDataForRestore] = useState<
    string | null
  >(null);
  const [servicesDataForForceDelete, setServicesDataForForceDelete] = useState<
    string | null
  >(null);
  const dispatch = useAppDispatch();
  const { credential } = useAppSelector((state) => state.globalSlice);
  const { servicesData } = useAppSelector((state) => state.servicesSlice);
  const trash = useAppSelector((state) => state.globalSlice.credential.trash);
  const { total_count, isFetchLoading } = useAppSelector(
    (state) => state.globalSlice
  );
  const perPage = useAppSelector(
    (state) => state.globalSlice.credential.per_page
  );
  const toast = useToast();

  const FetchGetAllServices = async () => {
    const obj = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    };
    dispatch(setFetchLoading(true));
    const result = await centralGetAllLists("getServicesAPI", {
      ...credential,
      ...obj,
    });
    dispatch(setServicesData(result?.data.services));
    dispatch(setFetchLoading(false));
    dispatch(setTotal_count(result?.data.total_count));
  };

  useEffect(() => {
    if (!isFetchLoading) {
      FetchGetAllServices();
    }
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

  const servicesCreateModalRef = useRef<ServicesCreateModalRef>(null);
  const servicesEditModalRef = useRef<ServicesEditModalRef>(null);

  const handleCreateModal = () => {
    if (servicesCreateModalRef.current) {
      servicesCreateModalRef.current.open();
    }
  };

  const handleEditModal = (servicessEdit: ServicesDataType) => {
    if (servicesEditModalRef.current) {
      servicesEditModalRef.current.open({
        ...servicessEdit,
      });
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleDelete = (services: ServicesDataType) => {
    setServicesDataForDelete(services.id as string);
    onOpen();
  };

  const deleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (servicesDataForDelete) {
      const delobj = { id: servicesDataForDelete };
      const deleteServicesData = servicesData.find(
        (item) => item.id === delobj.id
      );
      const result = await centralDelete("createEditDeleteServicesAPI", delobj);
      if (result.code === 200) toastFun("Success", result.message, "success");
      if (result.status === 400) toastFun("Error", result.message, "error");
      dispatch(removeServices(deleteServicesData as ServicesDataType));
      dispatch(setDeleteLoading(false));
      onClose();
    }
  };

  const handleRestore = (services: ServicesDataType) => {
    setServicesDataForRestore(services.id as string);
    onRestoreOpen();
  };

  const restoreComfirmFun = async () => {
    dispatch(setRestoreLoading(true));
    if (servicesDataForRestore) {
      const restoreobj = { id: servicesDataForRestore };
      const restoreServicesData = servicesData.find(
        (item) => item.id === restoreobj.id
      );
      const result = await centralRestore("restoreServicesAPI", restoreobj);
      if (result?.code === 200) toastFun("Success", result.message, "success");
      if (result?.status === 400) toastFun("Error", result.message, "error");
      dispatch(removeServices(restoreServicesData as ServicesDataType));
      dispatch(setRestoreLoading(false));
      onRestoreClose();
    }
  };

  const handleForceDelete = (services: ServicesDataType) => {
    setServicesDataForForceDelete(services.id as string);
    onForceDeleteOpen();
  };

  const forceDeleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (servicesDataForForceDelete) {
      const delobj = { id: servicesDataForForceDelete };
      const forceDeleteServicesData = servicesData.find(
        (item) => item.id === delobj.id
      );
      const result = await centralForceDelete("forceDeleteServicesAPI", delobj);
      if (result.code === 200) toastFun("Success", result.message, "success");
      if (result.status === 400) toastFun("Error", result.message, "error");
      dispatch(removeServices(forceDeleteServicesData as ServicesDataType));
      dispatch(setDeleteLoading(false));
      onForceDeleteClose();
    }
  };

  const columns = useMemo<ColumnDef<ServicesDataType, React.ReactNode>[]>(
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
        header: "Type",
        accessorKey: "type",
        cell: ({ row }: CellContext<ServicesDataType, React.ReactNode>) => (
          <Badge
            bg={badgeColorChangeForServicesType(row.original.type)}
            px={4}
            py={2}
            borderRadius={4}
            width={{ base: "100%", lg: "60%" }}
            textAlign={"center"}
            fontSize="0.9em"
            variant="solid"
          >
            {row.original.type}
          </Badge>
        ),
      },
      {
        id: "actions",
        cell: ({ row }: CellContext<ServicesDataType, React.ReactNode>) => (
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
          Services
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
                FetchGetAllServices();
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
              data={servicesData}
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
        modalText={`Are you sure to Delete User Id ${servicesDataForDelete} ?`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        actionFun={deleteComfirmFun}
        actionText={"Delete"}
      />
      <RestoreModal
        modalText={`Are you sure to Restore User Id ${servicesDataForRestore} ?`}
        modalTitle={"Restore"}
        isOpen={isRestoreOpen}
        onOpen={onRestoreOpen}
        onClose={onRestoreClose}
        actionFun={restoreComfirmFun}
        actionText={"Restore"}
      />
      <CustomModal
        modalTitle={"Delete Permanent"}
        modalText={`Are you sure to Delete User Id ${servicesDataForForceDelete} permanently?`}
        isOpen={isForceDeleteOpen}
        onOpen={onForceDeleteOpen}
        onClose={onForceDeleteClose}
        actionFun={forceDeleteComfirmFun}
        actionText={"Force Delete"}
      />
      <ServicesCreatModal
        ref={servicesCreateModalRef}
        title={"Create Services"}
        fetchData={FetchGetAllServices}
      />
      <ServicesEditModal
        ref={servicesEditModalRef}
        title={"Edit Services"}
        fetchData={FetchGetAllServices}
      />
    </Box>
  );
};

export default ServicesComponent;
