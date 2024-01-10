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
      const newconversation = await prisma?.conversation.create({
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
      return NextResponse.json(newconversation);
    }
  } catch (error: any) {
    return new NextResponse("internal error", { status: 500 });
  }
}
