"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { FC } from "react"

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
    <div>
      Allowd to watch the stream
    </div>
  )
}

export { StreamPlayer }