import prisma from "@/lib/db";
import { getSelf } from "@/service/auth-service";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();

export const ourFileRouter = {
  thumbnaiUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const self = await getSelf();
      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.stream.update({
        where: {
          userId: metadata.user.id
        },
        data: {
          thumbnailUrl: file.url
        }
      })

      return { fileUrl: file.url }
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;