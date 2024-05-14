"use client"

import { ChangeEvent, FC, FormEvent, useRef, useState, useTransition } from "react"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { updateStream } from "@/actions/stream"
import { toast } from "sonner"
import { UploadDropzone } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { Hint } from "../hint"
import { Trash } from "lucide-react"
import Image from "next/image"

interface InfoModalProps {
  initialName: string
  initialThumbnaiUrl: string | null
}

type initialThumbnaiUrlType = InfoModalProps["initialThumbnaiUrl"];

const InfoModal: FC<InfoModalProps> = (props) => {
  const { initialName, initialThumbnaiUrl } = props;
  const closeRef = useRef<HTMLButtonElement>(null)
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [name, setName] = useState<string>(initialName);
  const [thumbnaiUrl, setThumbnaiUrl] = useState<initialThumbnaiUrlType>(initialThumbnaiUrl);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name })
      .then(() => toast.success("Stream updated"))
      .catch(() => toast.error("Something went wrong"))
      .finally(() => { closeRef.current?.click() })
    })
  }

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
      .then(() => {
        toast.success("Thumbnai remove")
        setThumbnaiUrl(null)
      })
      .catch(() => toast.error("Something went wrong"))
    })
  }

  return (
    <Dialog>
      <DialogTrigger
        asChild
      >
        <Button
          variant="link"
          size="sm"
          className="ml-auto"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit stream info
          </DialogTitle>
        </DialogHeader>
        <form
          className="space-y-14"
          onSubmit={onSubmit}
        >
          <div
            className="space-y-2"
          >
            <label >
              Name
            </label>
            <Input 
              type="text" 
              name="name"
              value={name}
              disabled={isPending}
              onChange={onChange}
              placeholder="Stream name"
            />
          </div>
          <div
            className="space-y-2"
          >
            <label>
              Thumbnai
            </label>
            {
              thumbnaiUrl 
              ? (
                <div
                  className="relative aspect-video rounded-xl overflow-hidden border border-white/10"
                >
                  <div
                    className="absolute top-2 right-2 z-[10]"
                  >
                    <Hint
                      label="Remove thumbnai"
                      side="left"
                      asChild
                    >
                      <Button
                        type="button"
                        disabled={isPending}
                        onClick={onRemove}
                        className="h-auto w-auto p-1.5"
                      >
                        <Trash
                          className="h-4 w-4"
                        />
                      </Button>
                    </Hint>
                  </div>
                  <Image
                    alt="thumbnai"
                    src={thumbnaiUrl}
                    fill
                    className="object-cover"
                  />
                </div>
              )
              : (
                <div
                  className="rounded-xl border outline-dashed outline-muted"
                >
                  <UploadDropzone
                    endpoint="thumbnaiUploader"
                    appearance={{
                      label: {
                        color: "#FFFFFF"
                      },
                      allowedContent: {
                        color: "#FFFFFF"
                      }
                    }}
                    onClientUploadComplete={(res) => {
                      setThumbnaiUrl(res?.[0]?.url);
                      console.log(res)
                      router.refresh();
                      closeRef.current?.click();
                    }}
                  />
                </div>
              )
            }
          </div>
          <div
            className="flex justify-between"
          >
            <DialogClose
              asChild
              ref={closeRef}
            >
              <Button
                type="button"
                variant="ghost"
              >
                Cnacel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { InfoModal }