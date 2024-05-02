"use client"

import { FC } from "react";
import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import { Navigation } from "./navigation";

const Sidebar: FC = () => {
  return (
    <Wrapper>
      <Toggle/>
      <Navigation/>
    </Wrapper>
  )
}

export { Sidebar }