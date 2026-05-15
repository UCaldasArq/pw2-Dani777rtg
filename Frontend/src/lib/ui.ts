/**
 * Shared Tailwind classes. Uses the default zinc/emerald palette so utilities are
 * always emitted (theme tokens in JS strings are easy for Tailwind to miss).
 */
export const inputClass =
  'w-full min-h-[44px] rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm transition-[box-shadow,border-color] placeholder:text-zinc-400 focus-visible:border-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/30';

export const selectClass = inputClass;

export const labelClass =
  'mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-600';

export const cardClass =
  'rounded-xl border border-zinc-200 bg-white p-6 shadow-sm';

export const btnPrimaryClass =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800/50 disabled:pointer-events-none disabled:opacity-50';

export const btnSecondaryClass =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800/20';

export const btnDangerClass =
  'inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-800 transition hover:border-red-300 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/30';
