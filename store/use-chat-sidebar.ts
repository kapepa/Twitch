import { ChatVariant } from '@/emun/chat'
import { create } from 'zustand'

interface useChatSidebarProps {
  variant: ChatVariant,
  collapsed: boolean,
  onEpand: () => void,
  onCollapse: () => void,
  onChangeVariant: (variant: ChatVariant) => void,
}

const useChatSidebar = create<useChatSidebarProps>((set) => ({
  variant: ChatVariant.CHAT,
  collapsed: false,
  onEpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant })),
}))

export { useChatSidebar }