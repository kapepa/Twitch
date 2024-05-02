import { ROUTERS } from "@/emun/routers";
import { getSelfByUsername } from "@/service/auth-service";
import { redirect } from "next/navigation";
import { FC, ReactNode } from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreaterLayoutProps {
  params: { username: string }
  children: ReactNode,
}

const CreaterLayout: FC<CreaterLayoutProps> = async (props) => {
  const { children, params: { username } } = props;
  const self = await getSelfByUsername(username);

  if (!self) redirect(ROUTERS.Home);

  return (
    <>
      <Navbar/>
      <div
        className="flex h-full pt-20"
      >
        <Sidebar/>
        <Container>
          {children}
        </Container>
      </div>
    </>
  )
}

export default CreaterLayout;