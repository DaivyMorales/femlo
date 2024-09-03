import { create } from "zustand";

export interface Space {
  id: string;
  name?: string;
}

export interface OpenProps {
  columnId: string;
  setColumnId: (id: string) => void;
}

export const useOpen = create<OpenProps>((set) => ({
  columnId: "",
  setColumnId: (id: string) => {
    set(() => ({ columnId: id }));
  },
}));
