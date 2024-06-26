"use client"

import { Maximize, Minimize } from "lucide-react";
import { FC } from "react";
import { Hint } from "../hint";
import { Button } from "../ui/button";

interface FullscreenControlProps {
  isFullscreen: boolean,
  onToggle: () => void,
}

const FullscreenControl: FC<FullscreenControlProps> = (props) => {
  const { isFullscreen, onToggle } = props;
  const Icon = isFullscreen ? Minimize : Maximize;
  const label = isFullscreen ? "Exit fullscreen" : "Enter fullscreem";

  return (
    <div
      className="flex items-center justify-center gap-4"
    >
      <Hint
        label={label}
      >
        <Button
          variant="ghost"
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
          asChild
        >
          <Icon 
            className="h-5 w-5"
          />
        </Button>
      </Hint>
    </div>
  )
}

export { FullscreenControl }