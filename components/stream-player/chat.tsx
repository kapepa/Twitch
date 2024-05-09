"use client"

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { FC, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatVariant } from "@/emun/chat";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { ChatCommunity } from "./chat-community";

interface ChatProps {
  viewerName: string
  hostName: string | null
  hostIdentity: string
  isFollowing: boolean
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
}

const Chat: FC<ChatProps> = (props) => {
  const { viewerName, hostName, hostIdentity, isFollowing, isChatEnabled, isChatDelayed, isChatFollowersOnly} = props;
  const matches = useMediaQuery('(max-width: 1024px)')
  const { variant, onEpand } = useChatSidebar();
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const [value, setValue] = useState<string>("");
  const { chatMessages, send } = useChat();

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;

  useEffect(() => {
    if (matches) onEpand();
  }, [matches, onEpand])

  const reversMessages = useMemo(() => {
    return chatMessages.sort((a, b) => b.timestamp - a.timestamp);
  }, [chatMessages]);

  const onChange = (value: string) => {
    setValue(value)
  }

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue("")
  };

  return (
    <div
      className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]"
    >
      <ChatHeader/>
      {
        variant === ChatVariant.CHAT && (
          <>
            <ChatList
              messages={reversMessages}
              isHidden={isHidden}
            />
            <ChatForm
              value={value}
              onSubmit={onSubmit}
              onChange={onChange}
              isHidden={isHidden}
              isDelayed={isChatDelayed}
              isFollowing={isFollowing}
              isFollowersOnly={isChatFollowersOnly}
            />
          </>
        )
      }
      {
        variant === ChatVariant.COMMUNITY && (
          <ChatCommunity
            viewerName={viewerName}
            isHidden={isHidden}
            hostName={hostName}
          />
        )
      }
    </div>
  )
}

const ChatSkeleton: FC = () => {
  return (
    <div
      className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2"
    >
      <ChatHeaderSkeleton/>
      <ChatListSkeleton/>
      <ChatFormSkeleton/>
    </div>
  )
}

export { Chat, ChatSkeleton }