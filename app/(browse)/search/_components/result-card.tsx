import { Thumbnail, ThumbnailSkeleton } from "@/components/thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifiedMark } from "@/components/verified-mark";
import { GetSearchType } from "@/types/GetSearchType";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { FC } from "react";

interface ResulCardProps {
  stream: GetSearchType,
}

const ResulCard: FC<ResulCardProps> = (props) => {
  const { stream } = props;

  return (
    <Link
      href={`/${stream.user.username}`}
    >
      <div
        className="w-full flex gap-x-4"
      >
        <div
          className="relative h-[9rem] w-[16rem]"
        >
          <Thumbnail
            src={stream.thumbnailUrl}
            isLive={stream.isLive}
            fallback={stream.user.imageUrl}
            username={stream.user.username}
          />
        </div>
        <div
          className="space-y-1"
        >
          <div
            className="flex items-center gap-x-2"
          >
            <p
              className="font-bold text-lg cursor-pointer hover:text-black-500"
            >
              {stream.user.username}
            </p>
            <VerifiedMark/>
          </div>
          <p
            className="text-sm text-muted-foreground"
          >
            {stream.name}
          </p>
          <p
            className="text-sm text-muted-foreground"
          >
            {formatDistanceToNowStrict(new Date(stream.updatedAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </Link>
  )
}

const ResulCardSkeleton: FC = () => {
  return (
    <div
      className="w-full flex gap-x-4"
    >
      <div
        className="relative h-[9rem] w-[16rem]"
      >
        <ThumbnailSkeleton/>
      </div>
      <div
        className=" space-y-2"
      >
        <Skeleton
          className="h-4 w-32"
        />
        <Skeleton
          className="h-4 w-24"
        />
        <Skeleton
          className="h-4 w-12"
        />
      </div>
    </div>
  )
}

export { ResulCard, ResulCardSkeleton }