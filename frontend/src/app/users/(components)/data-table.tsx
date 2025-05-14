"use client";

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";

import { DataTablePagination } from "@/components/ui/DataTablePagination";
import { TableBodyContainer } from "./TableBodyContainer";
import TableHaderContainer from "./TableHaderContainer";

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  onPaginationChange: (pageIndex: number, pageSize: number) => void;
  onSortingChange: (sorting: SortingState) => void;
  sorting: SortingState;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  isLoading?: boolean;
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  pageCount,
  onPaginationChange,
  onSortingChange,
  sorting,
  pagination,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      pagination,
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      onSortingChange(newSorting);
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      onPaginationChange(newPagination.pageIndex, newPagination.pageSize);
    },
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHaderContainer table={table} />
          <TableBodyContainer
            isLoading={isLoading}
            columns={columns}
            table={table}
          />
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
