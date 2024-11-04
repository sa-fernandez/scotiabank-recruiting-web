"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold mb-4 text-center">Scotiabank Recruiting Tool</h1>
      <p className="text-lg text-center max-w-lg mb-8">
        Results for the front end test. 
      </p>
      <main className="flex flex-col gap-8 items-center">
        <div className="flex gap-4 items-center flex-col">
          <button
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => router.push(`/employee`)}
          >
            Employee View
          </button>
        </div>
      </main>
    </div>
  );
}
