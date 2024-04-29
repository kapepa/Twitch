"use client"

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { FC, ReactNode, useEffect } from "react";
import { useMediaQuery } from 'usehooks-ts'

interface ContainerProps {
  children: ReactNode,
}

const Container: FC<ContainerProps> = (props) => {
  const { children } = props; 
  const { collapsed, onCallapse, onExpand } = useSidebar((state) => state);
  const matches = useMediaQuery('(max-width: 1024px)');

  useEffect(() => {
    if (matches) onCallapse(); 
    else onExpand();
  }, [matches])

  return (
    <div
      className={cn(
        "flex-1",
        collapsed ? "ml-[70px]": "ml-[70px] lg:ml-60",
      )}
    >
      { children }
    </div>
  )
}

export { Container }