import { BookOpen, FileText, Headphones, Home, Settings } from "lucide-react";
import type { WorkspaceMode } from "@/components/workspace/WorkspaceModeSwitch";

export function TopBar({ mode, onBackToWelcome }: { mode: WorkspaceMode; onBackToWelcome?: () => void }) {
  const isOnline = mode === "online";
  const isKnowledge = mode === "knowledge";

  return (
    <header className="flex h-10 items-center justify-between border-b border-slate-200 bg-white px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-600 text-white">
          {isOnline ? <Headphones size={15} /> : isKnowledge ? <BookOpen size={15} /> : <FileText size={15} />}
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold tracking-tight text-slate-950">
            {isOnline ? "客服在线工作台" : isKnowledge ? "人工知识库" : "工单工作台"}
          </h1>
          {onBackToWelcome ? (
            <button
              className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:border-teal-200 hover:text-teal-700"
              onClick={onBackToWelcome}
            >
              <Home size={13} />
              演示引导
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 transition hover:border-teal-200 hover:text-teal-700">
          <Settings size={14} />
        </button>
      </div>
    </header>
  );
}
