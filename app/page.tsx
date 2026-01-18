import prisma from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black max-w-7xl mx-auto w-full">
      <div className="flex flex-col items-center justify-center space-y-4 ">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Welcome to the Track App
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          {users.length} users have signed up so far.
        </p>
      </div>
    </div>
  );
}
