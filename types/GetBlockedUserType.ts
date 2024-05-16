import { Block, User } from "@prisma/client";

export type GetBlockedUserType = Block & { blocked: User }