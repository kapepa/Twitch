"use server"

import { v4 as uuidv4 } from 'uuid';
import { AccessToken } from "livekit-server-sdk";
import { getSelf } from '@/service/auth-service';
import { getUserById } from '@/service/user-service';
import { isBlockedByUser } from '@/service/block-service';

const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    self = await getSelf();
  } catch {
    const id = uuidv4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;
    self = { id, username };
  }

  const host = await getUserById(hostIdentity);
  if (!host) throw new Error("User not found");

  const isBlocked = await isBlockedByUser(host.id);
  if (isBlocked) throw new Error("User is blocked");

  const isHost = self.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY, 
    process.env.LIVEKIT_API_SECRET, 
    { 
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username!,
    }
  );

  token.addGrant({ 
    room: host.id, 
    roomJoin: true, 
    canPublish: false, 
    canSubscribe: true, 
  });

  return await token.toJwt();
}

export { createViewerToken }