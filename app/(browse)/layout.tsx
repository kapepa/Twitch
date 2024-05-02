import { FC, ReactNode, Suspense } from "react";
import { Navbar } from "./_components/navbar";

import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import { Container } from "./_components/container";

interface BrowseLayoutProps {
  children: ReactNode,
}

const BrowseLayout: FC<BrowseLayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <Navbar/>
      <div
        className="flex h-full pt-20"
      >
        <Suspense
          fallback={<SidebarSkeleton/>}
        >
          <Sidebar/>
        </Suspense>
        <Container>
          { children }
        </Container>
      </div>
    </>
  )
}

export default BrowseLayout;