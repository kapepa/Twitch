import prisma from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();

  const authorization = headerPayload.get("Authorization");
  if (!authorization) throw NextResponse.json("No authorization header", { status: 401 });

  const event = await receiver.receive(body, authorization, true);

  if (event.event === "ingress_started") {
    await prisma.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: true,
      }
    })
  }

  if (event.event === "ingress_ended") {
    await prisma.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      }
    })
  }
  return NextResponse.json({ status: 200 })
}