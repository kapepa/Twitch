import { FC, ReactNode } from "react";
import { UserAvatar } from "./user-avatar";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

interface Thumbnailprops {
  src: string | null
  isLive: boolean
  fallback: string
  username: string | null
}

const Thumbnail: FC<Thumbnailprops> = (props) => {
  let content: ReactNode;
  const { src, isLive, fallback, username } = props;

  if (!src) {
    content = (
      <div
        className="bg-card flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md"
      >
        <UserAvatar
          size="lg"
          showBadge
          username={username || ""}
          imageUrl={fallback}
          isLive={isLive}
        />
      </div>
    )
  } else {
    content = (
      <Image
        src={src}
        fill
        alt="Thumbnail"
        className="object-cover transition-transform group-hover:translate-x-2 group-hover:-translate-y-1 rounded-md"
      />
    )
  }

  return (
    <div
      className="group aspect-video relative rounded-md cursor-pointer"
    >
      <div
        className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
      />
      { content }
    </div>
  )
}

const ThumbnailSkeleton: FC = () => {
  return (
    <div
      className="group aspect-video relative rounded-xl cursor-pointer"
    >
      <Skeleton
        className="h-full w-full"
      />
    </div>
  )
}

export { Thumbnail, ThumbnailSkeleton }