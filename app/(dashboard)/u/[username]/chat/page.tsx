import { getSelf } from "@/service/auth-service";
import { getStreamByUserId } from "@/service/stream-service";
import { NextPage } from "next";
import { ToggleCard } from "./_components/toggle-card";

interface ChatPageProps {
  params: { username: string }
}

const ChatPage: NextPage<ChatPageProps> = async (props) => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) throw new Error("Stream not found");

  return (
    <div
      className="p-6"
    >
      <div
        className="mb-4"
      >
        <h1
          className="text-2xl font-bold"
        >
          Chat settings
        </h1>
      </div>
      <div
        className="space-y-4"
      >
        <ToggleCard
          field="isChatEnabled"
          label="Enabled chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Chat delayed"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Chat followers only"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  )
}

export default ChatPage;