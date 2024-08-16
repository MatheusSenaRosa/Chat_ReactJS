import { PiCaretLeftBold } from "react-icons/pi";
import { IoMdSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import { Form } from "./types";
import { useChatWebSocket } from "@websockets";
import { useMainContext } from "@contexts";
import { getReceiverUser } from "@utils";
import { useEffect, useRef } from "react";
import { useChatsServices } from "@services";
import { toast } from "react-toastify";
import { Message } from "@components";

export function Chat() {
  const messagesUlRef = useRef<HTMLUListElement>(null);

  const { session, openedChat, setOpenedChat } = useMainContext();
  const { data, isLoading, sendMessage } = useChatWebSocket({
    sessionId: session.id,
    chatId: openedChat?.id,
  });

  const { createChat } = useChatsServices();
  const { register, watch, handleSubmit, reset } = useForm<Form>();

  const message = watch("message")?.trim();

  const onSubmit = async (formData: Form) => {
    if (!formData?.message) return;

    let newChatId = openedChat?.id;

    if (!openedChat?.id) {
      try {
        const receiverId = getReceiverUser(session.id, openedChat.users).id;

        const response = await createChat({
          senderId: session.id,
          receiverId,
        });

        newChatId = response.chatId;

        setOpenedChat((prev) => ({ ...prev, id: newChatId }));
      } catch {
        toast.error("An error has occurred");
      }
    }

    sendMessage(formData.message, newChatId);
    reset();
  };

  useEffect(() => {
    if (data.messages && messagesUlRef.current?.scrollHeight) {
      messagesUlRef.current.scrollTop = messagesUlRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <header className="bg-[#212121] p-[16px] flex gap-[8px] items-center">
        <button
          onClick={() => setOpenedChat(null)}
          type="button"
          className="text-white flex items-center"
        >
          <PiCaretLeftBold className="mt-[1px] text-[20px]" />
          Back
        </button>
        <h1 className="text-white font-bold text-[18px] mx-auto pr-[72px]">
          {getReceiverUser(session.id, openedChat.users).nickname}
        </h1>
      </header>

      {Boolean(!data.messages?.length && isLoading) && (
        <div className="flex flex-1 justify-center items-center">
          <h3 className="text-white font-bold text-[18px]">Loading...</h3>
        </div>
      )}

      {Boolean(!data.messages?.length && !isLoading) && (
        <div className="flex flex-1 justify-center items-center">
          <h3 className="text-red-300 italic font-bold text-[18px]">
            No messages yet
          </h3>
        </div>
      )}

      {Boolean(data.messages?.length) && (
        <ul
          ref={messagesUlRef}
          className="flex flex-col flex-1 px-[12px] py-[38px] pb-[8px] gap-[8px] overflow-auto my-[4px] mx-[4px]"
        >
          {data.messages?.map((message) => (
            <Message
              key={message.id}
              isSessionOwner={message.senderId === session.id}
              createdAt={message.createdAt}
              text={message.text}
            />
          ))}
        </ul>
      )}

      <footer className="p-[16px] bg-[#212121]">
        <form
          className="flex items-center gap-[12px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Type a message"
            className="text-white w-full py-[4px] px-[8px] rounded bg-[#3b3b3d]"
            {...register("message")}
          />

          <button
            className="text-white text-[24px] duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={!message}
            type="submit"
          >
            <IoMdSend />
          </button>
        </form>
      </footer>
    </div>
  );
}
