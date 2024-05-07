"use client"

import { useSidebar } from "@/store/use-sidebar";
import { Follow, Stream, User } from "@prisma/client";
import { FC, useEffect } from "react";
import { UserItem, UserItemSkeleton } from "./user-item";

interface FollowingProps {
  follows: (Follow & { following: (User & { stream: Stream | null }) })[],
}

const Following: FC<FollowingProps> = (props) => {
  const { follows } = props;
  const { collapsed } = useSidebar((state) => state);

  if (!follows.length) return null;

  return (
    <div>
      {
        !collapsed && (
          <div
            className="pl-6 mb-4"
          >
            <p
              className="text-sm text-muted-foreground"
            >
              Following
            </p>
          </div>
        )
      }
      <ul
        className="space-y-2 px-2"
      >
        {
          follows.map(({ following }, index) => (
            <UserItem
              key={`${following.id}-${index}`}
              user={following}
              isLive={following.stream?.isLive}
            />
          ))
        }
      </ul>
    </div>
  )
}

const FollowingSkeleton: FC = () => {
  const emptyCell = Array(3).fill("");

  return (
    <ul
      className=""
    >
      {
        emptyCell.map((_, index) => (
          <UserItemSkeleton
            key={`following-skeleton-${index}`}
          />
        ))
      }
    </ul>
  )
}

export { Following, FollowingSkeleton }