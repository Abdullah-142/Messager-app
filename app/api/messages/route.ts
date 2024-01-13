import { getCurrentUser } from "@/app/actions/getCurrentuser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(resqust: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    const body = await resqust.json();
    const { message, image, conversationId } = body;
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastmessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    return  NextResponse.json(newMessage);
  } catch (error: any) {
    console.log(error, "Error_Messages");
    return new Response("Internal server error", { status: 500 });
  }
}
