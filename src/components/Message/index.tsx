import { formatDateToLocaleTime } from "@utils";

type Props = {
  isSessionOwner: boolean;
  text: string;
  createdAt: string;
};

export function Message({ isSessionOwner, text, createdAt }: Props) {
  return (
    <li
      className={`flex flex-col w-fit py-[4px] px-[8px] rounded ${
        isSessionOwner ? "bg-[#3b3b3d] ml-auto" : "bg-[#212121]"
      }`}
    >
      <p className="text-white">{text}</p>
      <span className="text-white opacity-30 text-[12px] ml-auto">
        {formatDateToLocaleTime(createdAt)}
      </span>
    </li>
  );
}
