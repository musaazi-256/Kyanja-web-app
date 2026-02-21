"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h2 className="text-3xl font-extrabold text-brand-navy">Something went wrong</h2>
      <p className="mt-3 text-slate-600">An unexpected error occurred while loading this page.</p>
      <button onClick={() => reset()} className="mt-6 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white">
        Try again
      </button>
    </div>
  );
}
