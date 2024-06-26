import { create } from 'zustand';

interface useSidebarStore {
  collapsed: boolean,
  onExpand: () => void,
  onCallapse: () => void,
}

const useSidebar = create<useSidebarStore>((set) => ({
  collapsed: true,
  onExpand: () => set(() => ({ collapsed: false })),
  onCallapse: () => set(() => ({ collapsed: true })),
}))

export { useSidebar }