"use server"

import { ROUTERS } from '@/emun/routers';
import prisma from '@/lib/db';
import { getSelf } from '@/service/auth-service';
import { RoomServiceClient, IngressInput, CreateIngressOptions, TrackSource, IngressVideoEncodingPreset, IngressClient, IngressVideoOptions, IngressAudioOptions, IngressAudioEncodingPreset } from 'livekit-server-sdk';
import { revalidatePath } from 'next/cache';

const roomService = new RoomServiceClient(
  String(process.env.LIVEKIT_API_URL), 
  process.env.LIVEKIT_API_KEY, 
  process.env.LIVEKIT_API_SECRET
);

const ingressClient = new IngressClient(
  String(process.env.LIVEKIT_API_URL), 
  // process.env.LIVEKIT_API_KEY, 
  // process.env.LIVEKIT_API_SECRET
);

const resetCreateIngress = async (roomName: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName 
  })

  const rooms = await roomService.listRooms([roomName]);

  for (const room of rooms) await roomService.deleteRoom(room.name);

  for (const ingress of ingresses) {
    if (!!ingress.ingressId) await ingressClient.deleteIngress(ingress.ingressId);
  }
}

const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();

  await resetCreateIngress(self.id)

  const ingress: CreateIngressOptions = {
    name: self.username!,
    roomName: self.id,
    participantName: self.username!,
    participantIdentity: self.id,
    video: new IngressVideoOptions({
      source: TrackSource.SCREEN_SHARE,
      encodingOptions: {
        case: 'preset',
        value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      },
    }),
    audio: new IngressAudioOptions({
      source: TrackSource.MICROPHONE,
      encodingOptions: {
        case: 'preset',
        value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
      }
    })
  }

  const create = await ingressClient.createIngress(IngressInput.RTMP_INPUT, ingress);

  if (!create || !create.url || !create.streamKey) throw new Error("Failed to create");

  await prisma.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: create.ingressId,
      serverUrl: create.url,
      streamKey: create.streamKey,
    }
  });

  revalidatePath(`${ROUTERS.User}/${self.username}${ROUTERS.Keys}`);

  return create;
}

export { createIngress, resetCreateIngress }