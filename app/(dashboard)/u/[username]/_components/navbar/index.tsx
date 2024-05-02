import { FC } from "react";
import { Logo } from "./logo";
import { Actions } from "./actions";

const Navbar: FC = ( props ) => {
  const {} = props;

  return (
    <nav
      className="fixed top-0 w-full h-20 z-[49] bg-nav px-2 lg:px-4 flex justify-between items-center shadow-sm"
    >
      <Logo/>
      <Actions/>
    </nav>
  )
}

export { Navbar }