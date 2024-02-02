"use client";
import CustomTable from "@/components/Table/Table";
import { TableContainer } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo } from "react";

const UserManagement = () => {
  // const columns = useMemo<ColumnDef<AdminDataType, React.ReactNode>[]>(
  //   () => [
  //     {
  //       header: "Name",
  //       accessorKey: "name",
  //     },
  //     {
  //       header: "Email",
  //       accessorKey: "email",
  //     },
  //     {
  //       header: "Phone",
  //       accessorKey: "phone",
  //     },
  //     {
  //       header: "Role",
  //       accessorKey: "role",
  //     },
  //     {
  //       header: "Created At",
  //       accessorKey: "createdAt",

  //     },
  //     {
  //       header: "Created At",
  //       accessorKey: "createdAt",

  //     },

  //   ],
  //   []
  // );

  return (
    <div>
      {/* <TableContainer>
        <CustomTable
          data={data}
          columns={columns}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
          pageCount={pageCount}
        />
      </TableContainer> */}
      hello
    </div>
  );
};

export default UserManagement;
