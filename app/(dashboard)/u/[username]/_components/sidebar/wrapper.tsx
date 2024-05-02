"use client"

import { cn } from "@/lib/utils";
import { useCreater } from "@/store/use-creater";
import { FC, ReactNode } from "react";

interface WrapperProps {
  children: ReactNode,
}

const Wrapper: FC<WrapperProps> = (props) => {
  const { children } = props;
  const { collapsed } = useCreater();

  return (
    <div
      className={cn(
        "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "lg:w-[70px]"
      )}
    >
      { children }
    </div>
  )
}

export { Wrapper }