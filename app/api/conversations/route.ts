import { getCurrentUser } from "@/app/actions/getCurrentuser";
import { NextResponse } from "next/server";

export async function POST(res: NextResponse) {
  try {
    const currentUser = await getCurrentUser();
    const body = await res.json();
    const { userId, isGroup, members, name } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }
    if (isGroup) {
      const newconversations = await prisma?.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((value: string) => ({ id: members.value })),
              {
                id: currentUser?.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });
      return NextResponse.json(newconversations);
    }
    const existngConversation = await prisma!.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });
    const signleConversation = existngConversation[0];
    if (signleConversation) {
      return NextResponse.json(signleConversation);
    }
    const newConversation = await prisma!.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse("internal error", { status: 500 });
  }
}
