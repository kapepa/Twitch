"use client"

import { ROUTERS } from "@/emun/routers";
import { NavigationRoute } from "@/interface/navigation-route";
import { useUser } from "@clerk/nextjs";
import { Fullscreen, KeyRound, MessageSquare, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { NavItem, NavItemSkeleton } from "./nav-item";

const Navigation: FC = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routers: NavigationRoute[] = [
    { 
      label: "Stream",
      href: `${ROUTERS.User}/${user?.username}`,
      ico: Fullscreen,
    },
    {
      label: "Keys",
      href: `${ROUTERS.User}/${user?.username}${ROUTERS.Keys}`,
      ico: KeyRound,
    },
    {
      label: "Chat",
      href: `${ROUTERS.User}/${user?.username}${ROUTERS.Chat}`,
      ico: MessageSquare,
    },
    {
      label: "Community",
      href: `${ROUTERS.User}/${user?.username}${ROUTERS.Community}`,
      ico: User,
    },
  ]

  if (!user?.username){
    const skeletonCell = Array(4).fill(null);

    return (
      <ul
        className="space-y-2 px-0 pt-4 lg:pt-0"
      >
        {
          skeletonCell.map((_, index) => (
            <NavItemSkeleton
              key={`nav-item-skeleton-${index}`}
            />
          ))
        }
      </ul>
    )
  }

  return (
    <ul
      className="space-y-2 px-2 pt-4 lg:pt-0"
    >
      {
        routers.map((route, index) => (
          <NavItem
            key={`${route.href}-${index}`}
            label={route.label}
            href={route.href}
            ico={route.ico}
            isActive={route.href === pathname}
          />
        ))
      }
    </ul>
  )
}

export { Navigation }