import { isFollowingUser } from "@/service/follow-service";
import { getUserByUsername } from "@/service/user-service";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/service/block-service";

interface UsernamePageProps {
  params: { username: string }
}

const UsernamePage: NextPage<UsernamePageProps> = async (props) => {
  const { params: { username } } = props;
  const user = await getUserByUsername(username);

  if (!user) notFound();

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id)

  return (
    <div
      className="flex flex-col gap-y-4"
    >
      <p>Id: {user.id}</p>
      <p>Username: {user.username}</p>
      <p>Is Following: {JSON.stringify(isFollowing)}</p>
      <p>Is Blocked: {JSON.stringify(isBlocked)}</p>
      <Actions
        userId={user.id}
        isBlocked={isBlocked}
        isFollowing={isFollowing}
      />
    </div>
  )
}

export default UsernamePage