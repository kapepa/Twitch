"use client"

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "sonner";

interface CopyButtonProps {
  value: string
}

const CopyButton: FC<CopyButtonProps> = (props) => {
  const { value } = props;
  const [isCopied, setIsCopyied] = useState<boolean>(false);

  const onCopy = () => {
    if (!value) return;

    setIsCopyied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => setIsCopyied(false), 1000);
    toast.success("Url was successfully copied")
  }

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      disabled={isCopied && !!value}
      onClick={onCopy}
      variant="ghost"
      size="sm"
    >
      <Icon
        className="h-5 w-5"
      />
    </Button>
  )
}

export { CopyButton };