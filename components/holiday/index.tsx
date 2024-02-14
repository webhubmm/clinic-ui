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
import CustomModal from "@/components/Custom/CustomModal";
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

import {
  centralDelete,
  centralForceDelete,
  centralGetAllLists,
  centralRestore,
} from "@/lib/api-central";


import {
  badgeColorChangeForIsOpenOrClosed,
  changeFormatDateStringArr,
} from "@/utils/changes";
import Loading from "../Custom/Loading";
import { getToken } from "@/lib/auth";
import { HolidayManagmentType } from "@/types/holidayDataType";
import { setHolidayData } from "@/store/slices/holidaySlice";
import HolidayCreateModal, { MyHolidayModalRef } from "./modal/HolidayCreateModal";
import HolidayhRestoreModal from "./modal/HolidayRestoreModal";
import HolidayEditModal, { HolidayEditModalRef } from "./modal/HolidayEditModal";

const HolidayComponent = () => {
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
  
  // for paginate
  const { onPaginationChange, pagination } = usePagination();
  
   const [holidayDataForDelete, setHolidayDataForDelete] = useState<string | null>(
    null
  );
  const [holidayDataForRestore, setHolidayDataForRestore] = useState<string | null>(
    null
  );
  const [holidayDataForForceDelete, setHolidayDataForForceDelete] = useState<
    string | null
  >(null);

  const accessToken =getToken();
  const dispatch =useAppDispatch();
  const { credential, userData } = useAppSelector((state) => state.globalSlice);
   const trash = useAppSelector((state) => state.globalSlice.credential.trash);
  const { total_count, isFetchLoading } = useAppSelector(
    (state) => state.globalSlice
  );
 const toast =useToast();

//  for data fetch
useEffect(() =>{
FetchGetAllHolidayFunc()
},[pagination])

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

     const holidayCreateModalRef = useRef<MyHolidayModalRef>(null);
  const holidayEditModalRef = useRef<HolidayEditModalRef>(null);

    // for handle function
    const handleCreateModal = () => {
    if (holidayCreateModalRef.current) {
      holidayCreateModalRef.current.open();
    }
  };

  const handleEditModal = (holidayManagment:HolidayManagmentType) => {
    if (holidayEditModalRef.current) {
      holidayEditModalRef.current.open({ ...holidayManagment, token: accessToken });
    }
  };

   const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
   };

     // start delete
   const handleDelete = (user: HolidayManagmentType) => {
    setHolidayDataForDelete(user.id);
    onOpen();
  };
  
   const deleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (holidayDataForDelete) {
      const delobj = { id: holidayDataForDelete };
      const result = await centralDelete("createEditDeleteHolidayManagmentAPI", delobj);
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      onClose();
      dispatch(setDeleteLoading(false));
      FetchGetAllHolidayFunc();
    }
  };
  // end delete 
   
  //start force_delete
   const handleForceDelete = (user: HolidayManagmentType) => {
    setHolidayDataForForceDelete(user.id);
    onForceDeleteOpen();
  };

  const forceDeleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (holidayDataForForceDelete) {
      const delobj = { id: holidayDataForForceDelete };
      const result = await centralForceDelete(
        "forceDeleteHolidayManagmentAPI",
        delobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      onForceDeleteClose();
      dispatch(setDeleteLoading(false));
      FetchGetAllHolidayFunc();
    }
  };
  // end start force delete

    // for start restore
 const handleRestore = (user: HolidayManagmentType) => {
    setHolidayDataForRestore(user.id);
    onRestoreOpen();
  };

  const restoreComfirmFun = async () => {
    dispatch(setRestoreLoading(true));
    if (holidayDataForRestore) {
      const restoreobj = { id: holidayDataForRestore };
      const result = await centralRestore(
        "restoreHolidayManagmentAPI",
        restoreobj
      );
      if (result?.code === 200) toastFun("Success", result?.message, "success");
      if (result?.status === 400) toastFun("Error", result?.message, "error");
      onRestoreClose();
      dispatch(setRestoreLoading(false));
      FetchGetAllHolidayFunc();
    }
  };

    // for allholidayDataList
    const FetchGetAllHolidayFunc =async() =>{
       const obj  ={
        page: pagination.pageIndex + 1,
        per_page: pagination.pageSize,
       };
          dispatch(setFetchLoading(true));
        const result = await centralGetAllLists("getHolidayAPI", {
        ...credential,
        ...obj,
      });
      const resultWithChangeDate = changeFormatDateStringArr(
        result?.data.holidays
      );
      dispatch(setHolidayData(resultWithChangeDate));
      dispatch(setInit(true));
      dispatch(setTotal_count(result?.data.total_count));
      dispatch(setUserData(resultWithChangeDate));
      dispatch(setFetchLoading(false));
    };


  const columns = useMemo<ColumnDef<HolidayManagmentType, React.ReactNode>[]>(
    () => [
      {
        header: "Id",
        accessorKey: "id",
      },
      {
        header: "Holiday_Date",
        accessorKey: "date",
      },
      {
        header: "Holiday",
        accessorKey: "note",
      },
     
    
     
     

      {
        header: "Date & Time",
        accessorKey: "updated_at",
      },
      {
        id: "actions",
        cell: ({ row }: CellContext<HolidayManagmentType, React.ReactNode>) => (
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
          Holiday Table
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
                FetchGetAllHolidayFunc()
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
        modalText={`Are you sure to Delete User Id ${holidayDataForDelete} ?`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        actionFun={deleteComfirmFun}
        actionText={"Delete"}
      />
      
   <HolidayhRestoreModal 
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
        modalText={`Are you sure to Delete User Id ${holidayDataForForceDelete} permanently?`}
        isOpen={isForceDeleteOpen}
        onOpen={onForceDeleteOpen}
        onClose={onForceDeleteClose}
        actionFun={forceDeleteComfirmFun}
        actionText={"Force Delete"}
      />
            <HolidayCreateModal 
         ref={holidayCreateModalRef}
        title={"Create Holiday"}
        fetchData={FetchGetAllHolidayFunc}
      />
      <HolidayEditModal 
        ref={holidayEditModalRef}
        title={"Edit Holiday"}
        fetchData={FetchGetAllHolidayFunc}
      />
      
    </Box>
  );

}

export default HolidayComponent;