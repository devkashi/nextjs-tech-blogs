"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FiEdit, FiTrash } from "react-icons/fi";
import Link from "next/link";

const BlogListPage = () => {
  // Sample blog data
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "First Blog",
      content: "This is the first blog",
      date: "2024-11-30",
    },
    {
      id: 2,
      title: "Second Blog",
      content: "This is the second blog",
      date: "2024-11-29",
    },
    {
      id: 3,
      title: "Third Blog",
      content: "This is the third blog",
      date: "2024-11-28",
    },
    {
      id: 4,
      title: "Fourth Blog",
      content: "This is the fourth blog",
      date: "2024-11-27",
    },
    {
      id: 5,
      title: "Fifth Blog",
      content: "This is the fifth blog",
      date: "2024-11-26",
    },
    {
      id: 6,
      title: "First Blog",
      content: "This is the first blog",
      date: "2024-11-30",
    },
    {
      id: 7,
      title: "Second Blog",
      content: "This is the second blog",
      date: "2024-11-29",
    },
    {
      id: 8,
      title: "Third Blog",
      content: "This is the third blog",
      date: "2024-11-28",
    },
    {
      id: 9,
      title: "Fourth Blog",
      content: "This is the fourth blog",
      date: "2024-11-27",
    },
    {
      id: 10,
      title: "Fifth Blog",
      content: "This is the fifth blog",
      date: "2024-11-26",
    },
  ]);

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
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  };

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    columns,
    data: blogs,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Blog List</h1>

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
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : null}
                  </div>
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
        <div className="flex space-x-2">
          <button
            onClick={() => table.firstPage()}
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
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            {">"}
          </button>
          <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            {">>"}
          </button>
        </div>

        <span className="text-sm text-gray-600">
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>

        <span className="text-sm text-gray-600">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => table.setPageIndex(Number(e.target.value) - 1)}
            className="border border-gray-300 p-1 rounded-md w-16 text-sm"
          />
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border border-gray-300 p-1 rounded-md text-sm"
        >
          {[5, 10, 15, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Showing {table.getRowModel().rows.length} of {blogs.length} rows
      </div>
    </div>
  );
};

export default BlogListPage;
