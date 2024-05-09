import { StreamPlayerSkeleton } from "@/components/stream-player";
import { FC } from "react";

const HomeLoading: FC = () => {
  return (
    <div
      className="h-full"
    >
      <StreamPlayerSkeleton/>
    </div>
  )
}

export default HomeLoading;