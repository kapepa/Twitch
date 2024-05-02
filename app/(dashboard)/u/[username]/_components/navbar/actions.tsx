import { Button } from "@/components/ui/button";
import { ROUTERS } from "@/emun/routers";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Actions: FC = async () => {
  return (
    <div
      className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0"
    >
      <Button
        size="sm"
        variant="ghost"
        className="text-muted-foreground hover:text-primary"
        asChild
      >
        <Link
          href={ROUTERS.Home}
        >
          <LogOut
            className="h-5 w-5 mr-2"
          />
          Exit
        </Link>
      </Button>
      <UserButton 
        afterSignOutUrl={ROUTERS.Home}
      />
    </div>
  )
}

export { Actions }