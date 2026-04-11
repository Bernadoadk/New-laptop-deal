import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
}

export function DataTable<T>({ columns, data, isLoading }: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto glass-panel border-border/50">
      <table className="w-full border-collapse">
        <thead className="bg-bg-3/50 text-left border-b border-border">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-nld-muted">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <tr key={i} className="animate-pulse border-b border-border/50">
                {columns.map((_, j) => (
                  <td key={j} className="px-6 py-5">
                    <div className="h-4 bg-border/50 rounded w-full" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-20 text-center text-nld-muted uppercase tracking-widest text-xs">
                Aucune donnée disponible
              </td>
            </tr>
          ) : (
            data.map((item, i) => (
              <tr key={i} className="hover:bg-accent/5 border-b border-border/50 last:border-0 transition-colors">
                {columns.map((col, j) => (
                  <td key={j} className="px-6 py-5 text-sm text-nld-text">
                    {typeof col.accessor === 'function' 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
