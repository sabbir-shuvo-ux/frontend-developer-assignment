"use client";

import { SortingState } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { UserType } from "./types";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { ApiResponse } from "../page";

export const TableContainer = ({ data: initialData, meta }: ApiResponse) => {
  const [data, setData] = useState<UserType[]>(initialData);
  const [pageCount, setPageCount] = useState(Math.ceil(meta.total / 10));
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);

  const previousPageSize = useRef(pagination.pageSize);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch(
      `http://localhost:5000/api/users?page=${pagination.pageIndex + 1}&limit=${
        pagination.pageSize
      }`,
      { cache: "force-cache" }
    );
    const json = await res.json();
    setData(json.data);
    setPageCount(Math.ceil(json.meta.total / pagination.pageSize));
    setIsLoading(false);
    setHasFetchedOnce(true);
    previousPageSize.current = pagination.pageSize;
  };

  useEffect(() => {
    const pageSizeChanged = previousPageSize.current !== pagination.pageSize;
    const shouldFetch =
      pagination.pageIndex !== 0 || hasFetchedOnce || pageSizeChanged;

    if (shouldFetch) {
      fetchData();
    }
  }, [pagination]);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        isLoading={isLoading}
        data={data}
        columns={columns}
        pageCount={pageCount}
        onPaginationChange={(pageIndex, pageSize) =>
          setPagination({ pageIndex, pageSize })
        }
        onSortingChange={setSorting}
        sorting={sorting}
        pagination={pagination}
      />
    </div>
  );
};
