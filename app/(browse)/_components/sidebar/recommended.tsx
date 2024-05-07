"use client"

import { useSidebar } from "@/store/use-sidebar";
import { Stream, User } from "@prisma/client";
import { FC } from "react";
import { UserItem, UserItemSkeleton } from "./user-item";

interface RecommendedProps {
  users: (User & { stream: Stream | null })[];
}

const Recommended: FC<RecommendedProps> = (props) => {
  const { users } = props;
  const { collapsed } = useSidebar(state => state);

  const showLabel = !collapsed && !!users.length;

  return (
    <div>
      {
        showLabel && (
          <div
            className="pl-6 mb-4"
          >
            <p
              className="text-sm text-muted-foreground"
            >
              Recommended
            </p>
          </div>
        )
      }
      <ul
        className="space-y-2 px-2"
      >
        {
          users.map((user, index) => (
            <UserItem
              key={`${user.id}-${index}`}
              user={user}
              isLive={user.stream?.isLive}
            />
          ))
        }
      </ul>
    </div>
  )
}

const RecommendedSkeleton: FC = () => {
  const skeletonCell = Array(3).fill("");

  return (
    <ul
      className="space-y-2 px-2"
    >
      {
        skeletonCell.map((_, index) => (
          <UserItemSkeleton
            key={`user avatar skeleton - ${index}`}
          />
        ))
      }
    </ul>
  )
}

export { Recommended, RecommendedSkeleton }