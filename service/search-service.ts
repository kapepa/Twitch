import { getSelf } from "./auth-service";
import prisma from "@/lib/db";
import { GetSearchType } from "@/types/GetSearchType";

const getSearch = async (term?: string): Promise<GetSearchType[] | undefined> => {
  let userId: string | null;
  let streams: GetSearchType[] = [];

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  if (!!userId) streams = await prisma.stream.findMany({
    where: {
      user: {
        NOT: {
          blocker: {
            some: {
              blockedId: userId
            }
          }
        }
      },
      OR: [
        {
          name: {
            contains: term
          }
        },
        {
          user: {
            username: {
              contains: term
            }
          }
        }
      ]
    },
    select: {
      id: true,
      name: true,
      user: true,
      isLive: true,
      updatedAt: true,
      thumbnailUrl: true,
    },
    orderBy: [
      {
        isLive: "desc"
      },
      {
        updatedAt: "desc"
      }
    ]
  });
  else streams = await prisma.stream.findMany({
    where: {
      OR: [
        {
          name: {
            contains: term
          }
        },
        {
          user: {
            username: {
              contains: term
            }
          }
        }
      ]
    },
    select: {
      id: true,
      name: true,
      user: true,
      isLive: true,
      updatedAt: true,
      thumbnailUrl: true,
    },
    orderBy: [
      {
        isLive: "desc"
      },
      {
        updatedAt: "desc"
      }
    ]
  })

  return streams;
};

export { getSearch }