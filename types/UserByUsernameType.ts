import { Stream, User } from "@prisma/client";

export type UserByUsernameStreamType = Pick<Stream, "id" | "name" | "isLive" | "isChatDelayed" | "isChatEnabled" | "isChatFollowersOnly" | "thumbnailUrl">;

export type UserByUsernameType = Pick<User, "id" | "username" | "externalUserId" | "bio" | "imageUrl"> & {
  stream: UserByUsernameStreamType | null,
  _count: {
    folower: number
  }
};
