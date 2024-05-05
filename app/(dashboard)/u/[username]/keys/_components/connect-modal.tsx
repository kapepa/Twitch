"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";
import { FC } from "react";

const ConnectModal: FC = () => {
  const onGenerate = () => {

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
        <Select>
          <SelectTrigger
            className="w-full"
          >
            <SelectValue 
              placeholder="Ingress Type"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="RTMP">RTMP</SelectItem>
            <SelectItem value="WHIP">WHIP</SelectItem>
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
          >
            <Button
              variant="ghost"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={onGenerate}
            variant="primary"
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ConnectModal }