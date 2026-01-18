"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const DeleteUser = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const deleteUser = async (id: string) => {
    startTransition(async () => {
      await fetch(`/api/user/${id}`, {
        method: "DELETE",
      });
      router.refresh();
    });
  };

  return (
    <div>
      <button disabled={isPending} onClick={() => deleteUser(userId)}>
        {isPending ? "🌀" : "🗑️"}
      </button>
    </div>
  );
};

export default DeleteUser;
