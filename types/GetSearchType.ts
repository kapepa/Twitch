import { Stream, User } from "@prisma/client";

export type GetSearchType = Pick<Stream, "id" | "name" | "isLive" | "thumbnailUrl" | "updatedAt"> & { user: User }