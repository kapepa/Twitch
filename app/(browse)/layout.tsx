import { FC, ReactNode } from "react";
import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";
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
        <Sidebar/>
        <Container>
          { children }
        </Container>
      </div>
    </>
  )
}

export default BrowseLayout;