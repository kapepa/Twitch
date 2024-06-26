import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { Stream, User } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

type StreamType = Pick<Stream, "id" | "isLive" | "name" | "thumbnailUrl"> & {
  user: User,
}

interface ResultCardProps {
  stream: StreamType,
}

const ResultCard: FC<ResultCardProps> = (props) => {
  const { stream } = props;

  return (
    <Link
      href={`/${stream.user.username}`}
    >
      <div
        className="h-full w-full space-y-4"
      >
        <Thumbnail
          src={stream.thumbnailUrl}
          isLive={stream.isLive}
          fallback={stream.user.imageUrl}
          username={stream.user.username}
        />
        <div
          className="flex gap-x-3"
        >
          <UserAvatar
            username={stream.user.username || ""}
            imageUrl={stream.user.imageUrl}
            isLive={stream.isLive}
          />
          <div
            className="flex flex-col text-sm overflow-hidden"
          >
            <p
              className="truncate font-semibold hover:text-blue-500"
            >
              {stream.name}
            </p>
            <p
              className="text-muted-foreground"
            >
              {stream.user.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

const ResultCardSkeleton: FC = () => {
  return (
    <div
      className="h-full w-full space-y-4"
    >
      <ThumbnailSkeleton/>
      <div
        className="flex gap-x-3"
      >
        <UserAvatarSkeleton/>
        <div
          className="flex flex-col gap-y-1"
        > 
          <Skeleton
            className="h-4 w-32"
          />
          <Skeleton
            className="h-4 w-32"
          />
        </div>
      </div>
    </div>
  )
}

export { ResultCard, ResultCardSkeleton }