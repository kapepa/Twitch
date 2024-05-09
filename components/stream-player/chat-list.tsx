"use client"

import { ReceivedChatMessage } from "@livekit/components-react"
import { FC } from "react"
import { ChatMessage } from "./chat-message"
import { Skeleton } from "../ui/skeleton"

interface ChatListProps {
  messages: ReceivedChatMessage[]
  isHidden: boolean
}

const ChatList: FC<ChatListProps> = (props) => {
  const { messages, isHidden } = props;

  if (isHidden || !messages || messages.length === 0) return (
    <div
      className="flex flex-1 items-center justify-center"
    >
      <p
        className="text-sm text-muted-foreground"
      >
        { isHidden ? "Chat is disabled." : "Welcome to the chat!" }
      </p>
    </div>
  ) 

  return (
    <div
      className="flex flex-1 flex-col-reverse overflow-auto p-3 h-ful"
    >
      {
        messages.map((message, index) => (
          <ChatMessage
            key={`${message.id}-${index}`}
            message={message}
          />
        ))
      }
    </div>
  )
}

const ChatListSkeleton: FC = () => {
  return (
    <div
      className="flex h-full items-center justify-center"
    >
      <Skeleton
        className="w-1/2 h-6"
      />
    </div>
  )
}

export { ChatList, ChatListSkeleton }