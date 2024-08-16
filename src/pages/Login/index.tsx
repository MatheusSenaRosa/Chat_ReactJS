import { useForm } from "react-hook-form";
import { Form } from "./types";
import { resolver } from "./utils";
import { useAuthServices } from "@services";
import { toast } from "react-toastify";
import { useState } from "react";
import { useMainContext } from "@contexts";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuthServices();
  const { createSession } = useMainContext();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Form>({
    resolver,
  });

  const onSubmit = async (formData: Form) => {
    setIsLoading(true);

    try {
      const sessionResponse = await signIn(formData);
      createSession(sessionResponse);
    } catch {
      toast.error("An error has occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="h-full flex flex-col items-center justify-center gap-[16px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-white text-center text-[24px]">Type a nickname</h2>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Nickname"
          className="px-[12px] py-[4px] rounded bg-[#212121] text-white text-[16px]"
          {...register("nickname")}
        />
        {errors?.nickname?.message && (
          <span className="text-red-500 text-[14px]">
            {errors.nickname.message}
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-white px-[12px] py-[4px] rounded"
      >
        {isLoading && "Loading..."}
        {!isLoading && "Sign in"}
      </button>
    </form>
  );
}
