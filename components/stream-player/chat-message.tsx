"use client"

import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react"
import { FC } from "react"
import { format } from "date-fns";

interface ChatMessageProps {
  message: ReceivedChatMessage,
}

const ChatMessage: FC<ChatMessageProps> = (props) => {
  const { message } = props;
  const color = stringToColor(message.from?.name || "");


  return (
    <div
      className="flex gap-2 p-2 rounded-md hover:bg-white/5"
    >
      <p
        className="text-sm text-white/40"
      >
        {format(message.timestamp, "HH:MM")}
      </p>
      <div
        className="flex flex-wrap items-baseline gap-1 grow"
      >
        <p
          className="text-sm font-semibold whitespace-nowrap"
        >
          <span
            className="truncate"
            style={{ color: color }}
          >
            {message.from?.name}
          </span>:
        </p>
        <p
          className="text-sm break-all"
        >
          {message.message}
        </p>
      </div>
    </div>
  )
}

export { ChatMessage }