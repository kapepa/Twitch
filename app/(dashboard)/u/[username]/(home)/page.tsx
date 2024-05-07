import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/service/user-service";
import { currentUser } from "@clerk/nextjs/server";
import { NextPage } from "next";

interface CreaterPageProps {
  params: { username: string }
}

const CreaterPage: NextPage<CreaterPageProps> = async (props) => {
  const { params } = props;
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) throw new Error("Unauthorized");

  return (
    <div
      className="h-full"
    >
      <StreamPlayer
        player={user}
        stream={user.stream}
        isFollowing={true}
      />
    </div>
  )
}

export default CreaterPage;