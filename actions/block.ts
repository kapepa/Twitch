"use server"

import { ROUTERS } from "@/emun/routers";
import { getSelf } from "@/service/auth-service";
import { blockUser, unblockUser } from "@/service/block-service"
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  String(process.env.LIVEKIT_API_URL), 
  process.env.LIVEKIT_API_KEY, 
  process.env.LIVEKIT_API_SECRET
);

const onBlock = async (id: string) => {
  let blockedUser;

  const self = await getSelf();

  try {
    blockedUser = await blockUser(id);
  } catch {

  }

  try {
    await roomService.removeParticipant(self.id, id);
  } catch {

  }

  revalidatePath(`${ROUTERS.User}/${self.username}${ROUTERS.Community}`)

  return blockedUser;
}

const onUnblock = async (id: string) => {
  const block = await unblockUser(id);

  revalidatePath("/");

  if (!!block) { 
    revalidatePath(`${ROUTERS.User}/${block.blocked.username}${ROUTERS.Community}`);
    revalidatePath(`/${block.blocked.username}`);
  }

  return block;
}

export { onBlock, onUnblock };