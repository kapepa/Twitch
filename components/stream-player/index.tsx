"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { FC } from "react"
import { LiveKitRoom } from '@livekit/components-react';
import { Video } from "./video";

interface StreamPlayerProps {
  player: User,
  stream: Stream,
  isFollowing: boolean,
}

const StreamPlayer: FC<StreamPlayerProps> = (props) => {
  const { player, stream, isFollowing } = props;
  const { name, token, identity } = useViewerToken(player.id);

  if (!name || !token || !identity) return (
    <div>
      Cannot watch the stream
    </div>
  )

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full"
    >
      <div
        className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto pb-10 no-scrollbar"
      >
        <Video
          hostName={player.username || ""}
          hostIdentity={player.id || ""}
        />
      </div>
    </LiveKitRoom>
  )
}

export { StreamPlayer }