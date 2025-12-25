import { useState } from "react";

export function Calendar() {
    const today = new Date();

    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const month = currentMonth;
    const year = currentYear; // 0–11

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Monday-based index (0 = Mon, 6 = Sun)
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const startOffset = (firstDayOfMonth + 6) % 7;

    const cells: (number | null)[] = Array((startOffset + daysInMonth) <= 35 ? 35 : 42).fill(null);


    for (let d = 1; d <= daysInMonth; d++) {
        cells[startOffset + d - 1] = d;
    }

    function goPrevMonth() {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(y => y - 1);
        } else {
            setCurrentMonth(m => m - 1);
        }
    }

    function goNextMonth() {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(y => y + 1);
        } else {
            setCurrentMonth(m => m + 1);
        }
    }

    return (
        <div className="mx-2 mt-3 rounded-xl border border-slate-300 dark:border-slate-700 p-3">
            <div className="flex items-center justify-between mb-3 px-2">
                <button onClick={goPrevMonth} className="text-slate-400 hover:text-white">‹</button>

                <div className="text-sm font-medium">
                    {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
                </div>

                <button onClick={goNextMonth} className="text-slate-400 hover:text-white">›</button>
            </div>

            <div className="grid grid-cols-7 text-xs text-center mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                    <div key={d} className="text-slate-700 dark:text-slate-200">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7" >
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
                            className="h-8 flex items-center justify-center"
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
