import prisma from "@/lib/db"
import { UserByUsernameType } from "@/types/UserByUsernameType";

const getUserByUsername = async (username: string): Promise<UserByUsernameType | null> => {
  const user = await prisma.user.findUnique({
    where: {
      username
    },
    select: {
      id: true,
      username: true,
      bio: true,
      imageUrl: true,
      externalUserId: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,
        }
      },
      _count: {
        select: {
          folower: true,
        }
      }
    }
  })

  return user;
}

const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ 
      where: {
        id
      },
      include: {
        stream: true,
      }
    })

    return user;
  } catch {
    return null;
  }
}

export { getUserByUsername, getUserById }