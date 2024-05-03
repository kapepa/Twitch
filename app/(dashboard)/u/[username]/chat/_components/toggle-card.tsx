"use client"

import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { FC, useTransition } from "react";
import { toast } from "sonner";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  field: FieldTypes,
  label: string,
  value: boolean,
}

const ToggleCard: FC<ToggleCardProps> = (props) => {
  const { field, label, value } = props;
  const [isPending, startTransition] = useTransition()

  const onChange = () => {
    startTransition(async () => {
      try {
        await updateStream({[field]: !value});
        toast.success("Chat settings updated")
      } catch {
        toast.error("Something went wrong")
      }
    })
  }

  return (
    <div
      className="rounded-xl bg-muted p-6"
    >
      <div
        className="flex items-center justify-between"
      >
        <p
          className="space-y-2"
        >
          {label}
        </p>
        <div
          className="space-y-2"
        >
          <Switch
            checked={value}
            disabled={isPending}
            onCheckedChange={onChange}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  )
}

const ToggleCardSkeleton: FC = () => {
  return (
    <Skeleton
      className="rounded-xl p-10 w-full"
    />
  )
}

export { ToggleCard, ToggleCardSkeleton }