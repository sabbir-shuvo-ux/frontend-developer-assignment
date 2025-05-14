import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  Table as ReactTableInstance,
} from "@tanstack/react-table";
import React from "react";

type Props<TData extends { id: string }, TValue> = {
  isLoading?: boolean;
  table: ReactTableInstance<TData>;
  columns: ColumnDef<TData, TValue>[];
};

type ExpandedRowDetails = {
  phone?: string;
  address1?: string;
  address2?: string;
};

export function TableBodyContainer<TData extends { id: string }, TValue>({
  isLoading,
  table,
  columns,
}: Props<TData, TValue>) {
  const [expandedRowId, setExpandedRowId] = React.useState<string | null>(null);
  const [expandedRowData, setExpandedRowData] = React.useState<
    Record<string, ExpandedRowDetails>
  >({});

  const [loadingRowId, setLoadingRowId] = React.useState<string | null>(null);

  const handleRowClick = async (userId: string) => {
    if (expandedRowId === userId) {
      setExpandedRowId(null);
      return;
    }

    if (!expandedRowData[userId]) {
      setLoadingRowId(userId);
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`);
        const json = await res.json();
        setExpandedRowData((prev) => ({ ...prev, [userId]: json }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoadingRowId(null);
      }
    }

    setExpandedRowId(userId);
  };

  return (
    <TableBody>
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            Loading...
          </TableCell>
        </TableRow>
      ) : table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => {
          const userId = row.original.id;
          const isExpanded = expandedRowId === userId;
          const details = expandedRowData[userId];
          const isLoadingRow = loadingRowId === userId;

          return (
            <React.Fragment key={row.id}>
              <TableRow
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer"
                onClick={() => handleRowClick(userId)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>

              {isExpanded && (
                <TableRow className="bg-muted">
                  <TableCell colSpan={columns.length}>
                    {isLoadingRow ? (
                      <div className="text-sm text-center py-4">
                        Loading details...
                      </div>
                    ) : (
                      <div className="space-y-1 text-sm">
                        <div>
                          <strong>Phone:</strong> {details?.phone || "N/A"}
                        </div>
                        <div>
                          <strong>Address 1:</strong>{" "}
                          {details?.address1 || "N/A"}
                        </div>
                        <div>
                          <strong>Address 2:</strong>{" "}
                          {details?.address2 || "N/A"}
                        </div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
