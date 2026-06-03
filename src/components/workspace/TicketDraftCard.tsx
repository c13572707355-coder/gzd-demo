import { ClipboardCheck } from "lucide-react";
import type { WorkspaceCase } from "@/data/workspace";

interface TicketDraftCardProps {
  data: WorkspaceCase;
}

export function TicketDraftCard({ data }: TicketDraftCardProps) {
  return (
    <section data-guide-id="ticket-draft" className="rounded-[24px] border border-teal-100 bg-white p-4 pb-3 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
            <ClipboardCheck size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-950">建单工具</h2>
            <p className="text-xs text-slate-500">AI 已预填关键字段，客服可直接修改</p>
          </div>
        </div>
        <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-medium text-teal-700">减少重复填写</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Field label="工单分类" value={data.ticketDraft.category} />
        <Field label="工单类型" value={data.ticketDraft.type} />
        <Field label="用户诉求" value={data.ticketDraft.demand} wide />
        <Field label="备注" value={data.ticketDraft.note} wide multiline />
      </div>

      <div className="mt-4 flex justify-end">
        <button className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-teal-800">
          建单
        </button>
      </div>
    </section>
  );
}

function Field({ label, value, wide, multiline }: { label: string; value: string; wide?: boolean; multiline?: boolean }) {
  return (
    <label className={wide ? "md:col-span-2" : ""}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <span className="flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-0.5 text-[11px] text-cyan-700">
          AI 建议
        </span>
      </div>
      {multiline ? (
        <textarea
          key={`${label}-${value}`}
          className="h-20 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-700 outline-none transition focus:border-teal-300 focus:bg-white"
          defaultValue={value}
        />
      ) : (
        <input
          key={`${label}-${value}`}
          className="h-10 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 text-xs text-slate-700 outline-none transition focus:border-teal-300 focus:bg-white"
          defaultValue={value}
        />
      )}
    </label>
  );
}
