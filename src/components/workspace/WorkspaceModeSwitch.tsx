import { cn } from "@/lib/utils";

export type WorkspaceMode = "online" | "ticket" | "knowledge";

interface WorkspaceModeSwitchProps {
  mode: WorkspaceMode;
  onChange: (mode: WorkspaceMode) => void;
}

export function WorkspaceModeSwitch({ mode, onChange }: WorkspaceModeSwitchProps) {
  return (
    <aside className="flex h-full w-[88px] flex-col items-stretch border-r border-slate-200 bg-white p-2">
      <div className="grid gap-2 pt-1 text-xs">
        <button
          className={cn(
            "rounded-lg border px-2 py-3 text-left font-medium leading-4 transition",
            mode === "online"
              ? "border-teal-200 bg-teal-50 text-teal-700"
              : "border-transparent bg-slate-50 text-slate-500 hover:border-slate-200 hover:bg-white"
          )}
          onClick={() => onChange("online")}
        >在线工作台</button>
        <button
          className={cn(
            "rounded-lg border px-2 py-3 text-left font-medium leading-4 transition",
            mode === "ticket"
              ? "border-teal-200 bg-teal-50 text-teal-700"
              : "border-transparent bg-slate-50 text-slate-500 hover:border-slate-200 hover:bg-white"
          )}
          onClick={() => onChange("ticket")}
        >
          工单工作台
        </button>
        <button
          className={cn(
            "rounded-lg border px-2 py-3 text-left font-medium leading-4 transition",
            mode === "knowledge"
              ? "border-teal-200 bg-teal-50 text-teal-700"
              : "border-transparent bg-slate-50 text-slate-500 hover:border-slate-200 hover:bg-white"
          )}
          onClick={() => onChange("knowledge")}
        >
          人工知识库
        </button>
      </div>
    </aside>
  );
}
