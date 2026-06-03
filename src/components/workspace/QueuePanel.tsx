import { ChevronDown, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CaseId, WorkspaceCase } from "@/data/workspace";
import { cn } from "@/lib/utils";

interface QueuePanelProps {
  cases: WorkspaceCase[];
  activeCaseId: CaseId;
  onCaseChange: (id: CaseId) => void;
}

export function QueuePanel({ cases, activeCaseId, onCaseChange }: QueuePanelProps) {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statuses = ["在线", "小休", "忙碌", "离线", "培训", "就餐"];
  const [currentStatus, setCurrentStatus] = useState("在线");
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!statusRef.current?.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="border-b border-slate-200 px-3 py-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">张三</div>
          </div>
          <div ref={statusRef} className="relative">
            <button
              className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-[11px] text-slate-600"
              onClick={() => setIsStatusOpen((prev) => !prev)}
            >
              {currentStatus} <ChevronDown size={12} />
            </button>
            {isStatusOpen ? (
              <div className="absolute right-0 top-8 z-20 w-28 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                {statuses.map((status) => (
                  <button
                    key={status}
                    className={cn(
                      "w-full rounded-lg px-2 py-1.5 text-left text-[11px] hover:bg-slate-50",
                      currentStatus === status ? "bg-slate-50 font-medium text-teal-700" : "text-slate-600"
                    )}
                    onClick={() => {
                      setCurrentStatus(status);
                      setIsStatusOpen(false);
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200 p-3">
        <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
          <Stat label="排队中" value="1" />
          <Stat label="今日已接待" value="10" />
          <Stat label="今日目标" value="130" />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <GroupTitle title="会话中" count={cases.length} />
        <div className="space-y-1 px-2">
          {cases.map((item, index) => (
            <button
              key={item.id}
              className={cn(
                "w-full rounded-xl p-2.5 text-left transition",
                activeCaseId === item.id ? "bg-teal-50 ring-1 ring-teal-100" : "hover:bg-slate-50"
              )}
              onClick={() => onCaseChange(item.id)}
            >
              <div className="flex gap-2.5">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 text-sm font-semibold text-white">
                  {item.customer.name.slice(0, 1)}
                  {index === 0 && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-white bg-emerald-500" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-semibold text-slate-900">{item.customer.name}</span>
                    <span className="text-[10px] text-slate-400">{index === 0 ? "1 分钟前" : `${index + 2} 分钟前`}</span>
                  </div>
                  <div className="mt-1 truncate text-[11px] text-slate-500">{item.summary.title}</div>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">{item.customer.emotion}</span>
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">{item.label}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <GroupTitle title="会话完结待建单" count={0} />
        <div className="px-3 pb-3 text-[11px] text-slate-400">暂无会话</div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-50 py-2">
      <div className="text-sm font-semibold text-slate-900">{value}</div>
      <div className="text-[10px] text-slate-400">{label}</div>
    </div>
  );
}

function GroupTitle({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center justify-between px-3 pb-2 pt-4 text-[11px] font-medium text-slate-500">
      <span className="flex items-center gap-1.5">
        <MessageCircle size={13} />
        {title}
      </span>
      <span>{count}</span>
    </div>
  );
}
