"use client"

import { useParticipants } from "@livekit/components-react"
import { FC, useMemo, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import { CommunityItem } from "./community-item"
import { LocalParticipant, RemoteParticipant } from "livekit-client"

interface ChatCommunityProps {
  viewerName: string
  isHidden: boolean
  hostName: string | null
}

const ChatCommunity: FC<ChatCommunityProps> = (props) => {
  const { hostName, isHidden, viewerName } = props;
  const [debouncedValue, setValue] = useDebounceValue("", 500)
  const participants = useParticipants();

  const onChange = (val: string) => {
    setValue(val); 
  }

  const filterParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (acc.some(p => p.identity === hostAsViewer)){
        acc.push(participant)
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[])

    return deduped.filter((participant) => {
      return participant.name?.toLowerCase().includes(debouncedValue.toLocaleLowerCase());
    });
  }, [participants, debouncedValue])

  if (isHidden) {
    return (
      <div
        className="flex flex-1 items-center justify-center"
      >
        <p
          className="text-sm text-muted-foreground"
        >
          Commuinity is disabled
        </p>
      </div>
    )
  }

  return (
    <div
      className="p-4"
    >
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
        className="border-white/10"
      />
      <ScrollArea
        className="gap-y-2 mt-4"
      >
        <p
          className="text-center text-sm text-muted-foreground hidden last:block p-2"
        >
        {
          filterParticipants.map((participant, index) => (
            <CommunityItem
              key={`${participant.identity}-${index}`}
              hostName={hostName || ""}
              viewerName={viewerName}
              participantName={participant.name || ""}
              participantIdentity={participant.identity}
            />
          ))
        }
        </p>
      </ScrollArea>
    </div>
  )
}

export { ChatCommunity }