import prisma from "@/lib/db";
import { getSelf } from "./auth-service"

const isFollowingUser = async (id: string): Promise<boolean> => {
  try {
    const self = await getSelf();
    const otherUser = await prisma.user.findUnique({ where: { id } });
    if (!otherUser) throw new Error("User not found");

    if (self.id === otherUser.id) return true;

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      }
    })

    return !!existingFollow;
  } catch {
    return false
  }
}

const followUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await prisma.user.findUnique({
    where: { id }
  })

  if (!otherUser) throw new Error("User not found");
  if (otherUser.id === self.id) throw new Error("Cannot follow yourself");

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: self.id, 
      followingId: otherUser.id,   
    }
  });

  if (existingFollow) throw new Error("Already following the existing");

  const follow = await prisma.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      folower: true,
      following: true,
    }
  })

  return follow;
}

const unFollowUser = async (id: string) => {
  const self = await getSelf();

  const otherUser = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!otherUser) throw new Error("User not found");
  if (otherUser.id === self.id) throw new Error("Cannot unfollow yourself");

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    }
  })

  if (!existingFollow) throw new Error("Not following");

  const follow = await prisma.follow.delete({
    where: { 
      id: existingFollow.id,
    },
    include: {
      following: true,
    }
  })

  return follow;
}

const getFollowedUsers = async () => {
  try {
    const self = await getSelf();

    const followedUsers = await prisma.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocker: {
            none: {
              blockedId: self.id
            }
          }
        }
      },
      include: {
        following: {
          include: {
            stream: true,
          }
        },
      }
    })
    
    return followedUsers;
  } catch {
    return []
  }
}

export { isFollowingUser, followUser, unFollowUser, getFollowedUsers }