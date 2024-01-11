import { getCurrentUser } from "./getCurrentuser";

const getConversationById = async (conversationId: string) => {
  const user = await getCurrentUser();

  if (!user?.email) {
    return null;
  }

  try {
    const conversations = await prisma?.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    return conversations;
  } catch (error) {
    return null;
  }
};
