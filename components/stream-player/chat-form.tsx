"use client"

import { FC, FormEvent, useState } from "react"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { ChatInfo } from "./chat-info"

interface ChatFormProps {
  value: string
  onSubmit: () => void
  onChange: (value: string) => void
  isHidden: boolean
  isDelayed: boolean
  isFollowing: boolean
  isFollowersOnly: boolean
}

const ChatForm: FC<ChatFormProps> = (props) => {
  const { value, onSubmit, onChange, isHidden, isDelayed, isFollowing, isFollowersOnly} = props;
  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled = isHidden || isDelayed || isFollowersOnlyAndNotFollowing;
  const [isDelayBlocked, setIsDelayBlocked] = useState<boolean>(false);

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked){
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000)
    } else {
      onSubmit();
    }
  }

  if (isHidden) return null;

  return (
    <form
      onSubmit={handlerSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div
        className="w-full"
      >
        <ChatInfo
          isDelayed={isDelayed}
          isFollowersOnly={isFollowersOnly}
        />
        <Input
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "border-white/10",
            isFollowersOnly && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div
        className="ml-auto"
      >
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={isDisabled}
        >
          Chat
        </Button>
      </div>
    </form>
  ) 
}

const ChatFormSkeleton: FC = () => {
  return (
    <div
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <Skeleton
        className="w-full h-10"
      />
      <div
        className="flex items-center gap-x-2 ml-auto"
      >
        <Skeleton
          className="h-7 w-7"
        />
        <Skeleton
          className="h-7 w-12"
        />
      </div>
    </div>
  )
}

export { ChatForm, ChatFormSkeleton }