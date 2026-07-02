export interface RecurringTableProps {
  /** The table instance from TanStack Table. */
  table: import('@tanstack/react-table').Table<import('./reocurring').Recurring>;
  /** Sets the selected expense for editing. */
  setSelectedExpense: (expense: import('./reocurring').Recurring) => void;
  /** Sets whether the reoccurring form is shown. */
  setShowReOccurringForm: (show: boolean) => void;
  /** Handles deleting a reoccurring expense. */
  handleDeleteExpense: (id: string) => Promise<void>;
}

export type RecurringRow = import('@tanstack/react-table').Row<import('./reocurring').Recurring>;

export type RecurringTable = import('@tanstack/react-table').Table<import('./reocurring').Recurring> & {
  /** Shows the edit form for the given row. */
  showEdit?: (row: RecurringRow) => void,
  /** Removes the given row from the table. */
  removeRow?: (row: RecurringRow) => Promise<void>,
};

export type RecurringTableColumn = import('@tanstack/react-table').ColumnDef<import('./reocurring').Recurring, any> & {
  /** The header text for the column. */
  header: string,
  /** The accessor key for the column. */
  accessorKey: keyof import('./reocurring').Recurring,
  /** The cell renderer for the column. */
  cell?: (info: import('@tanstack/react-table').CellContext<import('./reocurring').Recurring, any>) => React.ReactNode,
};  
