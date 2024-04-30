import { FC } from "react";
import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/service/recommended-service";

const Sidebar: FC = async () => {
  const recommended = await getRecommended();

  return (
    <Wrapper>
      <Toggle/>
      <div
        className="space-y-4 pt-4 lg:pt-0"
      >
        <Recommended
          users={recommended}
        />
      </div>
    </Wrapper>
  )
}

const SidebarSkeleton: FC = async () => {
  
  return (
    <aside
      className="fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50"
    >
      <div
        className="space-y-4 pt-4 lg:pt-0"
      >
        <RecommendedSkeleton/>
      </div>
    </aside>
  )
}

export { Sidebar, SidebarSkeleton };