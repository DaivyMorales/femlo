import { create } from "zustand";

export interface Space {
  id: string;
  name: string | null;
  companyId: string | null;
}

export interface GlobalDataProps {
  columns: Space[];
  setColumns: (values: Space[]) => void;
  deleteColumn: (id: string) => void;
  createColumn: (column: Space) => void;
}

export const useGlobalData = create<GlobalDataProps>((set) => ({
  columns: [],
  setColumns: (values: Space[]) => {
    set(() => ({ columns: values }));
  },
  deleteColumn: (id: string) => {
    set((state) => ({
      columns: state.columns.filter((column) => column.id !== id),
    }));
  },
  createColumn: (column: Space) => {
    set((state) => ({
      columns: [...state.columns, column],
    }));
  },
}));