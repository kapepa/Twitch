"use client"

import { Button } from "@/components/ui/button";
import { ROUTERS } from "@/emun/routers";
import Link from "next/link";
import { FC } from "react";

const UsernameError: FC = () => {
  return (
    <div
      className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground"
    >
      <p>
        Something went wrong
      </p>
      <Button
        variant="secondary"
        asChild
      >
        <Link
          href={ROUTERS.Home}
        >
          Go back home
        </Link>
      </Button>
    </div>
  )
}

export default UsernameError;