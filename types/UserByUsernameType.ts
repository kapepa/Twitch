import { Stream, User } from "@prisma/client";

export type UserByUsernameType = Pick<User, "id" | "username" | "externalUserId" | "bio" | "imageUrl"> & {
  stream: Pick<Stream, "id" | "name" | "isLive" | "isChatDelayed" | "isChatEnabled" | "isChatFollowersOnly" | "thumbnailUrl"> | null,
  _count: {
    folower: number
  }
};
