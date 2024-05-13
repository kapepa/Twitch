"use server"

import { ROUTERS } from "@/emun/routers";
import prisma from "@/lib/db";
import { getSelf } from "@/service/auth-service";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

const updateUser = async (values: Partial<User>) => {
  try {
    const self = await getSelf();

    const user = await prisma.user.update({
      where: {
        id: self.id,
      },
      data: {
        bio: values.bio
      }
    })

    revalidatePath(`/${self.username}`);
    revalidatePath(`${ROUTERS.User}/${self.username}`);

    return user;
  } catch {
    return new Error("Internal Error");
  }
}

export { updateUser }