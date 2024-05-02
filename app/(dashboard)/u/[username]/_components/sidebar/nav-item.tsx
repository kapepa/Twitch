"use client"

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { NavigationRoute } from "@/interface/navigation-route";
import { cn } from "@/lib/utils";
import { useCreater } from "@/store/use-creater";
import Link from "next/link";
import { FC, createElement } from "react";

interface NavItemProps extends NavigationRoute {
  isActive: boolean,
}

const NavItem: FC<NavItemProps> = (props) => {
  const { label, ico, href, isActive } = props;
  const { collapsed } = useCreater();

  const ViewIco = createElement(ico, { className: cn(
    "h-6 w-6",
    collapsed ? "mr-0" : "mr-2"
  ) });

  return (
    <li>
      <Button
        className={cn(
          "w-full h-12",
          collapsed ? "justify-center" : "justify-start",
          isActive && "bg-accent"
        )}
        variant="ghost"
        asChild
      >
        <Link
          href={href}
        >
          <div
            className="flex items-center gap-x-4"
          >
            { ViewIco }
            {
              !collapsed && (
                <span
                  className=""
                >
                  {label}
                </span>
              )
            }
          </div>
        </Link>
      </Button>
    </li>
  )
}

const NavItemSkeleton: FC = () => {
  return (
    <li
      className="flex items-center gap-x-4 px-3 py-2"
    >
      <Skeleton
        className="min-h-[48px] min-w-[48px] rounded-md"
      />
      <div
        className="flex-1 hidden lg:block"
      >
        <Skeleton
          className="h-6"
        />
      </div>
    </li>
  )
}

export { NavItem, NavItemSkeleton }