"use server"

import { ROUTERS } from "@/emun/routers";
import prisma from "@/lib/db";
import { getSelf } from "@/service/auth-service"
import { Stream } from "@prisma/client"
import { revalidatePath } from "next/cache";

const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();
    const existing = await prisma.stream.findUnique({
      where: {
        userId: self.id,
      }
    })
    if (!existing) throw new Error("Stream not found");

    const stream = await prisma.stream.update({
      where: { 
        userId : self.id,
      },
      data: values,
    });

    revalidatePath(`${ROUTERS.User}/${self.username}${ROUTERS.Chat}`);
    revalidatePath(`${ROUTERS.User}/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch {
    throw new Error("Internal Error")
  }
};

export { updateStream }