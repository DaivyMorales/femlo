import { create } from "zustand";

export interface Space {
  id: string;
  name?: string;
}

export interface OpenProps {
  columnId: string;
  setColumnId: (id: string) => void;
  onHover: string;
  setOnHover: (icon: string) => void;
  showInfoHover: boolean;
  setShowInfoHover: (option: boolean) => void;
  isActive: boolean;
  setIsActive: (id: boolean) => void;
  openInputSearch: boolean;
  setOpenInputSearch: (value: boolean) => void;
}

export const useOpen = create<OpenProps>((set) => ({
  columnId: "",
  setColumnId: (id: string) => {
    set(() => ({ columnId: id }));
  },
  showInfoHover: false,
  setShowInfoHover: (option: boolean) => {
    set(() => ({ showInfoHover: option }));
  },
  onHover: "",
  setOnHover: (icon: string) => {
    set(() => ({ onHover: icon }));
  },

  isActive: false,
  setIsActive: (value: boolean) => {
    set(() => ({ isActive: value }));
  },
  openInputSearch: false,
  setOpenInputSearch: (value: boolean) => {
    set(() => ({ openInputSearch: value }));
  },
}));
