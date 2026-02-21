"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-brand-navy">Application Error</h2>
        <p className="mt-3 text-slate-600">A global rendering error occurred.</p>
        <button onClick={() => reset()} className="mt-6 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white">
          Reload
        </button>
      </body>
    </html>
  );
}
