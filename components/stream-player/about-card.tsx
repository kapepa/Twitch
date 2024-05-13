"use client"

import { FC } from "react";
import { VerifiedMark } from "../verified-mark";
import { BioModal } from "./bio-modal";

interface AboutCardProps {
  hostName: string
  hostIdentity: string
  viewerIdentity: string
  bio: string | null
  followByCount: number
}

const AboutCard: FC<AboutCardProps> = (props) => {
  const { bio, hostName, hostIdentity, viewerIdentity, followByCount } = props;
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = hostAsViewer === viewerIdentity;
  const followByLabel = followByCount === 1 ? "follower" : "fllowers";

  return (
    <div
      className="p-4"
    >
      <div
        className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3"
      >
        <div
          className="flex items-center justify-between"
        >
          <div
            className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl"
          >
            About {hostName}
            <VerifiedMark/>
          </div>
          {
            isHost && (
              <BioModal
                initialValue={bio}
              />
            )
          }
        </div>
        <div
          className="text-sm text-muted-foreground"
        >
          <span
            className="font-semibold text-primary"
          >
          {followByCount} 
          </span> {followByLabel}
        </div>
        <p
          className="text-sm"
        >
          { bio || "This user prefers to keep an air of mystery about them." }
        </p>
      </div>
    </div>
  )
}

export { AboutCard }