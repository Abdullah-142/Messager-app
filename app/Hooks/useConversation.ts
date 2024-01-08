import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function useConvertion() {
  const params = useParams();
  const conversationId = useMemo(() => {
    if (!params?.conversationId) return "";
    return params.conversationId as string;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [params.conversationId]);

  return useMemo(
    () => ({
      conversationId,
      isOpen,
    }),
    [conversationId, isOpen]
  );
}
