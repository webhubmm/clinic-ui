"use client";
import CustomModal from "@/components/Custom/CustomModal";
import Loading from "@/components/Custom/Loading";
import RestoreModal from "@/components/Custom/RestoreModal";
import CustomTable from "@/components/Table/Table";
import usePagination from "@/hooks/usePagination";
import {
  centralDelete,
  centralForceDelete,
  centralGetAllLists,
  centralRestore,
} from "@/lib/api-central";
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
  removePackages,
  setPackagesData,
  setServicesDataForPackages,
} from "@/store/slices/packagesSlice";
import { PackagesDataType } from "@/types/packagesDataType";
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
import PackagesCreateModal, {
  PackagesCreateModalRef,
} from "./modal/PackagesCreateModal";
import PackagesEditModal, {
  PackagesEditModalRef,
} from "./modal/PackagesEditModal";

const PackagesComponent = () => {
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
  const [packagesDataForDelete, setPackagesDataForDelete] = useState<
    string | null
  >(null);
  const [packagesDataForRestore, setPackagesDataForRestore] = useState<
    string | null
  >(null);
  const [packagesDataForForceDelete, setPackagesDataForForceDelete] = useState<
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
  const { packagesData } = useAppSelector((state) => state.packagesSlice);
  const perPage = useAppSelector(
    (state) => state.globalSlice.credential.per_page
  );
  const toast = useToast();

  const obj = {
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  };

  const FetchGetAllPackagesListFun = async () => {
    dispatch(setFetchLoading(true));
    const result = await centralGetAllLists("getPackagesAPI", {
      ...credential,
      ...obj,
    });
    dispatch(setPackagesData(result?.data.packages));
    dispatch(setFetchLoading(false));
    dispatch(setTotal_count(result?.data.total_count));
  };

  const FetchGetAllServices = async () => {
    const obj = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    };
    const result = await centralGetAllLists("getServicesAPI", {
      ...credential,
      ...obj,
    });
    dispatch(setServicesDataForPackages(result?.data.services));
    dispatch(setTotal_count(result?.data.total_count));
  };

  useEffect(() => {
    if (fetchDataStatus) {
      FetchGetAllPackagesListFun();
      dispatch(setFetchDataStatus(false));
    }
  }, [pagination.pageIndex, pagination.pageSize, trash, fetchDataStatus]);

  useEffect(() => {
    FetchGetAllServices();
  }, [perPage]);

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

  const packagesCreateModalRef = useRef<PackagesCreateModalRef>(null);
  const packagesEditModalRef = useRef<PackagesEditModalRef>(null);

  const handleCreateModal = () => {
    if (packagesCreateModalRef.current) {
      packagesCreateModalRef.current.open();
    }
  };

  const handleEditModal = (packages: PackagesDataType) => {
    if (packagesEditModalRef.current) {
      packagesEditModalRef.current.open({ ...packages });
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleDelete = (packages: PackagesDataType) => {
    setPackagesDataForDelete(packages.id as string);
    onOpen();
  };

  const deleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (packagesDataForDelete) {
      const delobj = { id: packagesDataForDelete };
      const deletePackagesData = packagesData.find(
        (item) => item.id === delobj.id
      );
      const result = await centralDelete("createEditDeletePackagesAPI", delobj);
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      dispatch(removePackages(deletePackagesData as PackagesDataType));
      dispatch(setDeleteLoading(false));
      onClose();
    }
  };

  const handleRestore = (packages: PackagesDataType) => {
    setPackagesDataForRestore(packages.id as string);
    onRestoreOpen();
  };

  const restoreComfirmFun = async () => {
    dispatch(setRestoreLoading(true));
    if (packagesDataForRestore) {
      const restoreobj = { id: packagesDataForRestore };
      const restorePackagesData = packagesData.find(
        (item) => item.id === restoreobj.id
      );
      const result = await centralRestore("restorePackagesAPI", restoreobj);
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      dispatch(removePackages(restorePackagesData as PackagesDataType));
      dispatch(setRestoreLoading(false));
      onRestoreClose();
    }
  };

  const handleForceDelete = (packages: PackagesDataType) => {
    setPackagesDataForForceDelete(packages.id as string);
    onForceDeleteOpen();
  };

  const forceDeleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (packagesDataForForceDelete) {
      const delobj = { id: packagesDataForForceDelete };
      const forceDeletePackagesData = packagesData.find(
        (item) => item.id === delobj.id
      );
      const result = await centralForceDelete("forceDeletePackagesAPI", delobj);
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      dispatch(removePackages(forceDeletePackagesData as PackagesDataType));
      dispatch(setDeleteLoading(false));
      onForceDeleteClose();
    }
  };

  const columns = useMemo<ColumnDef<PackagesDataType, React.ReactNode>[]>(
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
        header: "Price",
        accessorKey: "price",
      },
      {
        header: "Discount Price",
        accessorKey: "discount_price",
      },
      {
        header: "Service Name",
        accessorKey: "service.name",
      },
      {
        id: "actions",
        cell: ({ row }: CellContext<PackagesDataType, React.ReactNode>) => (
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
          Packages
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
                FetchGetAllPackagesListFun();
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
              data={packagesData}
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
        modalText={`Are you sure to Delete User Id ${packagesDataForDelete} ?`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        actionFun={deleteComfirmFun}
        actionText={"Delete"}
      />
      <RestoreModal
        modalText={`Are you sure to Restore User Id ${packagesDataForRestore} ?`}
        modalTitle={"Restore"}
        isOpen={isRestoreOpen}
        onOpen={onRestoreOpen}
        onClose={onRestoreClose}
        actionFun={restoreComfirmFun}
        actionText={"Restore"}
      />
      <CustomModal
        modalTitle={"Delete Permanent"}
        modalText={`Are you sure to Delete User Id ${packagesDataForDelete} permanently?`}
        isOpen={isForceDeleteOpen}
        onOpen={onForceDeleteOpen}
        onClose={onForceDeleteClose}
        actionFun={forceDeleteComfirmFun}
        actionText={"Force Delete"}
      />
      <PackagesCreateModal
        ref={packagesCreateModalRef}
        title={"Create Packages"}
        fetchData={FetchGetAllPackagesListFun}
      />
      <PackagesEditModal
        ref={packagesEditModalRef}
        title={"Edit Packages"}
        fetchData={FetchGetAllPackagesListFun}
      />
    </Box>
  );
};

export default PackagesComponent;
