"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { FC } from "react"
import { LiveKitRoom } from '@livekit/components-react';
import { Video, VideoSkeleton } from "./video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";

interface StreamPlayerProps {
  player: User,
  stream: Stream,
  isFollowing: boolean,
}

const StreamPlayer: FC<StreamPlayerProps> = (props) => {
  const { player, stream, isFollowing } = props;
  const { name, token, identity } = useViewerToken(player.id);
  const { collapsed } = useChatSidebar();

  if (!name || !token || !identity) return <StreamPlayerSkeleton/>

  return (
    <>
      {
        collapsed && (
          <div
            className="hidden lg:block fixed top-[100px] right-2 z-50"
          > 
            <ChatToggle/>
          </div>
        )
      }
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        // Use the default LiveKit theme for nice styles.
        data-lk-theme="default"
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div
          className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto pb-10 no-scrollbar"
        >
          <Video
            hostName={player.username || ""}
            hostIdentity={player.id || ""}
          />
        </div>
        <div
          className={cn(
            "col-span-1",
            collapsed && "hidden"
          )}
        >
          <Chat
            viewerName={name}
            hostName={player.username}
            hostIdentity={player.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}

const StreamPlayerSkeleton: FC = () => {
  return (
    <div
      className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
    >
      <div
        className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto no-scrollbar pb-10"
      >
        <VideoSkeleton/>
      </div>
      <div
        className="col-span-1 bg-background"
      >
        <ChatSkeleton/>
      </div>
    </div>
  )
}

export { StreamPlayer, StreamPlayerSkeleton }