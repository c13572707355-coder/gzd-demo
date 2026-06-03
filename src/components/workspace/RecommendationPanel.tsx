import { ArrowRight, CheckCircle2, Circle, Sparkles, TimerReset } from "lucide-react";
import type { WorkspaceCase } from "@/data/workspace";
import { cn } from "@/lib/utils";

interface RecommendationPanelProps {
  data: WorkspaceCase;
}

const toneStyle = {
  primary: "border-teal-100 bg-teal-50/80 text-teal-800",
  warning: "border-amber-100 bg-amber-50/80 text-amber-800",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

export function RecommendationPanel({ data }: RecommendationPanelProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.45fr_1fr]">
      <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
              <Sparkles size={16} className="text-teal-700" />
              下一步建议
            </div>
            <p className="mt-1 text-xs text-slate-500">面向客服操作的处理建议，不是聊天回复</p>
          </div>
          <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white">
            推荐 3 项动作
          </span>
        </div>

        <div className="space-y-3">
          {data.recommendations.map((item, index) => (
            <div key={item.title} className="group rounded-2xl border border-slate-100 bg-white p-3 transition hover:border-teal-200 hover:shadow-md">
              <div className="flex gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-700">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                    <span className={cn("shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium", toneStyle[item.tone])}>
                      {item.action}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{item.desc}</p>
                </div>
                <ArrowRight size={16} className="mt-1 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-teal-700" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <TimerReset size={16} className="text-cyan-700" />
          <div>
            <h2 className="text-sm font-semibold text-slate-950">处理过程摘要</h2>
            <p className="text-xs text-slate-500">让建议过程可理解，但不打断主流程</p>
          </div>
        </div>

        <div className="space-y-3">
          {data.process.map((step, index) => {
            const isDone = step.status === "done";
            const isActive = step.status === "active";
            return (
              <div key={step.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border",
                      isDone && "border-teal-200 bg-teal-50 text-teal-700",
                      isActive && "border-cyan-200 bg-cyan-50 text-cyan-700",
                      step.status === "pending" && "border-slate-200 bg-slate-50 text-slate-400"
                    )}
                  >
                    {isDone ? <CheckCircle2 size={15} /> : <Circle size={11} />}
                  </div>
                  {index < data.process.length - 1 && <div className="h-8 w-px bg-slate-200" />}
                </div>
                <div className="pt-0.5">
                  <div className="text-xs font-semibold text-slate-800">{step.title}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{step.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
