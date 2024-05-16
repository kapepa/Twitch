import { FC } from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logoSvg from "@/public/spooky.svg";

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
    <div
      className={cn("flex flex-col items-center gap-y-4", className)}
    >
      <div
        className="bg-white rounded-full p-4"
      >
        <Image
          src={logoSvg}
          alt="/spooky.svg"
          height={60}
          width={60}
        />
      </div>
      <div
        className={cn("flex flex-col items-center", font.className)}
      >
        <p
          className="text-xl font-semibold"
        >
          Gamehub
        </p>
        <p
          className="text-sm text-muted-foreground"
        >
          Let&aposts play
        </p>
      </div>
    </div>
  )
}

export { Logo }