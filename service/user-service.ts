import prisma from "@/lib/db"

const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username
    },
    include: {
      stream: true,
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