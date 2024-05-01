import { FC } from "react";
import { Wrapper } from "./wrapper";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/service/recommended-service";
import { getFollowedUsers } from "@/service/follow-service";
import { Following, FollowingSkeleton } from "./following";

const Sidebar: FC = async () => {
  const recommended = await getRecommended();
  const follows = await getFollowedUsers();

  return (
    <Wrapper>
      <Toggle/>
      <div
        className="space-y-4 pt-4 lg:pt-0"
      >
        <Following
          follows={follows}
        />
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
        <ToggleSkeleton/>
        <FollowingSkeleton/>
        <RecommendedSkeleton/>
      </div>
    </aside>
  )
}

export { Sidebar, SidebarSkeleton };