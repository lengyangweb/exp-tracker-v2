
export interface Tracker {
  id?: string;
  title: string;
  createdAt: Date;
  userId?: string;
}

export interface TrackerTableProps {
  /** The table instance from TanStack Table. */
  table: TrackerTable;
  /** Sets the selected expense for editing. */
  setSelected: (expense: import(Tracker)) => void;
  /** Sets whether the tracker form is shown. */
  setShowTrackerForm: (show: boolean) => void;
  /** Handles deleting a tracker. */
  handleDeleteTracker: (id: string) => Promise<void>;
  viewTracker: (id: string) => void
}

export type TrackerRow = import('@tanstack/react-table').Row<Tracker>;

export type TrackerTable = import('@tanstack/react-table').Table<Tracker> & {
  /** View tracker row from table. */
  viewRow?: (row: TrackerRow) => Promise<void>,
  /** Shows the edit form for the given row. */
  showEdit?: (row: TrackerRow) => void,
  /** Removes the given row from the table. */
  removeRow?: (row: TrackerRow) => Promise<void>,
};

export type TrackerTableColumn = import('@tanstack/react-table').ColumnDef<Tracker, any> & {
  /** The header text for the column. */
  header: string,
  /** The accessor key for the column. */
  accessorKey: keyof Tracker,
  /** The cell renderer for the column. */
  cell?: (info: import('@tanstack/react-table').CellContext<Tracker, any>) => React.ReactNode,
};  
