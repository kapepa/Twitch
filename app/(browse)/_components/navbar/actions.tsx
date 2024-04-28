import { Button } from "@/components/ui/button";
import { ROUTERS } from "@/emun/routers";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Actions: FC = async () => {
  const user = await currentUser();

  return (
    <div
      className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0"
    >
      {
        !user && (
          <SignInButton>
            <Button
              size="sm"
              variant="primary"
            >
              Login
            </Button>
          </SignInButton>
        )
      }
      {
        !!user && (
          <div
            className="flex items-center gap-x-4"
          >
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-pretty"
              asChild
            >
              <Link
                href={`/u/${user.username}`}
              >
                <Clapperboard
                  className="h-5 w-5 lg:mr-2"
                />
                <span
                  className="hidden lg:block"
                >
                  Dashboard
                </span>
              </Link>
            </Button>
            <UserButton
              afterSignOutUrl={ROUTERS.Home}
            />
          </div>
        )
      }
    </div>
  )
}

export { Actions }