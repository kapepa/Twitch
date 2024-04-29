import { FC, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

type SideType = "top" | "bottom" | "left" | "right";
type AlignType = "start" | "center" | "end";

interface HintProps {
  label: string,
  children: ReactNode,
  asChild?: boolean,
  side?: SideType,
  align?: AlignType,
}

const Hint: FC<HintProps> = (props) => {
  const { label, children, asChild, side, align } = props;

  return (
    <TooltipProvider>
      <Tooltip
        delayDuration={0}
      >
        <TooltipTrigger
          asChild={asChild}
        >
          { children }
        </TooltipTrigger>
        <TooltipContent
          className="text-black bg-white"
          side={side}
          align={align}
        >
          <p
            className="font-semibold"
          >
            { label }
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export { Hint }