import { ROUTERS } from "@/emun/routers";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <UserButton 
        afterSignOutUrl={ROUTERS.Home}
      />
    </div>
  );
}
