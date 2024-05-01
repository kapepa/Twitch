import prisma from "@/lib/db"
import { getSelf } from "./auth-service";

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
        NOT: { id: userId }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  } else {
    users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
  }



  return users;
}

export { getRecommended } 