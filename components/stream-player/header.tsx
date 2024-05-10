"use client"

import { FC } from "react";
import { UserAvatar, UserAvatarSkeleton } from "../user-avatar";
import { VerifiedMark } from "../verified-mark";
import { useParticipants, useRemoteParticipant } from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import { Actions, ActionsSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
  hostName: string
  hostIdentity: string
  imageUrl: string
  viewerIdentity: string
  isFollowing: boolean
  name: string
}

const Header: FC<HeaderProps> = (props) => {
  const { name, imageUrl, hostName, isFollowing, hostIdentity, viewerIdentity} = props;
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantsCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = hostAsViewer === viewerIdentity;

  return (
    <div
      className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4"
    >
      <div
        className="flex items-center gap-x-3"
      >
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div
          className="space-y-1"
        >
          <div
            className="flex items-center gap-x-2"
          >
            <h2
              className="text-lg font-semibold"
            >
              {hostName}
            </h2>
            <VerifiedMark/>
          </div>
          <p
            className="text-sm font-semibold"
          >
            {name}
          </p>
          {
            isLive && (
              <div
                className="font-semibold flex gap-x-1 items-center text-xs text-rose-500"
              >
                <UserIcon
                  className="h-4 w-4"
                />
                <p>
                  { participantsCount } {participantsCount === 1 ? "viewe" : "viewers"}
                </p>
              </div>
            )
          }
          {
            !isLive && (
              <p
                className="font-semibold text-xs text-muted-foreground"
              >
                Offline
              </p>
            )
          }
        </div>

      </div>
      <Actions
        isHost={isHost}
        isFollowing={isFollowing}
        hostIdentity={hostIdentity}
      />
    </div>
  )
}

const HeaderSkeleton: FC = () => {
  return (
    <div
      className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4"
    >
      <div
        className="flex items-center gap-x-2"
      >
        <UserAvatarSkeleton
          size="lg"
        />
        <div
          className="space-y-2"
        >
          <Skeleton
            className="h-6 w-32"
          />
          <Skeleton
            className="h-4 w-24"
          />
        </div>
      </div>
      <ActionsSkeleton/>
    </div>
  )
}

export { Header, HeaderSkeleton }