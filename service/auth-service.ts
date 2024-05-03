import { currentUser } from "@clerk/nextjs/server"
import prisma from "../lib/db";
import { User } from "@prisma/client";

const getSelf = async (): Promise<User> => {
  const current = await currentUser();
  if ( !current ) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { externalUserId: current.id } });
  if (!user) throw new Error("User not found")

  return user
}

const getSelfByUsername = async (username: string) => {
  try {
    const current = await currentUser();
    if (!current) throw new Error("Unauthorized");
  
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });
  
    if (!user) throw new Error("User not found");
    if (user.username !== username) throw new Error("Unauthorized");
  
    return user;
  } catch {
    return null;
  }
}

export { getSelf, getSelfByUsername }