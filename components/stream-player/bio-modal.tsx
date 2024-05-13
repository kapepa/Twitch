"use client"

import { ChangeEvent, FC, FormEvent, useRef, useState, useTransition } from "react"
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { updateUser } from "@/actions/user";

interface BioModalProps {
  initialValue: string | null,
}

const BioModal: FC<BioModalProps> = (props) => {
  const { initialValue } = props;
  const [value, setValue] = useState<string>(initialValue || "");
  const [isPending, startTransition] = useTransition();
  const refBtnClose = useRef<HTMLButtonElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({ bio: value })
      .then(() => toast.success("User bio updated"))
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setTimeout(() => refBtnClose.current?.click(), 500))
    })
    
  }

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }

  return (
    <Dialog>
      <DialogTrigger
        asChild
      >
        <Button
          size="sm"
          variant="link"
          className="ml-auto"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Edit user bio
        </DialogTitle>
        <form
          className="space-y-4"
          onSubmit={onSubmit}
        >
          <Textarea
            placeholder="User bio"
            onChange={onChange}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
          <div
            className="flex justify-between"
          >
            <DialogClose
              asChild
              ref={refBtnClose}
            >
              <Button
                type="button"
                variant="ghost"
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              variant="primary"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { BioModal }