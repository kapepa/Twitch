import { createViewerToken } from "@/actions/token";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const useViewerToken = (hostIndentity: string) => {
  const [token, setToken] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [identity, setIndentity] = useState<string>("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIndentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & { name?: string };
        const name = decodedToken?.name;
        const identity = decodedToken.sub;

        if (identity) setIndentity(identity);
        if (name) setName(name);

      } catch {
        toast.error("Something went wrong")
      }
    }

    createToken();
  }, [hostIndentity])

  return {
    name,
    token,
    identity,
  }
}

export { useViewerToken }