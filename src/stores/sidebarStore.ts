import { create } from "zustand";

type SidebarStore = {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  showSidebar: false,
  setShowSidebar: (show) => set({ showSidebar: show }),
}));
