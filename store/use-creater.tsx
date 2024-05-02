import { create } from 'zustand'

interface UseCreaterProps {
  collapsed: boolean,
  onExpand: () => void,
  onCallapse: () => void,
}

const useCreater = create<UseCreaterProps>((set) => ({
  collapsed: true,
  onExpand: () => set(() => ({ collapsed: false })),
  onCallapse: () => set(() => ({ collapsed: true })),
}));

export { useCreater }