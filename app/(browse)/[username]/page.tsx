import { isFollowingUser } from "@/service/follow-service";
import { getUserByUsername } from "@/service/user-service";
import { NextPage } from "next";
import { notFound } from "next/navigation";
import { isBlockedByUser } from "@/service/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UsernamePageProps {
  params: { username: string }
}

const UsernamePage: NextPage<UsernamePageProps> = async (props) => {
  const { params: { username } } = props;
  const user = await getUserByUsername(username);

  if (!user || !user.stream) notFound();

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id)

  if (isBlocked) notFound();

  return (
    <StreamPlayer
      player={user}
      stream={user.stream}
      isFollowing={isFollowing}
    />
  )
}

export default UsernamePage