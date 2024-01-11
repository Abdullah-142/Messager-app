interface IParams {
  conversationId: string;
}

export default function page({ conversationId }: IParams) {
  return <div className="pl-80">Conversation Id</div>;
}
