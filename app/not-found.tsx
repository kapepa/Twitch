"use client"

import { Button } from "@/components/ui/button";
import { ROUTERS } from "@/emun/routers";
import Link from "next/link";
import { FC } from "react"

const RootNotFound: FC = () => {
  return (
    <div
      className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground"
    >
      <h1
        className="text-4xl"
      >
        404
      </h1>
      <p>
        we coudn't find the page, you were looking for
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

export default RootNotFound;