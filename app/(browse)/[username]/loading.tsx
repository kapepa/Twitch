import { StreamPlayerSkeleton } from "@/components/stream-player";
import { FC } from "react";

const UsernameLoading: FC = () => {
  return (
    <div
      className="h-full"
    >
      <StreamPlayerSkeleton/>
    </div>
  )
}

export default UsernameLoading;