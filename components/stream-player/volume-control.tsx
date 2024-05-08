"use client"

import { LucideIcon, Volume1, Volume2, VolumeX } from "lucide-react";
import { FC, createElement, useMemo } from "react"
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

interface VolumeControlProps {
  onToggle: () => void,
  onChange: (value: number) => void,
  value: number,
}

const VolumeControl: FC<VolumeControlProps> = (props) => {
  const { value, onChange, onToggle } = props;
  const isMuted = value === 0;
  const isAboveHalf = value > 50;
  const label = isMuted ? "Unmute" : "Mute";

  const CurrentVolume = useMemo((): LucideIcon => {
    if (isMuted) return VolumeX;
    if (isAboveHalf) return Volume2;
    return Volume1;
  }, [isMuted, isAboveHalf])

  const handleChange = (value: number[]) => {
    onChange(value[0]);
  }

  return (
    <div
      className="flex items-center gap-2"
    >
      <Hint
        label={label}
        asChild
      >
        <Button
          variant="ghost"
          onClick={onToggle}
          className="text-white hover:bg-white/10 p-1.5 rounded-lg"
        >
          {
            createElement(
              CurrentVolume,
              { className: "h-6 w-6" }
            )
          }
        </Button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  )
}

export { VolumeControl }