"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { SidebarEnum } from "@/emun/sidebar";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { FC } from "react"

const Toggle: FC = () => {
  const { collapsed, onCallapse, onExpand } = useSidebar((state) => state);
  const label: SidebarEnum = collapsed ? SidebarEnum.Espand : SidebarEnum.Collapse;

  return (
    <>
      {
        !!collapsed && (
          <div
            className="hidden lg:flex w-full items-center justify-center pt-4 mb-4"
          >
            <Hint
              label={ label }
              side="right"
              asChild
            >
              <Button
                onClick={onExpand}
                className="h-auto p-2"
                variant="ghost"
              >
                <ArrowRightFromLine
                  className="h-4 w-4"
                />
              </Button>
            </Hint>
          </div>
        )
      }
      {
        !collapsed && (
          <div
            className="p-3 pl-6 flex items-center w-full"
          >
            <p
              className="font-semibold text-primary"
            >
              For you
            </p>
            <Hint
              label={ label }
              side="right"
              asChild
            >
              <Button
                onClick={onCallapse}
                className="h-auto p-2 ml-auto"
                variant="ghost"
              >
                <ArrowLeftFromLine
                  className="h-4 w-4"
                />
              </Button>
            </Hint>
          </div>
        )
      }
    </>
  )
}

export { Toggle }