import { create } from "zustand";

export interface Space {
  id: string;
  name?: string;
}

export interface SvgStore {
  svg: {
    id: string;
    svgName: string;
    defaultSize: string | null;
  };
  setSvg: (data: {
    id: string;
    svgName: string;
    defaultSize: string | null;
  }) => void;

  spaces: Space[];
  setSpaces: (values: Space[]) => void;
}

export const useSvgState = create<SvgStore>((set) => ({
  svg: {
    id: "",
    svgName: "",
    defaultSize: "",
  },
  setSvg: (values: {
    id: string;
    svgName: string;
    defaultSize: string | null;
  }) => {
    set(() => ({ svg: values }));
  },

  spaces: [],
  setSpaces: (values: Space[]) => {
    set(() => ({ spaces: values }));
  },
}));
