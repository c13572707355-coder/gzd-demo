import type { ReactNode } from "react";
import { ArrowLeft, Clock3, FileCheck2, Sparkles } from "lucide-react";
import type { TicketDetailDemo, TicketListRecord } from "@/data/workspace";

interface TicketDetailWorkspaceProps {
  record: TicketListRecord;
  detail: TicketDetailDemo;
  onBack: () => void;
  onOpenKnowledge: (knowledgeId: string) => void;
}

export function TicketDetailWorkspace({ record, detail, onBack, onOpenKnowledge }: TicketDetailWorkspaceProps) {
  const orderedProcessLogs = [...detail.processLogs]
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    .reverse();

  return (
    <section className="flex h-full min-h-0 flex-col bg-[#f7f9fb]">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4">
        <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800" onClick={onBack}>
          <ArrowLeft size={14} />
          返回工单列表
        </button>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_320px] gap-4 overflow-hidden p-4">
        <div className="min-h-0 min-w-0 overflow-y-auto">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-1.5 flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-700">{detail.status}</span>
                  <span className="rounded bg-rose-50 px-2 py-0.5 text-rose-700">{detail.priority}</span>
                  <span className="rounded bg-amber-50 px-2 py-0.5 text-amber-700">{detail.countdown}</span>
                </div>
                <h2 className="text-base font-semibold text-slate-950">{detail.title}</h2>
                <div className="mt-1 text-[11px] text-slate-500">工单编号：{detail.ticketNo}</div>
                <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                  <span>创建时间：{detail.createdAt}</span>
                  <span>最新处理：{detail.updatedAt}</span>
                  <span>当前处理人：{detail.currentOwner}</span>
                  <span>处理组：{detail.handleGroup}</span>
                </div>
              </div>
            </div>
          </section>

          <section data-guide-id="ticket-suggestion" className="mt-4 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50/85 to-white p-3 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-100 text-sky-700">
                <Sparkles size={15} />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-slate-950">智能建议</div>
                <div className="text-[10px] text-slate-400">基于当前工单、举证信息与场景知识生成</div>
              </div>
            </div>
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
              <div className="space-y-2.5">
                <CompactBlock title="问题概述">
                  <div className="text-[11px] leading-5 text-slate-600">{detail.suggestion.overview}</div>
                </CompactBlock>
                <CompactBlock title="用户诉求">
                  <CompactLines items={detail.suggestion.userDemands} />
                </CompactBlock>
                <CompactBlock title="举证情况">
                  <div className="space-y-1.5 text-[11px] leading-5 text-slate-600">
                    <CompactLabelLine label="用户举证" value={detail.suggestion.evidence.user} />
                    <CompactLabelLine label="商家举证" value={detail.suggestion.evidence.merchant} />
                    <CompactLabelLine label="场景推断" value={detail.suggestion.evidence.scene} />
                  </div>
                </CompactBlock>
              </div>
              <div className="space-y-2.5">
                <CompactBlock title="知识依据">
                  <KnowledgeLines items={detail.suggestion.knowledge} onOpenKnowledge={onOpenKnowledge} />
                </CompactBlock>
                <CompactBlock title="方案指引">
                  <GuidanceLines items={detail.suggestion.guidance} />
                </CompactBlock>
              </div>
            </div>
          </section>

          <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-950">
              <FileCheck2 size={15} className="text-sky-600" />
              工单基础信息
            </div>
            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[11px]">
                <InfoItem label="工单分类" value={detail.classification} />
                <InfoItem label="当前状态" value={detail.status} />
                <InfoItem label="优先级" value={detail.priority} />
                <InfoItem label="用户风险" value={detail.userRisk} />
                <InfoItem label="工单风险" value={detail.ticketRisk} />
                <InfoItem label="处理组" value={detail.handleGroup} />
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-slate-900">
                  <Clock3 size={14} className="text-sky-600" />
                  附件与举证文件
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {detail.attachments.map((item) => (
                    <div key={item} className="rounded-lg border border-sky-100 bg-white px-3 py-2 text-[11px] text-slate-600">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section data-guide-id="callback-logs" className="mt-4 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-slate-950">工单处理记录</div>
            <div className="space-y-3">
              {orderedProcessLogs.map((log) => (
                <div key={`${log.time}-${log.title}`} className="flex gap-3">
                  <div className="w-32 shrink-0 text-[11px] text-slate-400">{log.time}</div>
                  <div className="border-l-2 border-emerald-200 pl-3">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className={roleToneClass(log.role)}>{log.role}</span>
                      {log.actor ? <span className="text-[11px] font-medium text-slate-700">{log.actor}</span> : null}
                    </div>
                    <div className="text-[12px] font-semibold text-slate-900">{log.title}</div>
                    <div className="mt-1 text-[11px] leading-5 text-slate-500">{log.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="min-h-0 min-w-0 overflow-y-auto">
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-slate-950">订单信息</div>
            <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-violet-50 p-3">
              <div className="rounded-xl border border-white/80 bg-white/90 p-3 shadow-sm">
                <div className="flex gap-3">
                  <div className="relative shrink-0">
                    <img
                      src="https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=elegant%20lace%20dress%20product%20photo%2C%20soft%20studio%20lighting%2C%20premium%20fashion%20e-commerce%20thumbnail%2C%20white%20background%2C%20detailed%20fabric%20texture%2C%20realistic&image_size=square"
                      alt={detail.product}
                      className="h-[72px] w-[72px] rounded-xl border border-sky-100 object-cover shadow-sm"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-semibold leading-5 text-slate-900">{detail.product}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-medium text-sky-700">订单进行中</span>
                      <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700">服饰类目</span>
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-medium text-rose-700">{detail.priority}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <MiniCard label="订单金额" value={detail.amount} tone="sky" />
                      <MiniCard label="处理状态" value={detail.status} tone="violet" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-3 text-[11px]">
                <InfoPanel title="订单字段">
                  <FieldRow label="工单编号" value={detail.ticketNo} />
                  <FieldRow label="订单号" value={detail.orderNo} />
                  <FieldRow label="商家" value={detail.merchant} />
                  <FieldRow label="订单金额" value={detail.amount} />
                  <FieldRow label="工单分类" value={record.classification} />
                </InfoPanel>

                <InfoPanel title="用户信息">
                  <FieldRow label="用户昵称" value={detail.userName} />
                  <FieldRow label="用户等级" value={detail.userLevel} />
                  <TagFieldRow label="用户标签" values={[detail.userRisk, detail.ticketRisk, ...detail.tags]} />
                </InfoPanel>
              </div>
            </div>
          </section>

          <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 text-sm font-semibold text-slate-950">服务轨迹备注</div>
            <div className="space-y-2 text-[11px] leading-5 text-slate-500">
              {detail.serviceNotes.map((note) => (
                <div key={note} className="rounded-lg bg-slate-50 px-3 py-2">
                  {note}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}

function roleToneClass(role: TicketDetailDemo["processLogs"][number]["role"]) {
  switch (role) {
    case "系统":
      return "rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700";
    case "用户":
      return "rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-700";
    case "商家":
      return "rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700";
    case "客服":
      return "rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700";
  }
}

function CompactBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2.5">
      <div className="mb-1.5 text-[12px] font-semibold text-slate-900">{title}</div>
      {children}
    </div>
  );
}

function CompactLines({ items }: { items: string[] }) {
  return (
    <div className="space-y-1.5">
      {items.map((item) => (
        <div key={item} className="text-[11px] leading-5 text-slate-600">
          {item}
        </div>
      ))}
    </div>
  );
}

function GuidanceLines({ items }: { items: string[] }) {
  const titles = ["售后处理", "申请赔付", "诉求回复"];

  return (
    <div className="space-y-1.5">
      {items.map((item, index) => (
        <div key={item} className="text-[11px] leading-[18px] text-slate-600">
          <span className="font-semibold text-slate-800">{titles[index] ?? `方案${index + 1}`}：</span>
          {item}
        </div>
      ))}
    </div>
  );
}

function KnowledgeLines({
  items,
  onOpenKnowledge,
}: {
  items: TicketDetailDemo["suggestion"]["knowledge"];
  onOpenKnowledge: (knowledgeId: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      {items.map((item) => {
        const [content, position] = item.content.split("[位置：");

        return (
          <div key={`${item.feature}-${item.content}`} className="text-[11px] leading-5 text-slate-600">
            <span className="group relative mr-1 inline-flex cursor-help items-center rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-700">
              [相关特征]
              <span className="pointer-events-none absolute left-0 top-full z-20 mt-1 hidden w-[320px] rounded-lg border border-slate-200 bg-white p-2 text-[11px] font-normal leading-5 text-slate-600 shadow-lg group-hover:block">
                {item.feature}
              </span>
            </span>
            {content}
            {position ? (
              <button
                className="ml-1 rounded bg-teal-50 px-1.5 py-0.5 text-[10px] font-semibold text-teal-700 hover:bg-teal-100"
                onClick={() => onOpenKnowledge(item.knowledgeId)}
              >
                [位置：{position}
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function CompactLabelLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-semibold text-slate-800">{label}：</span>
      {value}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-slate-400">{label}</div>
      <div className="mt-1 text-slate-700">{value}</div>
    </div>
  );
}

function FieldRow({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-2">
      <div className="px-2 py-2 text-slate-500">{label}</div>
      <div className={multiline ? "rounded-md bg-white px-2.5 py-2 text-slate-900 leading-5" : "rounded-md bg-white px-2.5 py-2 text-slate-900 truncate"}>
        {value}
      </div>
    </div>
  );
}

function InfoPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-2">
      <div className="mb-1.5 text-[11px] font-semibold text-slate-900">{title}</div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function MiniCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "sky" | "violet";
}) {
  const toneClass =
    tone === "sky"
      ? "border-sky-100 bg-sky-50 text-sky-700"
      : "border-violet-100 bg-violet-50 text-violet-700";

  return (
    <div className={`rounded-lg border px-2.5 py-2 ${toneClass}`}>
      <div className="text-[10px]">{label}</div>
      <div className="mt-1 text-[12px] font-semibold">{value}</div>
    </div>
  );
}

function TagFieldRow({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-2">
      <div className="px-2 py-2 text-slate-500">{label}</div>
      <div className="flex flex-wrap gap-1.5 rounded-md bg-white px-2.5 py-2">
        {values.map((value, index) => (
          <span
            key={`${value}-${index}`}
            className={
              index < 2
                ? "rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-700"
                : "rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-medium text-sky-700"
            }
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}
