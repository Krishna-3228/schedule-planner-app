import { useTheme } from "../../../theme";

export function SettingsPanel({ closeSettings }: { closeSettings: () => void }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="p-4 fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-lg shadow-xl">

                <h2 className="text-lg font-semibold mb-4">Settings</h2>
                <div>
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                        <span className="text-sm">
                            Theme
                            <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                                Switch between light and dark
                            </span>
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-slate-900 text-slate-50 dark:bg-slate-100 dark:text-slate-900">
                            {theme === "dark" ? "Dark" : "Light"}
                        </span>
                    </button>
                </div>
                <button 
                    className="mt-4 w-1/6 px-3 py-2 float-right bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    onClick={() => closeSettings()}>
                    OK
                </button>
            </div>
        </div>
    );
}