"use client"

import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { FC, useTransition } from "react"
import { toast } from "sonner"

interface ActionsProps {
  isFollowing: boolean,
  userId: string,
}

const Actions: FC<ActionsProps> = (props) => {
  const { userId, isFollowing } = props;
  const [isPending, startTransition] = useTransition()

  const onClick = () => {

    if (isFollowing) {
      startTransition(async () => {
        try {
          const response = await onUnfollow(userId);
          toast.success(`You have unfollowed ${response.following.username}`)
        } catch {
          toast.error("Something went wrong")
        }
      })
    } else {
      startTransition(async () => {
        try {
          const response = await onFollow(userId);
          toast.success(`You are now following ${response.following.username}`)
        } catch {
          toast.error("Something went wrong")
        }
      })
    }

  }

  return (
    <Button
      onClick={onClick}
      variant="primary"
      disabled={isPending}
    >
      { isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}

export { Actions }