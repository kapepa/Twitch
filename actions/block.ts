"use server"

import { blockUser, unblockUser } from "@/service/block-service"
import { revalidatePath } from "next/cache";

const onBlock = async (id: string) => {
  const block = await blockUser(id);

  revalidatePath("/");

  if (!!block) revalidatePath(`/${block.blocked.username}`);

  return block;
}

const onUnblock = async (id: string) => {
  const block = await unblockUser(id);

  revalidatePath("/");

  if (!!block) revalidatePath(`/${block.blocked.username}`);

  return block;
}

export { onBlock, onUnblock };