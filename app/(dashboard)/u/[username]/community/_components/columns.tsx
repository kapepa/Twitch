"use client"

import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/user-avatar"
import { GetBlockedUserType } from "@/types/GetBlockedUserType"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { UnblockButton } from "./unblock-button"

export type CommunityType = Omit<GetBlockedUserType, "user" | "createdAt"> & Pick<GetBlockedUserType["blocked"], "username" | "imageUrl"> & { userId: string, createdAt: string }

export const columns: ColumnDef<CommunityType>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => (
      <div
        className="flex items-center gap-4"
      >
        <UserAvatar
          username={row.original.username || ""}
          imageUrl={row.original.imageUrl}
        />
        <span>
          {row.original.username}
        </span>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date blocked
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => (
      <UnblockButton
        userId={row.original.userId}
      />
    )
  },
]
