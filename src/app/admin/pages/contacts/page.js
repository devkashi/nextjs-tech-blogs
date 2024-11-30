"use client";

import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FiEdit, FiTrash } from "react-icons/fi";
import Link from "next/link";
import { fetchMessagesRequest } from "../../../store/contact/contactSlice";

const ContactListPage = () => {
  const dispatch = useDispatch();

  // Fetch contact messages from the Redux store
  const {
    data: messages,
    totalCount,
    status,
    error,
  } = useSelector((state) => state.contact);

  // Pagination state (maintained by the table instance)
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "title",
        header: "Title",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "content",
        header: "Content",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "date",
        header: "Date",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-4">
            <Link
              href={`/admin/pages/blog/edit/${row.original.id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              <FiEdit className="inline-block text-xl" />
            </Link>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FiTrash className="inline-block text-xl" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleDelete = (id) => {
    console.log(`Deleting blog with ID: ${id}`);
  };

  const table = useReactTable({
    data: messages || [], // Use messages from Redux store
    columns,
    pageCount: Math.ceil(totalCount / 5), // Total number of pages
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    manualPagination: true, // Use manual pagination for dynamic fetching
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (paginationState) => {
      const { pageIndex, pageSize } = paginationState;
      dispatch(fetchMessagesRequest({ pageIndex, pageSize })); // Fetch the next page
    },
  });

  // Fetch initial data on component mount
  useEffect(() => {
    dispatch(fetchMessagesRequest({ pageIndex: 0, pageSize: 5 }));
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">
        Messages List
      </h1>

      {status === "loading" && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      <table className="min-w-full table-auto border-collapse rounded-lg bg-white shadow-md">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-600 border-b-2 border-gray-200"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 text-sm text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          {"<"}
        </button>
        <span className="text-sm text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          {">>"}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {table.getRowModel().rows.length} of {totalCount} rows
      </div>
    </div>
  );
};

export default ContactListPage;
