"use client"

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useCreater } from "@/store/use-creater";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { FC } from "react";

const Toggle: FC = () => {
  const { collapsed, onExpand, onCallapse } = useCreater();
  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {
        collapsed && (
          <div
            className="w-full hidden lg:flex items-center justify-center pt-4 mb-4"
          >
            <Hint
              label={label}
              side="right"
              asChild
            >
              <Button
                className="h-auto p-2"
                variant="ghost"
                onClick={onExpand}
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
            className="p-3 pl-6 mb-6 hidden lg:flex items-center w-full"
          >
            <p
              className="font-semibold text-primary"
            >
              Dashboard
            </p>
            <Hint
              label={label}
              side="right"
              asChild
            >
              <Button
                className="h-auto p-2 ml-auto"
                variant="ghost"
                onClick={onCallapse}
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