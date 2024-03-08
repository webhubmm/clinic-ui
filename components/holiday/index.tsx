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
import { removeFAQS, setFAQSData } from "@/store/slices/faqsSlice";
import TruncatedText from "../Custom/TruncatedText";
import CustomModal from "../Custom/CustomModal";
import RestoreModal from "../Custom/RestoreModal";
import { setHolidayManagementData } from "@/store/slices/holidayManagementSlice";
import { HolidayManagementDataType } from "@/types/holidayManagementType";
import { formatDateString } from "@/utils/changes";
import HolidayManagementCreateModal, {
  HolidayManagementModalRef,
} from "./modal/HolidayManagementCreateModal";
import { setCalendarData } from "@/store/slices/calendarSlice";
import HolidayManagementEditModal, {
  EditHolidayManagementModalRef,
} from "./modal/HolidayManagementEditModal";

const HolidayManagementComponent = () => {
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
  const [holidayDataForDelete, setHolidayDataForDelete] = useState<
    string | null
  >(null);
  const [holidayDataForRestore, setHolidayDataForRestore] = useState<
    string | null
  >(null);
  const [holidayDataForForceDelete, setHolidayDataForForceDelete] = useState<
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
  const { holidayManagementData } = useAppSelector(
    (state) => state.holidayManagementSlice
  );
  const closedDates = useAppSelector((state) => state.calendarSlice.date);

  const toast = useToast();

  const FetchGetAllHolidayListFun = async () => {
    const obj = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
    };
    dispatch(setFetchLoading(true));
    const result = await centralGetAllLists("getHolidayManagementAPI", {
      ...credential,
      ...obj,
    });

    const closedHolidayDates = result?.data.holidays.map(
      (item: any) => item.date
    );

    dispatch(setHolidayManagementData(result?.data.holidays));
    dispatch(setCalendarData(closedHolidayDates));
    dispatch(setFetchLoading(false));
    dispatch(setTotal_count(result?.data.total_count));
  };

  useEffect(() => {
    if (fetchDataStatus) {
      FetchGetAllHolidayListFun();
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

  const holidayManagementCreateModalRef =
    useRef<HolidayManagementModalRef>(null);
  const holidayManagementEditModalRef =
    useRef<EditHolidayManagementModalRef>(null);

  const handleCreateModal = () => {
    if (holidayManagementCreateModalRef.current) {
      holidayManagementCreateModalRef.current.open();
    }
  };

  const handleEditModal = (holidayManagement: HolidayManagementDataType) => {
    if (holidayManagementEditModalRef.current) {
      holidayManagementEditModalRef.current.open({ ...holidayManagement });
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleDelete = (holiday: HolidayManagementDataType) => {
    setHolidayDataForDelete(holiday.id as string);
    onOpen();
  };

  const deleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (holidayDataForDelete) {
      const delobj = { id: holidayDataForDelete };
      const deleteHolidayManagementData = holidayManagementData.find(
        (item) => item.id === delobj.id
      );
      const result = await centralDelete(
        "createEditDeleteholidayManagementAPI",
        delobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");

      dispatch(setDeleteLoading(false));
      onClose();
      FetchGetAllHolidayListFun();
    }
  };

  const handleRestore = (holiday: HolidayManagementDataType) => {
    setHolidayDataForRestore(holiday.id as string);
    onRestoreOpen();
  };

  const restoreComfirmFun = async () => {
    dispatch(setRestoreLoading(true));
    if (holidayDataForRestore) {
      const restoreobj = { id: holidayDataForRestore };
      const restoreHolidayManagementData = holidayManagementData.find(
        (item) => item.id === restoreobj.id
      );
      const result = await centralRestore(
        "restoreHolidayManagementAPI",
        restoreobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");

      dispatch(setRestoreLoading(false));
      onRestoreClose();
      FetchGetAllHolidayListFun();
    }
  };

  const handleForceDelete = (holiday: HolidayManagementDataType) => {
    setHolidayDataForForceDelete(holiday.id as string);
    onForceDeleteOpen();
  };

  const forceDeleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (holidayDataForForceDelete) {
      const delobj = { id: holidayDataForForceDelete };
      const forceDeleteDoctorData = holidayManagementData.find(
        (item) => item.id === delobj.id
      );
      const result = await centralForceDelete(
        "forceDeleteHolidayManagementAPI",
        delobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      dispatch(setDeleteLoading(false));
      onForceDeleteClose();
      FetchGetAllHolidayListFun();
    }
  };

  const columns = useMemo<
    ColumnDef<HolidayManagementDataType, React.ReactNode>[]
  >(
    () => [
      {
        header: "Id",
        accessorKey: "id",
      },
      {
        header: "Date",
        accessorKey: "date",
      },
      {
        header: "Note",
        accessorKey: "note",
      },
      ...(!trash
        ? []
        : [
            {
              header: "Delete Time",
              accessorKey: "deleted_at",
              cell: ({
                row,
              }: CellContext<HolidayManagementDataType, React.ReactNode>) => (
                <Text>
                  {row.original.deleted_at
                    ? formatDateString(row.original.deleted_at)
                    : " - "}
                </Text>
              ),
            },
          ]),
      {
        id: "actions",
        cell: ({
          row,
        }: CellContext<HolidayManagementDataType, React.ReactNode>) => (
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
          Holiday Management
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
                FetchGetAllHolidayListFun();
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
              data={holidayManagementData}
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
        modalText={`Are you sure to Delete User Id ${holidayDataForDelete} ?`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        actionFun={deleteComfirmFun}
        actionText={"Delete"}
      />
      <RestoreModal
        modalText={`Are you sure to Restore User Id ${holidayDataForRestore} ?`}
        modalTitle={"Restore"}
        isOpen={isRestoreOpen}
        onOpen={onRestoreOpen}
        onClose={onRestoreClose}
        actionFun={restoreComfirmFun}
        actionText={"Restore"}
      />
      <CustomModal
        modalTitle={"Delete Permanent"}
        modalText={`Are you sure to Delete User Id ${holidayDataForDelete} permanently?`}
        isOpen={isForceDeleteOpen}
        onOpen={onForceDeleteOpen}
        onClose={onForceDeleteClose}
        actionFun={forceDeleteComfirmFun}
        actionText={"Force Delete"}
      />
      <HolidayManagementCreateModal
        ref={holidayManagementCreateModalRef}
        title={"Create Holiday Management"}
        fetchData={FetchGetAllHolidayListFun}
      />

      <HolidayManagementEditModal
        ref={holidayManagementEditModalRef}
        title={"Edit Holiday Management"}
        fetchData={FetchGetAllHolidayListFun}
      />
    </Box>
  );
};

export default HolidayManagementComponent;
