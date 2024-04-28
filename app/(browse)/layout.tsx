import { FC, ReactNode } from "react";
import { Navbar } from "./_components/navbar";

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
        { children }
      </div>
    </>
  )
}

export default BrowseLayout;