"use client"

import { FC, useTransition } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ROUTERS } from "@/emun/routers";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
  isHost: boolean
  isFollowing: boolean
  hostIdentity: string
}

const Actions: FC<ActionsProps> = (props) => {
  const { isHost, isFollowing, hostIdentity } = props;
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlerFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
      .then((data) => {toast.success(`You are now following ${data.following.username}`)})
      .catch(() => {toast.error("Something went wrong")})
    })
  }

  const handlerUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
      .then((data) => {toast.success(`You have unfollowing ${data.following.username}`)})
      .catch(() => {toast.error("Something went wrong")})
    })
  }

  const toggleFollow = () => {
    if (!userId) router.push(ROUTERS.SignIn);
    if (isHost) return; 
    if (isFollowing) return handlerUnfollow();
    else handlerFollow();
  }

  return (
    <Button
      size="sm"
      variant="primary"
      disabled={isPending || isHost}
      className="w-full lg:w-auto"
      onClick={toggleFollow}
    >
      <Heart
        className={cn(
          "h-4 w-4 mr-2",
          isFollowing ? "fill-white" : "fill-none"
        )}
      />
      {
        isFollowing ? "Unfollow" : "Follow"
      }
    </Button>
  )
}

const ActionsSkeleton: FC = () => {
  return (
    <Skeleton
      className="h-10 w-full lg:w-24"
    />
  )
}

export { Actions, ActionsSkeleton }