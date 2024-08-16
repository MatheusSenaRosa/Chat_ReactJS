import { useMainContext } from "@contexts";
import { IoIosSearch } from "react-icons/io";
import { formatDateToLocaleTime, getReceiverUser } from "@utils";
import { useMemo, useState } from "react";
import { useUsersServices } from "@services";
import { useQuery } from "@tanstack/react-query";
import { FiLogOut } from "react-icons/fi";

export function Chats() {
  const [search, setSearch] = useState("");

  const { chats, session, isLoadingChats, setOpenedChat, destroySession } =
    useMainContext();
  const { getUsers } = useUsersServices();

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
  });

  const usersToList = useMemo(() => {
    if (users) {
      const withoutChat = users.filter((user) => {
        const isNotLoggedUser = user.id !== session.id;

        const alreadyHasAChat = chats.some((chat) =>
          chat.users.some((userChat) => userChat.id === user.id)
        );

        return isNotLoggedUser && !alreadyHasAChat;
      });

      const formattedSearch = search.trim().toLocaleLowerCase();

      if (formattedSearch) {
        const filteredBySearch = withoutChat.filter((user) => {
          const nickname = user.nickname.toLocaleLowerCase();

          return nickname.includes(formattedSearch);
        });

        return filteredBySearch;
      }

      return withoutChat;
    }
    return [];
  }, [chats, users, search, session]);

  const chatsToList = useMemo(() => {
    const formattedSearch = search.trim().toLocaleLowerCase();

    if (formattedSearch.length >= 3) {
      const filtered = chats.filter((chat) => {
        const nickname = getReceiverUser(
          session.id,
          chat.users
        ).nickname.toLocaleLowerCase();

        return nickname.includes(formattedSearch);
      });

      return filtered;
    }

    return chats;
  }, [search, chats, session]);

  return (
    <div className="flex flex-col py-[8px] flex-1 overflow-hidden">
      <header className="flex justify-between items-center px-[16px]">
        <h1 className="text-[32px] font-bold text-white">Chats</h1>
        <button
          onClick={destroySession}
          type="button"
          className="text-red-500 text-[24px]"
        >
          <FiLogOut />
        </button>
      </header>

      <span className="mx-[16px] my-[8px] relative">
        <span className="absolute h-full w-[30px] flex items-center justify-center">
          <IoIosSearch className="text-white text-[24px]" />
        </span>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="w-full bg-[#212121] py-[4px] px-[34px] rounded text-white"
        />
      </span>

      <div className="flex-1 overflow-auto">
        {Boolean(!isLoadingUsers && !isLoadingChats) && (
          <ul>
            {chatsToList.map((chat) => (
              <li
                onClick={() => setOpenedChat(chat)}
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

            {usersToList.map((user) => (
              <li
                onClick={() =>
                  setOpenedChat({
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
        )}

        {Boolean(isLoadingUsers || isLoadingChats) && (
          <div className="flex flex-1 items-center justify-center">
            <h3 className="text-white text-center font-bold text-[18px] mt-[8px]">
              Loading...
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
