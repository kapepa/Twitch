import prisma from "@/lib/db"
import { resolve } from "path";

const getRecommended = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return users;
}

export { getRecommended } 