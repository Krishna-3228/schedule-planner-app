export function Calendar() {
    const today = new Date();

    return (
        <div className="mx-2 mt-3 rounded-xl border border-slate-300 dark:border-slate-700 p-3">
            <div className="text-center font-medium text-sm mb-3">
                Month YYYY ▾
            </div>

            <div className="grid grid-cols-7 text-xs text-center mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                    <div key={d} className="text-slate-500">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 grid-rows-6">
                {Array.from({ length: 42 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-8 border border-slate-300/40 dark:border-slate-700/40"
                    />
                ))}

            </div>
        </div>
    );
}
