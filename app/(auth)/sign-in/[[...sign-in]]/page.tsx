import { ROUTERS } from "@/emun/routers";
import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return <SignIn path={ROUTERS.SignIn} />;
}