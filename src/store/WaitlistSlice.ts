import { create } from "zustand";

export interface WaitlistStore {
  data: {
    id: string;
    email: string | null;
  };
  setData: (data: { id: string; email: string | null }) => void;
}

export const useWaitlist = create<WaitlistStore>((set) => ({
  data: {
    id: "",
    email: "",
  },
  setData: (values: { id: string; email: string | null }) => {
    set(() => ({ data: values }));
  },
}));
