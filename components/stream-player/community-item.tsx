"use client"

import { cn, stringToColor } from "@/lib/utils";
import { FC, useTransition } from "react"
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { MinusCircle } from "lucide-react";
import { toast } from "sonner";
import { onBlock } from "@/actions/block";

interface CommunityItemProps {
  hostName: string,
  viewerName: string,
  participantName: string,
  participantIdentity: string,
}

const CommunityItem: FC<CommunityItemProps> = (props) => {
  const { hostName, participantIdentity, participantName, viewerName } = props;
  const [isPending, startTransition] = useTransition();
  const color = stringToColor(participantName || "");
  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handlerBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(async () => {
      try {
        await onBlock(participantIdentity);
        toast.success(`Blocked ${participantName}`)
      } catch {
        toast.error("Something went wrong")
      }
    })
  }

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p
        style={{color: color}}
      >
        {participantName}
      </p>
      {
        isHost && !isSelf && (
          <Hint
            label="Block"
            asChild
          >
            <Button
              variant="ghost"
              className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
              onClick={handlerBlock}
              disabled={isPending}
            >
              <MinusCircle
                className="h-4 w-4 text-muted-foreground"
              />
            </Button>
          </Hint>
        )
      }
    </div>
  )
}

export { CommunityItem }