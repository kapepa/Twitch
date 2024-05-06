"use client"

import { createIngress } from "@/actions/ingress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";
import { AlertTriangle } from "lucide-react";
import { ElementRef, FC, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

const ConnectModal: FC = () => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(() => {
      try {
        createIngress(parseInt(ingressType))
        toast.success("Ingress created")
        closeRef.current?.click();
      } catch {
        toast.error("Something went wrong")
      }
    })
  }

   return (
    <Dialog>
      <DialogTrigger
        asChild
      >
        <Button
          variant="primary"
        >
          Generate connection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Generate
          </DialogTitle>
        </DialogHeader>
        <Select
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
          disabled={isPending}
        >
          <SelectTrigger
            className="w-full"
          >
            <SelectValue 
              placeholder="Ingress Type"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle
            className="h-4 w-4"
          />
          <AlertTitle>
            Warning!
          </AlertTitle>
          <AlertDescription>
            This action will reset all active stream using the current connection.
          </AlertDescription>
        </Alert>
        <div
          className="flex justify-between"
        >
          <DialogClose
            asChild
            ref={closeRef}
          >
            <Button
              variant="ghost"
              disabled={isPending}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={onSubmit}
            variant="primary"
            disabled={isPending}
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ConnectModal }