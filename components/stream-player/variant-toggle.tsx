"use client"

import { ChatVariant } from "@/emun/chat";
import { useChatSidebar } from "@/store/use-chat-sidebar"
import { MessageSquare, Users } from "lucide-react";
import { FC } from "react"
import { Hint } from "../hint";
import { Button } from "../ui/button";

const VariantToggle: FC = () => {
  const { variant, onChangeVariant } = useChatSidebar();
  const isChat = variant === ChatVariant.CHAT;
  const Icon = isChat ? Users : MessageSquare;
  const label = isChat ? "Community" : "GO back to chat";

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onChangeVariant(newVariant);
  }

  return (
    <Hint
      label={label}
      side="left"
      asChild
    >
      <Button
        variant="ghost"
        onClick={onToggle}
        className="h-auto p-2 hover:bg-white/10 hover:text-primary"
      >
        <Icon
          className="h-4 w-4"
        />
      </Button>
    </Hint>
  )
}

export { VariantToggle }