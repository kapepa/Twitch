import prisma from "@/lib/db"

const getStreamByUserId = async (userId: string) => {
  const stream = await prisma.stream.findUnique({
    where: { userId },
  });

  return stream;
}

export { getStreamByUserId }