"use client"

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { FC } from "react";
import { Hint } from "../hint";
import { Button } from "../ui/button";

const ChatToggle: FC = () => {
  const { collapsed, onEpand, onCollapse } = useChatSidebar();
  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
  const label = collapsed ? "Expand" : "Collapse";

  const onToggle = () => {
    if (collapsed) onEpand();
    else onCollapse();
  }

  return (
    <Hint
      label={label}
      side="left"
      asChild
    >
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon
          className="h-4 w-4"
        />
      </Button>
    </Hint>
  )
}

export { ChatToggle }