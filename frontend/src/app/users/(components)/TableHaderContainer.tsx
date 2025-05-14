import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, Table as ReactTableInstance } from "@tanstack/react-table";

type TableHeaderContainerProps<TData> = {
  table: ReactTableInstance<TData>;
};

function TableHeaderContainer<TData>({
  table,
}: TableHeaderContainerProps<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default TableHeaderContainer;
