"use client"

import { onBlock, onUnblock } from "@/actions/block"
import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { FC, useTransition } from "react"
import { toast } from "sonner"

interface ActionsProps {
  isBlocked: boolean,
  isFollowing: boolean,
  userId: string,
}

const Actions: FC<ActionsProps> = (props) => {
  const { userId, isBlocked, isFollowing } = props;
  const [isPending, startTransition] = useTransition()

  const onClickFollowing = () => {

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

  const onClickBlock = () => {

    if (isBlocked) {
      startTransition(async () => {
        try {
          const response = await onUnblock(userId)
          toast.success(`Unblocked the user ${response.blocked.username}`)
        } catch {
          toast.error("Something went wrong")
        }
      })
    } else {
      startTransition(async () => {
        try {
          const response = await onBlock(userId)
          toast.success(`Blocked the user ${response.blocked.username}`)
        } catch {
          toast.error("Something went wrong")
        }
      })
    }

  }

  return (
    <>
      <Button
        onClick={onClickFollowing}
        variant="primary"
        disabled={isPending}
      >
        { isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button
        onClick={onClickBlock}
        variant="primary"
        disabled={isPending}
      >
        { isBlocked ? "Unblock" : "Block"}
      </Button>
    </>
  )
}

export { Actions }