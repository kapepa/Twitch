import prisma from "@/lib/db";
import { getSelf } from "./auth-service";
import { Block } from "@prisma/client";
import { GetBlockedUserType } from "@/types/GetBlockedUserType";

const isBlockedByUser = async (id: string): Promise<boolean> => {
  try{
    const self = await getSelf();

    const otherUser =  await prisma.user.findUnique({ 
      where: { id } 
    });

    if (!otherUser) throw new Error("User not found");
    if (otherUser.id === self.id) return false

    const existingBlock = await prisma.block.findFirst({
      where: { 
        blockerId: self.id,
        blockedId: otherUser.id,
      }
    })

    return !!existingBlock;
  } catch {
    return false;
  }
}

const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) throw new Error("Cannot block yourself");

  const otherUser = await prisma.user.findUnique({
    where: { id }
  });
  if (!otherUser) throw new Error("User not found");

  const existingBlock = await prisma.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      }
    }
  })

  if (existingBlock) throw new Error("Already blocked");

  const block = await prisma.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    }
  })

  return block;
}

const unblockUser = async (id: string) => {
  const self = await getSelf();
  if (self.id === id) throw new Error("Cannot block yourself");

  const otherUser = await prisma.user.findUnique({
    where: { id }
  });
  if (!otherUser) throw new Error("User not found");

  const existingBlock = await prisma.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: otherUser.id,
      }
    }
  })
  if (!existingBlock) throw new Error("Not blocked");

  const unblock = await prisma.block.delete({
    where: { 
      id: existingBlock.id, 
    },
    include: {
      blocked: true,
    }
  })

  return unblock;
}

const getBlockedUser = async (): Promise<GetBlockedUserType[] | null> => {
  const self = await getSelf();

  const blockedUsers = await prisma.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocked: true,
    }
  })

  return blockedUsers;
}

export { isBlockedByUser, blockUser, unblockUser, getBlockedUser };