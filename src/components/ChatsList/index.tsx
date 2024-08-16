import { Chat, Session, User } from "@types";
import { formatDateToLocaleTime, getReceiverUser } from "@utils";

type Props = {
  session: Session;
  chats: Chat[];
  users: User[];
  onClick: (chat: Chat) => void;
};

export function ChatsList({ chats, users, session, onClick }: Props) {
  return (
    <ul>
      {chats.map((chat) => (
        <li
          onClick={() => onClick(chat)}
          key={chat.id}
          className="border-b border-[#212121] px-[16px] py-[12px] cursor-pointer hover:bg-[#3b3b3d] duration-200"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-[18px] text-white">
              {getReceiverUser(session.id, chat.users).nickname}
            </h2>
            <span className="text-gray-300">
              {formatDateToLocaleTime(chat.messages[0].createdAt)}
            </span>
          </div>
          <p className="text-white">{chat.messages[0].text}</p>
        </li>
      ))}

      {users.map((user) => (
        <li
          onClick={() =>
            onClick({
              id: null,
              messages: [],
              users: [user, session],
            })
          }
          key={user.id}
          className="border-b border-[#212121] px-[16px] py-[12px] cursor-pointer hover:bg-[#3b3b3d] duration-200"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-[18px] text-white">
              {user.nickname}
            </h2>
          </div>
          <p className="text-red-300 italic">No messages yet</p>
        </li>
      ))}
    </ul>
  );
}
