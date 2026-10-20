const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-10-28" → "Oct 28"
export const shortDate = (ymd) => `${MONTHS[Number(ymd.slice(5, 7)) - 1]} ${Number(ymd.slice(8, 10))}`;

export const line = (t) => `${t.done ? "✓" : "·"} ${String(t.id).padStart(2)}  ${t.title}${t.due ? `  — due ${shortDate(t.due)}` : ""}`;
