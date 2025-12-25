export function Calendar() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth(); // 0–11

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Monday-based index (0 = Mon, 6 = Sun)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const startOffset = (firstDayOfMonth + 6) % 7;

    const cells: (number | null)[] = Array(42).fill(null);

    for (let d = 1; d <= daysInMonth; d++) {
        cells[startOffset + d - 1] = d;
    }

    const monthName = today.toLocaleString("default", { month: "long" });

    return (
        <div className="mx-2 mt-3 rounded-xl border border-slate-300 dark:border-slate-700 p-3">
            <div className="text-center font-medium text-sm mb-3">
                {monthName} {year} ▾
            </div>

            <div className="grid grid-cols-7 text-xs text-center mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                    <div key={d} className="text-slate-500">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 grid-rows-6">
                {cells.map((day, i) => {
                    const isToday =
                        day &&
                        day === today.getDate() &&
                        month === today.getMonth() &&
                        year === today.getFullYear();

                    const isPast =
                        day &&
                        new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

                    return (
                        <div
                            key={i}
                            className="h-8 border border-slate-300/40 dark:border-slate-700/40 flex items-center justify-center"
                        >
                            {day && (
                                <span
                                    className={`
              ${isToday ? "bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center" : ""}
              ${isPast && !isToday ? "text-slate-400" : ""}`}
                                >
                                    {day}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
