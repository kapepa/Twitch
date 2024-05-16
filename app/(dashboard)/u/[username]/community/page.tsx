import { NextPage } from "next";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getBlockedUser } from "@/service/block-service";
import { format } from "date-fns";

const CommunityPage: NextPage = async () => {
  const blocked = await getBlockedUser() || [];

  const formatBlocked = blocked.map(block => ({
    ...block,
    userId: block.blocked.id,
    imageUrl: block.blocked.imageUrl,
    username: block.blocked.username,
    createdAt: format(new Date(block.blocked.createdAt), "dd/MM/yyyy"),
  }))

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={formatBlocked} />
    </div>
  )
}

export default CommunityPage;