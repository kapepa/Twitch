"use client"

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { FC, ReactNode, useEffect, useMemo, useState } from "react"
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
  children: ReactNode,
}

const Wrapper: FC<WrapperProps> = (props) => {
  const { children } = props;
  const [ isClient, setIsClient ] = useState<boolean>(false);
  const { collapsed } = useSidebar((state) => state);

  useEffect(() => {
    setIsClient(true);
  }, [])

  const currentContent = useMemo(() => {
    return isClient 
    ? children 
    : (
      <>
        <ToggleSkeleton/>
        <FollowingSkeleton/>
        <RecommendedSkeleton/>
      </>
    );
  }, [isClient, children])


  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]",
      )}
    >
      { currentContent }
    </aside>
  )
}

export { Wrapper }