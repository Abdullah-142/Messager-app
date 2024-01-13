import { getConversationById } from "@/app/actions/getConversationById";
import { getMessages } from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";

import Body from "./_components/Body";
import Header from "./_components/Header";
import Form from "./_components/Form";
interface IParams {
  conversationId: string;
}

export default async function page({ params }: { params: IParams }) {
  const conversation = await getConversationById(params.conversationId);
  const message = await getMessages(params.conversationId);
  if (!conversation) {
    return (
      <div className="pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialmessage={message} />
        <Form />
      </div>
    </div>
  );
}
