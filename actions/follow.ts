"use server"

import { followUser, unFollowUser } from "@/service/follow-service";
import { revalidatePath } from "next/cache";

const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");

    if (followedUser) revalidatePath(`/${followedUser.following.username}`);

    return followedUser;
  } catch {
    throw new Error("Internal Error")
  }
};

const onUnfollow = async (id: string) => {
  try {
    const unFollowdUser = await unFollowUser(id);

    revalidatePath("/");

    if (unFollowdUser) revalidatePath(`/${unFollowdUser.following.username}`);

    return unFollowdUser;
  } catch {
    throw new Error("Internal Error")
  }
}

export { onFollow, onUnfollow }