import { Stream, User } from "@prisma/client";

export type GetSearchType = Stream & { user: User }