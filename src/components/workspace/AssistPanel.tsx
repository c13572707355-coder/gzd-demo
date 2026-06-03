import { BadgeCheck, FileClock, PackageCheck, UserRound } from "lucide-react";
import type { WorkspaceCase } from "@/data/workspace";

interface AssistPanelProps {
  data: WorkspaceCase;
}

export function AssistPanel({ data }: AssistPanelProps) {
  return (
    <aside className="flex h-full min-h-0 flex-col gap-4">
      <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <PackageCheck size={16} className="text-teal-700" />
          <h2 className="text-sm font-semibold text-slate-950">订单信息</h2>
        </div>
        <div className="space-y-3">
          <InfoLine label="订单编号" value={data.order.id} mono />
          <InfoLine label="商品" value={data.order.product} />
          <InfoLine label="金额" value={data.order.amount} strong />
          <InfoLine label="订单状态" value={data.order.status} />
          <InfoLine label="售后状态" value={data.order.afterSale} accent />
          <InfoLine label="商家" value={data.order.merchant} />
          <InfoLine label="物流" value={data.order.logistics} />
        </div>
      </section>

      <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <UserRound size={16} className="text-cyan-700" />
          <h2 className="text-sm font-semibold text-slate-950">用户信息</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Metric label="会员等级" value={data.customer.level} />
          <Metric label="所在城市" value={data.customer.city} />
          <Metric label="联系方式" value={data.customer.phone} />
          <Metric label="当前风险" value={data.customer.risk} warning />
        </div>
      </section>

      <section className="min-h-0 flex-1 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <FileClock size={16} className="text-slate-700" />
          <h2 className="text-sm font-semibold text-slate-950">历史服务记录</h2>
        </div>
        <div className="space-y-3">
          {data.history.map((item) => (
            <div key={`${item.title}-${item.time}`} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-800">{item.title}</span>
                <span className="text-[11px] text-slate-400">{item.time}</span>
              </div>
              <p className="text-xs leading-5 text-slate-500">{item.result}</p>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

function InfoLine({
  label,
  value,
  strong,
  accent,
  mono,
}: {
  label: string;
  value: string;
  strong?: boolean;
  accent?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-2 last:border-b-0 last:pb-0">
      <span className="shrink-0 text-xs text-slate-400">{label}</span>
      <span
        className={[
          "text-right text-xs leading-5",
          strong ? "font-semibold text-slate-950" : "text-slate-700",
          accent ? "font-medium text-amber-700" : "",
          mono ? "font-mono" : "",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}

function Metric({ label, value, warning }: { label: string; value: string; warning?: boolean }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-[11px] text-slate-400">
        <BadgeCheck size={12} />
        {label}
      </div>
      <div className={warning ? "text-xs font-semibold leading-5 text-amber-700" : "text-xs font-semibold text-slate-800"}>
        {value}
      </div>
    </div>
  );
}
