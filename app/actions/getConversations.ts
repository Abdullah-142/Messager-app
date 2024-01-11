import { getCurrentUser } from "./getCurrentuser";
import prisma from "@/app/libs/prismadb";

export const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.email) return [];

  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: [
        {
          lastmessageAt: "desc",
        },
      ],
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });
    return conversations;
  } catch (error: any) {
    return [];
  }
};
