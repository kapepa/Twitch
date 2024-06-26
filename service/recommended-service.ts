import prisma from "@/lib/db"
import { getSelf } from "./auth-service";
import { revalidatePath } from "next/cache";

const getRecommended = async () => {
  let userId: string | null = null;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (!!userId) {
    users = await prisma.user.findMany({
      where: {
        AND: [
          {
            NOT: { id: userId },
          },
          {
            NOT: {
              following: {
                some: {
                  followerId: userId,
                }
              }
            }
          },
          {
            NOT: {
              blocked: {
                some: {
                  blockerId: userId
                }
              }
            }
          }
        ]
      },
      include: {
        stream: {
          select: {
            isLive: true,
          }
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  } else {
    users = await prisma.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true,
          }
        },
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  return users;
}

export { getRecommended } 