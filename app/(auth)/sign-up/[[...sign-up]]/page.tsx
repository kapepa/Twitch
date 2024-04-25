import { ROUTERS } from "@/emun/routers";
import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return <SignUp path={ROUTERS.SignUp} />;
}