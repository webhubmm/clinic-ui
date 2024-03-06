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
  Tag,
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
  removeBranches,
  setBranchesData,
  setIsStaffFetching,
  setUserDataForBranches,
} from "@/store/slices/branchesSlice";
import {
  badgeColorChangeForIsOpenOrClosed,
  changeFormatDateStringArr,
} from "@/utils/changes";
import Loading from "../Custom/Loading";
import { getToken } from "@/lib/auth";
import { setUsersData } from "@/store/slices/userManagementSlice";
import { BlogsDataType } from "@/types/blogsDataType";
import {
  removeBlogs,
  setBlogsData,
  setServicesListDataForBlogs,
} from "@/store/slices/blogsSlice";
import { setIsServiceFetching } from "@/store/slices/packagesSlice";
import { usePathname, useRouter } from "next/navigation";

const BlogsComponent = () => {
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
  const [blogsDataForDelete, setBlogsDataForDelete] = useState<string | null>(
    null
  );
  const [blogsDataForRestore, setBlogsDataForRestore] = useState<string | null>(
    null
  );
  const [blogsDataForForceDelete, setBlogsDataForForceDelete] = useState<
    string | null
  >(null);
  const accessToken = getToken();
  const dispatch = useAppDispatch();
  const { credential } = useAppSelector((state) => state.globalSlice);
  const { blogsData } = useAppSelector((state) => state.blogsSlice);
  const trash = useAppSelector((state) => state.globalSlice.credential.trash);
  const { total_count, isFetchLoading } = useAppSelector(
    (state) => state.globalSlice
  );
  const perPage = useAppSelector(
    (state) => state.globalSlice.credential.per_page
  );
  const toast = useToast();
  const router = useRouter();

  const obj = {
    page: pagination.pageIndex + 1,
    per_page: pagination.pageSize,
  };

  const FetchGetAllBlogs = async () => {
    dispatch(setFetchLoading(true));
    const result = await centralGetAllLists("getBlogsAPI", {
      ...credential,
      ...obj,
    });
    dispatch(setBlogsData(result?.data.blogs));
    dispatch(setFetchLoading(false));
    dispatch(setTotal_count(result.data.total_count));
  };

  const FetchGetAllServicesListFun = async () => {
    dispatch(setIsServiceFetching(true));
    const result = await centralGetAllLists("getServicesAPI", {
      page: 1,
      per_page: perPage,
      search: "",
      trash: false,
    });
    const resultWithChangeDate = changeFormatDateStringArr(
      result?.data.services
    );
    dispatch(setServicesListDataForBlogs(resultWithChangeDate));
    dispatch(setIsServiceFetching(false));
    dispatch(setTotal_count(result?.data.total_count));
  };

  useEffect(() => {
    if (!isFetchLoading) {
      FetchGetAllBlogs();
    }
  }, [pagination]);

  useEffect(() => {
    FetchGetAllServicesListFun();
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

  const handleCreatePage = () => {
    router.push("/dashboard/blogs/create");
  };

  const handleEditPage = (blogs: BlogsDataType) => {
    router.push(`/dashboard/blogs/${blogs.id}`);
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleDelete = (blogs: BlogsDataType) => {
    setBlogsDataForDelete(blogs.id as string);
    onOpen();
  };

  const deleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (blogsDataForDelete) {
      const delobj = { id: blogsDataForDelete };
      const deleteBlogsData = blogsData.find((item) => item.id === delobj.id);
      const result = await centralDelete("createEditDeleteBlogsAPI", delobj);
      if (result.code === 200) toastFun("Success", result.message, "success");
      if (result.status === 400) toastFun("Error", result.message, "error");
      dispatch(removeBlogs(deleteBlogsData as BlogsDataType));
      dispatch(setDeleteLoading(false));
      onClose();
    }
  };

  const handleRestore = (blogs: BlogsDataType) => {
    setBlogsDataForRestore(blogs.id as string);
    onRestoreOpen();
  };

  const restoreComfirmFun = async () => {
    dispatch(setRestoreLoading(true));
    if (blogsDataForRestore) {
      const restoreobj = { id: blogsDataForRestore };
      const restoreBranchesData = blogsData.find(
        (item) => item.id === restoreobj.id
      );
      const result = await centralRestore("restoreBlogsAPI", restoreobj);
      if (result?.code === 200) toastFun("Success", result.message, "success");
      if (result?.status === 400) toastFun("Error", result.message, "error");
      dispatch(removeBlogs(restoreBranchesData as BlogsDataType));
      dispatch(setRestoreLoading(false));
      onRestoreClose();
    }
  };

  const handleForceDelete = (blogs: BlogsDataType) => {
    setBlogsDataForForceDelete(blogs.id as string);
    onForceDeleteOpen();
  };

  const forceDeleteComfirmFun = async () => {
    dispatch(setDeleteLoading(true));
    if (blogsDataForForceDelete) {
      const delobj = { id: blogsDataForForceDelete };
      const forceDeleteBlogsData = blogsData.find(
        (item) => item.id === delobj.id
      );
      const result = await centralForceDelete("forceDeleteBlogsAPI", delobj);
      if (result.code === 200) toastFun("Success", result.message, "success");
      if (result.status === 400) toastFun("Error", result.message, "error");
      dispatch(removeBlogs(forceDeleteBlogsData as BlogsDataType));
      dispatch(setDeleteLoading(false));
      onForceDeleteClose();
    }
  };

  const columns = useMemo<ColumnDef<BlogsDataType, React.ReactNode>[]>(
    () => [
      {
        header: "Id",
        accessorKey: "id",
      },
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Content",
        accessorKey: "content",
        cell: ({ row }: CellContext<BlogsDataType, React.ReactNode>) => (
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            width={"350px"}
            whiteSpace={"pre-line"}
          >
            <div dangerouslySetInnerHTML={{ __html: row.original.content }} />
          </Box>
        ),
      },
      {
        header: "Author",
        accessorKey: "author",
      },
      {
        header: "Read Time",
        accessorKey: "read_time",
      },
      {
        header: "Services",
        accessorKey: "services",
        cell: ({ row }: CellContext<BlogsDataType, React.ReactNode>) => (
          <Box display={"flex"} flexWrap={"wrap"} width={"100%"}>
            {row.original.services.map((item) => {
              return (
                <Tag
                  bg={"#5c90e9"}
                  mt={1}
                  mr={1}
                  px={4}
                  py={2}
                  borderRadius={4}
                  textAlign={"center"}
                  variant="solid"
                  key={item.id}
                >
                  {item.name}
                </Tag>
              );
            })}
          </Box>
        ),
      },
      {
        id: "actions",
        cell: ({ row }: CellContext<BlogsDataType, React.ReactNode>) => (
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
                    handleEditPage(row.original);
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
          Blogs
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
                FetchGetAllBlogs();
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
              isDisabled={isFetchLoading || trash}
              colorScheme={"blue"}
              ml={4}
              onClick={handleCreatePage}
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
              data={blogsData}
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
        modalText={`Are you sure to Delete User Id ${blogsDataForDelete} ?`}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        actionFun={deleteComfirmFun}
        actionText={"Delete"}
      />
      <RestoreModal
        modalText={`Are you sure to Restore User Id ${blogsDataForRestore} ?`}
        modalTitle={"Restore"}
        isOpen={isRestoreOpen}
        onOpen={onRestoreOpen}
        onClose={onRestoreClose}
        actionFun={restoreComfirmFun}
        actionText={"Restore"}
      />
      <CustomModal
        modalTitle={"Delete Permanent"}
        modalText={`Are you sure to Delete User Id ${blogsDataForForceDelete} permanently?`}
        isOpen={isForceDeleteOpen}
        onOpen={onForceDeleteOpen}
        onClose={onForceDeleteClose}
        actionFun={forceDeleteComfirmFun}
        actionText={"Force Delete"}
      />
    </Box>
  );
};

export default BlogsComponent;
