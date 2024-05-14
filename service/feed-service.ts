import { Stream } from "@prisma/client";
import { getSelf } from "./auth-service";
import prisma from "@/lib/db";

const getStreams = async () => {
  let userId: string | null;
  let streams;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  if (!!userId) {
    streams = await prisma.stream.findMany({
      where: {
        user: {
          NOT: {
            blocker: {
              some: {
                blockedId: userId,
              }
            }
          }
        }
      },
      select: {
        id: true,
        user: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
      },
      orderBy: [
        { isLive: "desc" },
        { updatedAt: "desc" },
      ],
    })
  } else {
    streams = await prisma.stream.findMany({
      select: {
        id: true,
        user: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
      },
      orderBy: [
        { isLive: "desc" },
        { updatedAt: "desc" },
      ],
    })
  }

  return streams;
}

export { getStreams } 