import { FC } from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

import Link from "next/link";
import { ROUTERS } from "@/emun/routers";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

interface LogoProps {
  className?: string,
}

const Logo: FC<LogoProps> = (props) => {
  const { className } = props;

  return (
    <Link
      href={ROUTERS.Home}
    >
      <div
        className="flex items-center gap-x-4 hover:opacity-75 transition"
      >
        <div
          className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink"
        >
          <Image
            width={32}
            height={32}
            src={"/spooky.svg"}
            alt="Logo"
          />
        </div>
        <div
          className={cn(
            "hidden lg:block",
            font.className,
          )}
        >
          <p
            className="text-lg font-semibold"
          >
            Gamehub
          </p>
          <p
            className="text-xs text-muted-foreground"
          >
            Let&aposs play
          </p>
        </div>
      </div>
    </Link>
  )
}

export { Logo }