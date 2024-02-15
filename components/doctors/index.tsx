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
import CustomModal from "@/components/Custom/CustomModal";
import RestoreModal from "@/components/Custom/RestoreModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setDeleteLoading,
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
import { setPackagesData } from "@/store/slices/packagesSlice";
import DoctorsCreateModal, {
  DoctorsCreateModalRef,
} from "./modal/DoctorsCreateModal";
import DoctorsEditModal, {
  DoctorsEditModalRef,
} from "./modal/DoctorsEditModal";
import { DoctorsDataType } from "@/types/doctorsDataType";
import { setBranchesData } from "@/store/slices/branchesSlice";
import { setDoctorsData } from "@/store/slices/doctorsSlice";

const DoctorsComponent = () => {
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
  const [doctorsDataForDelete, setDoctorsDataForDelete] = useState<
    string | null
  >(null);
  const [doctorsDataForRestore, setDoctorsDataForRestore] = useState<
    string | null
  >(null);
  const [doctorsDataForForceDelete, setDoctorsDataForForceDelete] = useState<
    string | null
  >(null);
  const dispatch = useAppDispatch();
  const { credential } = useAppSelector((state) => state.globalSlice);
  const trash = useAppSelector((state) => state.globalSlice.credential.trash);
  const { total_count, isFetchLoading } = useAppSelector(
    (state) => state.globalSlice
  );
  const { doctorsData } = useAppSelector((state) => state.doctorsSlice);
  const perPage = useAppSelector(
    (state) => state.globalSlice.credential.per_page
  );
  const toast = useToast();

  const FetchGetAllDoctorsListFun = async () => {
    const obj = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    };
    dispatch(setFetchLoading(true));
    const result = await centralGetAllLists("getDoctorsAPI", {
      ...credential,
      ...obj,
    });

    dispatch(setDoctorsData(result?.data.doctors));
    dispatch(setFetchLoading(false));
    dispatch(setTotal_count(result?.data.total_count));
  };

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
    dispatch(setTotal_count(result?.data.total_count));
  };

  useEffect(() => {
    FetchGetAllDoctorsListFun();
  }, [pagination]);

  useEffect(() => {
    FetchGetAllBranches();
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

  const doctorsCreateModalRef = useRef<DoctorsCreateModalRef>(null);
  const doctorsEditModalRef = useRef<DoctorsEditModalRef>(null);

  const handleCreateModal = () => {
    if (doctorsCreateModalRef.current) {
      doctorsCreateModalRef.current.open();
    }
  };

  const handleEditModal = (doctors: DoctorsDataType) => {
    if (doctorsEditModalRef.current) {
      doctorsEditModalRef.current.open({ ...doctors });
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleDelete = (doctors: DoctorsDataType) => {
    setDoctorsDataForDelete(doctors.id as string);
    onOpen();
  };

  const deleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (doctorsDataForDelete) {
      const delobj = { id: doctorsDataForDelete };
      const result = await centralDelete("createEditDeleteDoctorsAPI", delobj);
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      onClose();
      dispatch(setDeleteLoading(false));
      FetchGetAllDoctorsListFun();
    }
  };

  const handleRestore = (doctors: DoctorsDataType) => {
    setDoctorsDataForRestore(doctors.id as string);
    onRestoreOpen();
  };

  const restoreComfirmFun = async () => {
    dispatch(setRestoreLoading(true));
    if (doctorsDataForRestore) {
      const restoreobj = { id: doctorsDataForRestore };
      const result = await centralRestore("restoreDoctorsAPI", restoreobj);
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      onRestoreClose();
      dispatch(setRestoreLoading(false));
      FetchGetAllDoctorsListFun();
    }
  };

  const handleForceDelete = (doctors: DoctorsDataType) => {
    setDoctorsDataForForceDelete(doctors.id as string);
    onForceDeleteOpen();
  };

  const forceDeleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (doctorsDataForForceDelete) {
      const delobj = { id: doctorsDataForForceDelete };
      const result = await centralForceDelete("forceDeleteDoctorsAPI", delobj);
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      onForceDeleteClose();
      dispatch(setDeleteLoading(false));
      FetchGetAllDoctorsListFun();
    }
  };

  const columns = useMemo<ColumnDef<DoctorsDataType, React.ReactNode>[]>(
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
        header: "Address",
        accessorKey: "address",
      },
      {
        header: "Degree",
        accessorKey: "degree",
      },

      {
        header: "Specialize",
        accessorKey: "specialize",
      },

      {
        id: "actions",
        cell: ({ row }: CellContext<DoctorsDataType, React.ReactNode>) => (
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
          Doctors
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
                FetchGetAllDoctorsListFun();
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
              data={doctorsData}
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
        modalText={`Are you sure to Delete User Id ${doctorsDataForDelete} ?`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        actionFun={deleteComfirmFun}
        actionText={"Delete"}
      />
      <RestoreModal
        modalText={`Are you sure to Restore User Id ${doctorsDataForRestore} ?`}
        modalTitle={"Restore"}
        isOpen={isRestoreOpen}
        onOpen={onRestoreOpen}
        onClose={onRestoreClose}
        actionFun={restoreComfirmFun}
        actionText={"Restore"}
      />
      <CustomModal
        modalTitle={"Delete Permanent"}
        modalText={`Are you sure to Delete User Id ${doctorsDataForDelete} permanently?`}
        isOpen={isForceDeleteOpen}
        onOpen={onForceDeleteOpen}
        onClose={onForceDeleteClose}
        actionFun={forceDeleteComfirmFun}
        actionText={"Force Delete"}
      />
      <DoctorsCreateModal
        ref={doctorsCreateModalRef}
        title={"Create Doctors"}
        fetchData={FetchGetAllDoctorsListFun}
      />
      <DoctorsEditModal
        ref={doctorsEditModalRef}
        title={"Edit Doctors"}
        fetchData={FetchGetAllDoctorsListFun}
      />
    </Box>
  );
};

export default DoctorsComponent;
